// LORE-3.10: Data Export Service
// Export pages to Markdown/JSON with ZIP packaging

import JSZip from 'jszip';
import { supabase } from '@/integrations/supabase/client';
import type {
  LorePage,
  ExportFormat,
  ExportOptions,
  ExportMetadata,
  PageHierarchy,
  BlockContent,
  InlineContent
} from '../types';

// ============================================================
// BlockNote to Markdown Conversion
// ============================================================

function inlineToMarkdown(content: InlineContent[]): string {
  if (!content || !Array.isArray(content)) {
    return '';
  }

  return content.map(c => {
    let text = c.text || '';

    if (c.type === 'wikiLink' && c.props?.pageTitle) {
      return `[[${c.props.pageTitle}]]`;
    }

    if (c.type === 'link' && c.props?.href) {
      return `[${text}](${c.props.href})`;
    }

    if (c.styles) {
      if (c.styles.bold) text = `**${text}**`;
      if (c.styles.italic) text = `*${text}*`;
      if (c.styles.code) text = `\`${text}\``;
      if (c.styles.strikethrough) text = `~~${text}~~`;
    }

    return text;
  }).join('');
}

function blockToMarkdown(block: BlockContent, depth: number = 0): string {
  const indent = '  '.repeat(depth);
  const content = inlineToMarkdown(block.content);

  switch (block.type) {
    case 'paragraph':
      return content ? `${indent}${content}` : '';

    case 'heading': {
      const level = (block.props?.level as number) || 1;
      const hashes = '#'.repeat(Math.min(level, 6));
      return `${hashes} ${content}`;
    }

    case 'bulletListItem':
      return `${indent}- ${content}`;

    case 'numberedListItem':
      return `${indent}1. ${content}`;

    case 'codeBlock': {
      const language = (block.props?.language as string) || '';
      const code = (block.props?.code as string) || content;
      return `\`\`\`${language}\n${code}\n\`\`\``;
    }

    case 'image': {
      const url = block.props?.url as string || '';
      const alt = (block.props?.alt as string) || '';
      const caption = (block.props?.caption as string) || '';
      return caption
        ? `![${alt}](${url})\n*${caption}*`
        : `![${alt}](${url})`;
    }

    case 'table': {
      // Basic table support
      const rows = block.props?.rows as string[][] || [];
      if (rows.length === 0) return '';

      const header = rows[0];
      const separator = header.map(() => '---').join(' | ');
      const headerRow = header.join(' | ');
      const bodyRows = rows.slice(1).map(row => row.join(' | ')).join('\n');

      return `| ${headerRow} |\n| ${separator} |\n| ${bodyRows} |`;
    }

    case 'file':
    case 'video':
    case 'audio': {
      const fileUrl = block.props?.url as string || '';
      const fileName = (block.props?.name as string) || 'attachment';
      return `[${fileName}](${fileUrl})`;
    }

    default:
      return content;
  }
}

export function blocksToMarkdown(blocks: BlockContent[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  const lines: string[] = [];

  for (const block of blocks) {
    const markdown = blockToMarkdown(block);
    if (markdown) {
      lines.push(markdown);
    }

    // Process children (nested blocks)
    if (block.children && block.children.length > 0) {
      const childMarkdown = blocksToMarkdown(block.children);
      if (childMarkdown) {
        lines.push(childMarkdown);
      }
    }
  }

  return lines.join('\n\n');
}

// ============================================================
// Export Single Page to Markdown
// ============================================================

export function exportPageToMarkdown(page: LorePage): string {
  const frontmatter = `---
title: "${page.title.replace(/"/g, '\\"')}"
id: ${page.id}
created: ${page.createdAt}
updated: ${page.updatedAt}
tags: [${(page.tags || []).map(t => `"${t}"`).join(', ')}]
---

`;

  const content = blocksToMarkdown(page.content);
  return frontmatter + `# ${page.title}\n\n` + content;
}

// ============================================================
// Export Single Page to JSON
// ============================================================

export function exportPageToJson(page: LorePage): string {
  return JSON.stringify({
    id: page.id,
    title: page.title,
    content: page.content,
    tags: page.tags || [],
    parentId: page.parentId,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
  }, null, 2);
}

// ============================================================
// Build Page Hierarchy for Export
// ============================================================

function buildHierarchy(pages: LorePage[]): PageHierarchy[] {
  const pageMap = new Map<string, LorePage>();
  const childrenMap = new Map<string, LorePage[]>();
  const rootPages: LorePage[] = [];

  // Build maps
  for (const page of pages) {
    pageMap.set(page.id, page);

    if (!page.parentId) {
      rootPages.push(page);
    } else {
      const siblings = childrenMap.get(page.parentId) || [];
      siblings.push(page);
      childrenMap.set(page.parentId, siblings);
    }
  }

  // Recursive function to build hierarchy
  function buildTree(page: LorePage, parentPath: string = ''): PageHierarchy {
    const slug = slugify(page.title);
    const path = parentPath ? `${parentPath}/${slug}` : slug;

    const children = (childrenMap.get(page.id) || [])
      .map(child => buildTree(child, path));

    return { page, path, children };
  }

  return rootPages.map(p => buildTree(p));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ============================================================
// Flatten Hierarchy for Export
// ============================================================

function flattenHierarchy(hierarchy: PageHierarchy[]): { page: LorePage; path: string }[] {
  const result: { page: LorePage; path: string }[] = [];

  function traverse(node: PageHierarchy) {
    result.push({ page: node.page, path: node.path });
    for (const child of node.children) {
      traverse(child);
    }
  }

  for (const root of hierarchy) {
    traverse(root);
  }

  return result;
}

// ============================================================
// Download Image from Storage
// ============================================================

async function downloadImage(url: string): Promise<Blob | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.blob();
  } catch (e) {
    console.warn(`Failed to download image: ${url}`, e);
    return null;
  }
}

