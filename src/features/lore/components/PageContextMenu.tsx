// LORE-3.10: Page Context Menu Component
// Context menu with export options for individual pages

import React, { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useDataExport } from '../hooks/useDataExport';
import type { LorePage, ExportFormat } from '../types';
import {
  Download,
  FileText,
  FileJson,
  Copy,
  Link,
  Trash2,
  ExternalLink
} from 'lucide-react';

interface PageContextMenuProps {
  page: LorePage;
  children: React.ReactNode;
  onCopy?: () => void;
  onCopyLink?: () => void;
  onDelete?: () => void;
  onOpenInNewTab?: () => void;
}

export function PageContextMenu({
  page,
  children,
  onCopy,
  onCopyLink,
  onDelete,
  onOpenInNewTab,
}: PageContextMenuProps) {
  const { exportPage } = useDataExport();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: ExportFormat, includeImages: boolean) => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await exportPage(page, format, includeImages);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-void-black border-warm-ivory/20">
        {/* Copy */}
        {onCopy && (
          <ContextMenuItem
            onClick={onCopy}
            className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
          >
            <Copy className="w-4 h-4 mr-2 text-warm-ivory/60" />
            Copy
          </ContextMenuItem>
        )}

        {/* Copy Link */}
        {onCopyLink && (
          <ContextMenuItem
            onClick={onCopyLink}
            className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
          >
            <Link className="w-4 h-4 mr-2 text-warm-ivory/60" />
            Copy Link
          </ContextMenuItem>
        )}

        {/* Open in New Tab */}
        {onOpenInNewTab && (
          <ContextMenuItem
            onClick={onOpenInNewTab}
            className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
          >
            <ExternalLink className="w-4 h-4 mr-2 text-warm-ivory/60" />
            Open in New Tab
          </ContextMenuItem>
        )}

        <ContextMenuSeparator className="bg-warm-ivory/10" />

        {/* Export Submenu */}
        <ContextMenuSub>
          <ContextMenuSubTrigger className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10">
            <Download className="w-4 h-4 mr-2 text-warm-ivory/60" />
            Export
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="bg-void-black border-warm-ivory/20">
            <ContextMenuItem
              onClick={() => handleExport('markdown', false)}
              disabled={isExporting}
              className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
            >
              <FileText className="w-4 h-4 mr-2 text-tech-olive" />
              Markdown (.md)
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => handleExport('markdown', true)}
              disabled={isExporting}
              className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
            >
              <FileText className="w-4 h-4 mr-2 text-tech-olive" />
              Markdown with Images
            </ContextMenuItem>
            <ContextMenuSeparator className="bg-warm-ivory/10" />
            <ContextMenuItem
              onClick={() => handleExport('json', false)}
              disabled={isExporting}
              className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
            >
              <FileJson className="w-4 h-4 mr-2 text-tech-olive" />
              JSON (.json)
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => handleExport('json', true)}
              disabled={isExporting}
              className="text-warm-ivory hover:bg-warm-ivory/10 focus:bg-warm-ivory/10"
            >
              <FileJson className="w-4 h-4 mr-2 text-tech-olive" />
              JSON with Images
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Delete */}
        {onDelete && (
          <>
            <ContextMenuSeparator className="bg-warm-ivory/10" />
            <ContextMenuItem
              onClick={onDelete}
              className="text-red-400 hover:bg-red-400/10 focus:bg-red-400/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default PageContextMenu;
