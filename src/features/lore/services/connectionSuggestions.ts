// LORE-3.9: AI Connection Suggestions Service
// Uses pgvector embeddings for semantic similarity + LLM explanations

import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';
import type {
  ConnectionSuggestion,
  ConnectionNotification,
  SimilarPageResult,
  LorePage
} from '../types';

// ============================================================
// Constants
// ============================================================

const DEFAULT_THRESHOLD = 0.8;
const HIGH_CONFIDENCE_THRESHOLD = 0.85;
const MAX_SUGGESTIONS = 5;
const EXPLANATION_CACHE_KEY = 'lore_connection_explanations';

// ============================================================
// Find Similar Pages via Embeddings (pgvector)
// ============================================================

export async function findSimilarPages(
  pageId: string,
  embedding: number[],
  userId: string,
  threshold: number = DEFAULT_THRESHOLD,
  limit: number = MAX_SUGGESTIONS
): Promise<SimilarPageResult[]> {
  const { data, error } = await supabase.rpc('match_lore_pages', {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: limit + 1, // +1 to account for self
    p_user_id: userId,
  });

  if (error) {
    console.error('Error finding similar pages:', error);
    throw new Error(`Failed to find similar pages: ${error.message}`);
  }

  // Filter out self and sort by similarity
  return (data || [])
    .filter((p: SimilarPageResult) => p.id !== pageId)
    .slice(0, limit);
}

// ============================================================
// Get Existing Links for a Page
// ============================================================

async function getExistingLinks(pageId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('lore_links')
    .select('target_page_id')
    .eq('source_page_id', pageId);

  if (error) {
    console.error('Error getting existing links:', error);
    return [];
  }

  return (data || []).map(link => link.target_page_id);
}

// ============================================================
// Generate Connection Explanation via LLM
// ============================================================

async function generateExplanation(
  sourcePage: { title: string; content: string },
  targetPage: { title: string; content: string },
  apiKey: string
): Promise<string> {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that explains why two notes might be related. Provide a single, concise sentence explaining the connection. Be specific about shared topics, themes, or concepts.',
      },
      {
        role: 'user',
        content: `Note 1: "${sourcePage.title}"
${sourcePage.content.substring(0, 500)}

Note 2: "${targetPage.title}"
${targetPage.content.substring(0, 500)}

Explain in one sentence why these notes might be related.`,
      },
    ],
    max_tokens: 100,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || 'Related content detected.';
}

// ============================================================
// Cache Management for Explanations
// ============================================================

function getCachedExplanation(
  sourcePageId: string,
  targetPageId: string
): string | null {
  try {
    const cacheKey = `${sourcePageId}:${targetPageId}`;
    const cache = JSON.parse(localStorage.getItem(EXPLANATION_CACHE_KEY) || '{}');
    return cache[cacheKey] || null;
  } catch {
    return null;
  }
}

function setCachedExplanation(
  sourcePageId: string,
  targetPageId: string,
  explanation: string
): void {
  try {
    const cacheKey = `${sourcePageId}:${targetPageId}`;
    const cache = JSON.parse(localStorage.getItem(EXPLANATION_CACHE_KEY) || '{}');
    cache[cacheKey] = explanation;
    localStorage.setItem(EXPLANATION_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to cache explanation:', e);
  }
}

// ============================================================
// Main Function: Get AI Connection Suggestions
// ============================================================

export async function getAIConnectionSuggestions(
  page: LorePage,
  apiKey?: string,
  threshold: number = DEFAULT_THRESHOLD
): Promise<ConnectionSuggestion[]> {
  if (!page.embedding || page.embedding.length === 0) {
    return [];
  }

  // Find similar pages
  const similarPages = await findSimilarPages(
    page.id,
    page.embedding,
    page.userId,
    threshold
  );

  // Get existing links to filter out
  const existingLinks = await getExistingLinks(page.id);

  // Filter and build suggestions
  const suggestions: ConnectionSuggestion[] = [];

  for (const similar of similarPages) {
    if (existingLinks.includes(similar.id)) {
      continue;
    }

    const suggestion: ConnectionSuggestion = {
      pageId: similar.id,
      pageTitle: similar.title,
      similarity: similar.similarity,
      reason: `${Math.round(similar.similarity * 100)}% semantic similarity`,
    };

    // Get or generate explanation if API key provided
    if (apiKey) {
      const cached = getCachedExplanation(page.id, similar.id);
      if (cached) {
        suggestion.explanation = cached;
      } else {
        try {
          const explanation = await generateExplanation(
            { title: page.title, content: extractTextFromBlocks(page.content) },
            { title: similar.title, content: similar.content_preview || '' },
            apiKey
          );
          suggestion.explanation = explanation;
          setCachedExplanation(page.id, similar.id, explanation);
        } catch (e) {
          console.warn('Failed to generate explanation:', e);
        }
      }
    }

    suggestions.push(suggestion);
  }

  return suggestions;
}

// ============================================================
// Check for Strong Connections (Notifications)
// ============================================================

export async function checkForStrongConnections(
  page: LorePage,
  apiKey?: string
): Promise<ConnectionNotification[]> {
  if (!page.embedding || page.embedding.length === 0) {
    return [];
  }

  // Find only high-confidence matches
  const strongMatches = await findSimilarPages(
    page.id,
    page.embedding,
    page.userId,
    HIGH_CONFIDENCE_THRESHOLD,
    3
  );

  // Get dismissed notifications
  const { data: dismissed } = await supabase
    .from('lore_connection_notifications')
    .select('target_page_id')
    .eq('source_page_id', page.id)
    .eq('dismissed', true);

  const dismissedIds = new Set((dismissed || []).map(d => d.target_page_id));

  const notifications: ConnectionNotification[] = [];

  for (const match of strongMatches) {
    if (dismissedIds.has(match.id)) {
      continue;
    }

    let explanation: string | undefined;
    if (apiKey) {
      const cached = getCachedExplanation(page.id, match.id);
      if (cached) {
        explanation = cached;
      }
    }

    notifications.push({
      id: `${page.id}:${match.id}`,
      sourcePageId: page.id,
      targetPageId: match.id,
      targetPageTitle: match.title,
      similarity: match.similarity,
      explanation,
      dismissed: false,
      createdAt: new Date().toISOString(),
    });
  }

  return notifications;
}

// ============================================================
// Create Link Between Pages
// ============================================================

export async function createLink(
  sourcePageId: string,
  targetPageId: string
): Promise<void> {
  const { error } = await supabase
    .from('lore_links')
    .insert({
      source_page_id: sourcePageId,
      target_page_id: targetPageId,
    });

  if (error) {
    throw new Error(`Failed to create link: ${error.message}`);
  }
}

// ============================================================
// Dismiss Connection Notification
// ============================================================

export async function dismissNotification(
  sourcePageId: string,
  targetPageId: string
): Promise<void> {
  const { error } = await supabase
    .from('lore_connection_notifications')
    .upsert({
      source_page_id: sourcePageId,
      target_page_id: targetPageId,
      dismissed: true,
    });

  if (error) {
    console.error('Failed to dismiss notification:', error);
  }
}

// ============================================================
// Helper: Extract Text from BlockContent
// ============================================================

function extractTextFromBlocks(blocks: LorePage['content']): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks.map(block => {
    if (!block.content || !Array.isArray(block.content)) {
      return '';
    }
    return block.content.map(c => c.text || '').join('');
  }).join('\n');
}