// ============================================================
// Extract Image URLs from Page Content
// ============================================================

function extractImageUrls(blocks: BlockContent[]): string[] {
  const urls: string[] = [];

  function traverse(block: BlockContent) {
    if (block.type === 'image' && block.props?.url) {
      urls.push(block.props.url as string);
    }
    if (block.children) {
      for (const child of block.children) {
        traverse(child);
      }
    }
  }

  for (const block of blocks) {
    traverse(block);
  }

  return urls;
}

// ============================================================
// Main Export Function: Export All Pages
// ============================================================

export async function exportAllPages(
  userId: string,
  options: ExportOptions,
  onProgress?: (step: string, progress: number) => void
): Promise<Blob> {
  onProgress?.('Fetching pages...', 0);

  // Fetch all pages
  const { data: pages, error } = await supabase
    .from('lore_pages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch pages: ${error.message}`);
  }

  if (!pages || pages.length === 0) {
    throw new Error('No pages to export');
  }

  const zip = new JSZip();
  const hierarchy = buildHierarchy(pages as LorePage[]);
  const flatPages = flattenHierarchy(hierarchy);
  const allImageUrls = new Set<string>();
  const imageMapping = new Map<string, string>();

  // Export pages
  onProgress?.('Exporting pages...', 10);

  for (let i = 0; i < flatPages.length; i++) {
    const { page, path } = flatPages[i];
    const extension = options.format === 'markdown' ? 'md' : 'json';
    const content = options.format === 'markdown'
      ? exportPageToMarkdown(page)
      : exportPageToJson(page);

    zip.file(`pages/${path}.${extension}`, content);

    // Collect image URLs
    if (options.includeImages) {
      const urls = extractImageUrls(page.content);
      for (const url of urls) {
        allImageUrls.add(url);
      }
    }

    onProgress?.(`Exporting pages... (${i + 1}/${flatPages.length})`, 10 + (i / flatPages.length) * 40);
  }

  // Download and include images
  if (options.includeImages && allImageUrls.size > 0) {
    onProgress?.('Downloading images...', 50);

    const urlArray = Array.from(allImageUrls);
    for (let i = 0; i < urlArray.length; i++) {
      const url = urlArray[i];
      const blob = await downloadImage(url);

      if (blob) {
        const filename = `img-${String(i + 1).padStart(3, '0')}.png`;
        zip.file(`images/${filename}`, blob);
        imageMapping.set(url, `images/${filename}`);
      }

      onProgress?.(`Downloading images... (${i + 1}/${urlArray.length})`, 50 + (i / urlArray.length) * 30);
    }
  }

  // Add metadata
  onProgress?.('Generating metadata...', 85);

  const metadata: ExportMetadata = {
    exportDate: new Date().toISOString(),
    pageCount: pages.length,
    imageCount: imageMapping.size,
    format: options.format,
    version: '1.0.0',
  };

  zip.file('metadata.json', JSON.stringify(metadata, null, 2));

  // Add README
  const readme = `# LORE Export

Exported on: ${new Date().toLocaleString()}

## Summary
- **Pages:** ${pages.length}
- **Images:** ${imageMapping.size}
- **Format:** ${options.format.toUpperCase()}

## Structure
- \`pages/\` - Your notes in ${options.format.toUpperCase()} format
${options.includeImages ? '- `images/` - All images from your notes' : ''}
- \`metadata.json\` - Export metadata

## Import
To import this backup into LORE or another tool:
1. Extract the ZIP file
2. The \`pages/\` folder contains your notes with frontmatter metadata
3. Wiki links are preserved as [[Page Title]] syntax

---
Generated by LORE Knowledge Base
`;

  zip.file('README.md', readme);

  // Generate ZIP
  onProgress?.('Generating ZIP file...', 95);

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  onProgress?.('Export complete!', 100);

  return blob;
}

// ============================================================
// Export Single Page
// ============================================================

export async function exportSinglePage(
  page: LorePage,
  options: ExportOptions
): Promise<Blob> {
  const zip = new JSZip();
  const extension = options.format === 'markdown' ? 'md' : 'json';
  const content = options.format === 'markdown'
    ? exportPageToMarkdown(page)
    : exportPageToJson(page);

  zip.file(`${slugify(page.title)}.${extension}`, content);

  // Include images if requested
  if (options.includeImages) {
    const urls = extractImageUrls(page.content);
    for (let i = 0; i < urls.length; i++) {
      const blob = await downloadImage(urls[i]);
      if (blob) {
        zip.file(`images/img-${String(i + 1).padStart(3, '0')}.png`, blob);
      }
    }
  }

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
}

// ============================================================
// Trigger Download
// ============================================================

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
