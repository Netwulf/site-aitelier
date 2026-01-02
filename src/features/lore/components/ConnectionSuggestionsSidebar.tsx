// LORE-3.9: Connection Suggestions Sidebar Component
// AI-powered page connection suggestions with semantic similarity

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useConnectionSuggestions } from '../hooks/useConnectionSuggestions';
import type { LorePage, ConnectionSuggestion, ConnectionNotification } from '../types';
import {
  Loader2,
  Link as LinkIcon,
  Sparkles,
  X,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

interface ConnectionSuggestionsSidebarProps {
  page: LorePage | null;
  apiKey?: string;
  onNavigateToPage?: (pageId: string) => void;
}

export function ConnectionSuggestionsSidebar({
  page,
  apiKey,
  onNavigateToPage,
}: ConnectionSuggestionsSidebarProps) {
  const {
    suggestions,
    notifications,
    isLoading,
    error,
    refresh,
    linkToPage,
    dismissSuggestion,
  } = useConnectionSuggestions({ page, apiKey, enabled: !!page });

  if (!page) {
    return (
      <div className="p-4 text-warm-ivory/40 text-sm text-center">
        Select a page to see AI suggestions
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-void-black border-l border-warm-ivory/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-warm-ivory/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-tech-olive" />
          <h3 className="text-sm font-medium text-warm-ivory">AI Suggestions</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={refresh}
          disabled={isLoading}
          className="h-8 w-8 text-warm-ivory/60 hover:text-warm-ivory hover:bg-warm-ivory/10"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-tech-olive uppercase tracking-wide">
                Strong Connections
              </h4>
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onLink={() => linkToPage(notification.targetPageId)}
                  onDismiss={() => dismissSuggestion(notification.targetPageId)}
                  onNavigate={() => onNavigateToPage?.(notification.targetPageId)}
                />
              ))}
            </div>
          )}

          {/* Regular Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-warm-ivory/60 uppercase tracking-wide">
                Related Pages
              </h4>
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.pageId}
                  suggestion={suggestion}
                  onLink={() => linkToPage(suggestion.pageId)}
                  onNavigate={() => onNavigateToPage?.(suggestion.pageId)}
                />
              ))}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-tech-olive animate-spin" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && suggestions.length === 0 && notifications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-warm-ivory/40">
                {error ? error : 'No suggestions found'}
              </p>
              {!error && (
                <p className="text-xs text-warm-ivory/30 mt-2">
                  Add more content to discover connections
                </p>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ============================================================
// Notification Card (Strong Connection Alert)
// ============================================================

interface NotificationCardProps {
  notification: ConnectionNotification;
  onLink: () => void;
  onDismiss: () => void;
  onNavigate: () => void;
}

function NotificationCard({
  notification,
  onLink,
  onDismiss,
  onNavigate,
}: NotificationCardProps) {
  const similarityPercent = Math.round(notification.similarity * 100);

  return (
    <div className="p-3 bg-tech-olive/10 border border-tech-olive/30 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={onNavigate}
          className="flex-1 text-left group"
        >
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-tech-olive flex-shrink-0" />
            <span className="text-sm font-medium text-warm-ivory group-hover:text-tech-olive transition-colors truncate">
              {notification.targetPageTitle}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-tech-olive font-medium">
              {similarityPercent}% similar
            </span>
          </div>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="h-6 w-6 text-warm-ivory/40 hover:text-warm-ivory hover:bg-warm-ivory/10 flex-shrink-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>

      {notification.explanation && (
        <p className="text-xs text-warm-ivory/60 leading-relaxed">
          "{notification.explanation}"
        </p>
      )}

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={onLink}
          className="flex-1 h-7 text-xs bg-tech-olive text-void-black hover:bg-tech-olive/90"
        >
          <LinkIcon className="w-3 h-3 mr-1" />
          Link
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onDismiss}
          className="h-7 text-xs text-warm-ivory/60 hover:text-warm-ivory hover:bg-warm-ivory/10"
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
}

// ============================================================
// Suggestion Card (Regular Suggestion)
// ============================================================

interface SuggestionCardProps {
  suggestion: ConnectionSuggestion;
  onLink: () => void;
  onNavigate: () => void;
}

function SuggestionCard({
  suggestion,
  onLink,
  onNavigate,
}: SuggestionCardProps) {
  const similarityPercent = Math.round(suggestion.similarity * 100);

  return (
    <div className="p-3 border border-warm-ivory/10 hover:border-warm-ivory/20 transition-colors group">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onNavigate}
          className="flex-1 text-left min-w-0"
        >
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-warm-ivory/40 group-hover:text-tech-olive flex-shrink-0 transition-colors" />
            <span className="text-sm text-warm-ivory group-hover:text-tech-olive transition-colors truncate">
              {suggestion.pageTitle}
            </span>
          </div>
          <span className="text-xs text-warm-ivory/40 ml-6">
            {similarityPercent}% similar
          </span>
        </button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onLink();
                }}
                className="h-7 w-7 text-warm-ivory/40 hover:text-tech-olive hover:bg-tech-olive/10 flex-shrink-0"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Create link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {suggestion.explanation && (
        <p className="text-xs text-warm-ivory/50 mt-2 ml-6 leading-relaxed">
          "{suggestion.explanation}"
        </p>
      )}
    </div>
  );
}

export default ConnectionSuggestionsSidebar;
