// LORE-3.9: Connection Suggestions Hook
// React hook for AI-powered page connection suggestions

import { useState, useEffect, useCallback } from 'react';
import {
  getAIConnectionSuggestions,
  checkForStrongConnections,
  createLink,
  dismissNotification
} from '../services/connectionSuggestions';
import type { LorePage, ConnectionSuggestion, ConnectionNotification } from '../types';

interface UseConnectionSuggestionsOptions {
  page: LorePage | null;
  apiKey?: string;
  threshold?: number;
  enabled?: boolean;
}

interface UseConnectionSuggestionsReturn {
  suggestions: ConnectionSuggestion[];
  notifications: ConnectionNotification[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  linkToPage: (targetPageId: string) => Promise<void>;
  dismissSuggestion: (targetPageId: string) => Promise<void>;
}

export function useConnectionSuggestions(
  options: UseConnectionSuggestionsOptions
): UseConnectionSuggestionsReturn {
  const { page, apiKey, threshold = 0.8, enabled = true } = options;

  const [suggestions, setSuggestions] = useState<ConnectionSuggestion[]>([]);
  const [notifications, setNotifications] = useState<ConnectionNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    if (!page || !enabled) {
      setSuggestions([]);
      setNotifications([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch suggestions and notifications in parallel
      const [suggestionsResult, notificationsResult] = await Promise.all([
        getAIConnectionSuggestions(page, apiKey, threshold),
        checkForStrongConnections(page, apiKey),
      ]);

      setSuggestions(suggestionsResult);
      setNotifications(notificationsResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch suggestions';
      setError(message);
      console.error('Connection suggestions error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, apiKey, threshold, enabled]);

  // Fetch on mount and when page changes
  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const linkToPage = useCallback(async (targetPageId: string) => {
    if (!page) return;

    try {
      await createLink(page.id, targetPageId);

      // Remove from suggestions
      setSuggestions(prev => prev.filter(s => s.pageId !== targetPageId));

      // Remove from notifications
      setNotifications(prev => prev.filter(n => n.targetPageId !== targetPageId));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create link';
      setError(message);
      throw err;
    }
  }, [page]);

  const dismissSuggestionHandler = useCallback(async (targetPageId: string) => {
    if (!page) return;

    try {
      await dismissNotification(page.id, targetPageId);

      // Remove from notifications
      setNotifications(prev => prev.filter(n => n.targetPageId !== targetPageId));
    } catch (err) {
      console.error('Failed to dismiss notification:', err);
    }
  }, [page]);

  return {
    suggestions,
    notifications,
    isLoading,
    error,
    refresh: fetchSuggestions,
    linkToPage,
    dismissSuggestion: dismissSuggestionHandler,
  };
}
