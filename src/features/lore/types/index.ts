// LORE Types - Knowledge Base Application
// Epic 3: AI Core Features

// ============================================================
// Base Types
// ============================================================

export interface LorePage {
  id: string;
  title: string;
  content: BlockContent[];
  userId: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  embedding?: number[];
}

export interface BlockContent {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
  content: InlineContent[];
  children?: BlockContent[];
}

export type BlockType =
  | 'paragraph'
  | 'heading'
  | 'bulletListItem'
  | 'numberedListItem'
  | 'codeBlock'
  | 'image'
  | 'table'
  | 'file'
  | 'video'
  | 'audio';

export interface InlineContent {
  type: 'text' | 'wikiLink' | 'link';
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  };
  props?: {
    pageTitle?: string;
    pageId?: string;
    href?: string;
  };
}

// ============================================================
// LORE-3.8: Image Generation Types
// ============================================================

export type ImageProvider = 'dalle' | 'replicate';

export interface ImageGenerationRequest {
  prompt: string;
  provider: ImageProvider;
  size?: '1024x1024' | '512x512' | '256x256';
}

export interface ImageGenerationResult {
  url: string;
  provider: ImageProvider;
  prompt: string;
  generatedAt: string;
}

export interface GeneratedImageState {
  isGenerating: boolean;
  preview: string | null;
  error: string | null;
}

// ============================================================
// LORE-3.9: AI Connection Suggestions Types
// ============================================================

export interface ConnectionSuggestion {
  pageId: string;
  pageTitle: string;
  similarity: number;
  reason?: string;
  explanation?: string;
}

export interface ConnectionNotification {
  id: string;
  sourcePageId: string;
  targetPageId: string;
  targetPageTitle: string;
  similarity: number;
  explanation?: string;
  dismissed: boolean;
  createdAt: string;
}

export interface SimilarPageResult {
  id: string;
  title: string;
  similarity: number;
  content_preview?: string;
}

// ============================================================
// LORE-3.10: Data Export Types
// ============================================================

export type ExportFormat = 'markdown' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  includeImages: boolean;
  preserveHierarchy: boolean;
}

export interface ExportProgress {
  status: 'idle' | 'exporting' | 'complete' | 'error';
  currentStep: string;
  progress: number;
  totalPages: number;
  processedPages: number;
  error?: string;
}

export interface ExportMetadata {
  exportDate: string;
  pageCount: number;
  imageCount: number;
  format: ExportFormat;
  version: string;
}

export interface PageHierarchy {
  page: LorePage;
  path: string;
  children: PageHierarchy[];
}

// ============================================================
// Settings Types
// ============================================================

export interface LoreSettings {
  imageProvider: ImageProvider;
  openaiApiKey?: string;
  replicateApiKey?: string;
  anthropicApiKey?: string;
  embeddingsEnabled: boolean;
  connectionNotificationsEnabled: boolean;
  connectionThreshold: number;
}
