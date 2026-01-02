// LORE-3.10: Data Export Settings Component
// Settings UI for exporting pages to Markdown/JSON

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDataExport } from '../hooks/useDataExport';
import type { ExportFormat } from '../types';
import {
  Download,
  FileText,
  FileJson,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface DataExportSettingsProps {
  userId?: string;
}

export function DataExportSettings({ userId }: DataExportSettingsProps) {
  const [format, setFormat] = useState<ExportFormat>('markdown');
  const [includeImages, setIncludeImages] = useState(true);

  const { progress, exportAll, reset } = useDataExport({ userId });

  const handleExport = async () => {
    await exportAll(format, includeImages);
  };

  const isExporting = progress.status === 'exporting';
  const isComplete = progress.status === 'complete';
  const hasError = progress.status === 'error';

  return (
    <Card className="bg-void-black border-warm-ivory/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-warm-ivory font-space-grotesk">
          <Download className="w-5 h-5 text-tech-olive" />
          Export Data
        </CardTitle>
        <CardDescription className="text-warm-ivory/60">
          Download all your pages as a backup
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Format Selection */}
        <div className="space-y-2">
          <Label className="text-sm text-warm-ivory/80">Export Format</Label>
          <Select
            value={format}
            onValueChange={(v) => setFormat(v as ExportFormat)}
            disabled={isExporting}
          >
            <SelectTrigger className="w-full bg-void-black border-warm-ivory/20 text-warm-ivory">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="bg-void-black border-warm-ivory/20">
              <SelectItem value="markdown" className="text-warm-ivory hover:bg-warm-ivory/10">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-tech-olive" />
                  <span>Markdown (.md)</span>
                </div>
              </SelectItem>
              <SelectItem value="json" className="text-warm-ivory hover:bg-warm-ivory/10">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-tech-olive" />
                  <span>JSON (.json)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-warm-ivory/40">
            {format === 'markdown'
              ? 'Human-readable format with YAML frontmatter'
              : 'Raw data format with full content structure'}
          </p>
        </div>

        {/* Include Images Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm text-warm-ivory/80 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Include Images
            </Label>
            <p className="text-xs text-warm-ivory/40">
              Download and include all images in the export
            </p>
          </div>
          <Switch
            checked={includeImages}
            onCheckedChange={setIncludeImages}
            disabled={isExporting}
            className="data-[state=checked]:bg-tech-olive"
          />
        </div>

        {/* Progress */}
        {(isExporting || isComplete || hasError) && (
          <div className="space-y-2 p-4 bg-warm-ivory/5 border border-warm-ivory/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-ivory/80">
                {progress.currentStep}
              </span>
              {isExporting && (
                <Loader2 className="w-4 h-4 text-tech-olive animate-spin" />
              )}
              {isComplete && (
                <CheckCircle className="w-4 h-4 text-tech-olive" />
              )}
              {hasError && (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
            </div>

            <Progress
              value={progress.progress}
              className="h-2 bg-warm-ivory/10"
            />

            {hasError && progress.error && (
              <p className="text-sm text-red-400">{progress.error}</p>
            )}
          </div>
        )}

        {/* Export Contents Info */}
        <div className="p-4 bg-warm-ivory/5 border border-warm-ivory/10 space-y-2">
          <h4 className="text-sm font-medium text-warm-ivory">
            Export includes:
          </h4>
          <ul className="text-xs text-warm-ivory/60 space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tech-olive" />
              All pages with folder hierarchy
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tech-olive" />
              Metadata (title, dates, tags)
            </li>
            {includeImages && (
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-tech-olive" />
                Images from your pages
              </li>
            )}
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tech-olive" />
              README with export info
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        {isComplete ? (
          <Button
            variant="outline"
            onClick={reset}
            className="border-warm-ivory/20 text-warm-ivory hover:bg-warm-ivory/10"
          >
            Export Again
          </Button>
        ) : (
          <div />
        )}
        <Button
          onClick={handleExport}
          disabled={isExporting || !userId}
          className="bg-tech-olive text-void-black hover:bg-tech-olive/90 font-medium"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DataExportSettings;
