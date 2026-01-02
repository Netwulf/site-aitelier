// LORE-3.10: Data Export Hook
// React hook for exporting pages to Markdown/JSON with ZIP

import { useState, useCallback } from 'react';
import { exportAllPages, exportSinglePage, downloadBlob } from '../services/dataExport';
import type { LorePage, ExportFormat, ExportOptions, ExportProgress } from '../types';

interface UseDataExportOptions {
  userId?: string;
}

interface UseDataExportReturn {
  progress: ExportProgress;
  exportAll: (format: ExportFormat, includeImages?: boolean) => Promise<void>;
  exportPage: (page: LorePage, format: ExportFormat, includeImages?: boolean) => Promise<void>;
  reset: () => void;
}

const initialProgress: ExportProgress = {
  status: 'idle',
  currentStep: '',
  progress: 0,
  totalPages: 0,
  processedPages: 0,
};

export function useDataExport(options: UseDataExportOptions = {}): UseDataExportReturn {
  const { userId } = options;

  const [progress, setProgress] = useState<ExportProgress>(initialProgress);

  const handleProgress = useCallback((step: string, percent: number) => {
    setProgress(prev => ({
      ...prev,
      currentStep: step,
      progress: percent,
    }));
  }, []);

  const exportAll = useCallback(async (
    format: ExportFormat,
    includeImages: boolean = true
  ): Promise<void> => {
    if (!userId) {
      setProgress(prev => ({
        ...prev,
        status: 'error',
        error: 'User not authenticated',
      }));
      return;
    }

    setProgress({
      status: 'exporting',
      currentStep: 'Starting export...',
      progress: 0,
      totalPages: 0,
      processedPages: 0,
    });

    try {
      const exportOptions: ExportOptions = {
        format,
        includeImages,
        preserveHierarchy: true,
      };

      const blob = await exportAllPages(userId, exportOptions, handleProgress);

      // Generate filename with date
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `lore-export-${dateStr}.zip`;

      downloadBlob(blob, filename);

      setProgress(prev => ({
        ...prev,
        status: 'complete',
        currentStep: 'Export complete!',
        progress: 100,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Export failed';
      setProgress(prev => ({
        ...prev,
        status: 'error',
        error: message,
      }));
    }
  }, [userId, handleProgress]);

  const exportPage = useCallback(async (
    page: LorePage,
    format: ExportFormat,
    includeImages: boolean = true
  ): Promise<void> => {
    setProgress({
      status: 'exporting',
      currentStep: `Exporting "${page.title}"...`,
      progress: 50,
      totalPages: 1,
      processedPages: 0,
    });

    try {
      const exportOptions: ExportOptions = {
        format,
        includeImages,
        preserveHierarchy: false,
      };

      const blob = await exportSinglePage(page, exportOptions);

      // Generate filename from page title
      const slug = page.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      const extension = includeImages || format === 'json' ? 'zip' : format === 'markdown' ? 'md' : 'json';
      const filename = `${slug}.${extension}`;

      downloadBlob(blob, filename);

      setProgress({
        status: 'complete',
        currentStep: 'Export complete!',
        progress: 100,
        totalPages: 1,
        processedPages: 1,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Export failed';
      setProgress({
        status: 'error',
        currentStep: '',
        progress: 0,
        totalPages: 0,
        processedPages: 0,
        error: message,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setProgress(initialProgress);
  }, []);

  return {
    progress,
    exportAll,
    exportPage,
    reset,
  };
}
