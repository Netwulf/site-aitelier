// LORE-3.8: Image Generation Modal Component
// Modal for generating images via AI (DALL-E/Replicate)

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useImageGeneration } from '../hooks/useImageGeneration';
import { Loader2, Image as ImageIcon, RefreshCw, Check, X } from 'lucide-react';

interface ImageGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageUrl: string) => void;
  userId?: string;
}

export function ImageGenerationModal({
  isOpen,
  onClose,
  onInsert,
  userId,
}: ImageGenerationModalProps) {
  const [prompt, setPrompt] = useState('');
  const { state, generate, saveToStorage, reset } = useImageGeneration({
    userId,
    autoSaveToStorage: false,
  });

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;
    await generate(prompt);
  }, [prompt, generate]);

  const handleInsert = useCallback(async () => {
    if (!state.preview) return;

    try {
      // Save to storage before inserting
      const storageUrl = await saveToStorage(state.preview);
      onInsert(storageUrl);
      handleClose();
    } catch (err) {
      console.error('Failed to save image:', err);
      // If storage fails, use the original URL
      onInsert(state.preview);
      handleClose();
    }
  }, [state.preview, saveToStorage, onInsert]);

  const handleClose = useCallback(() => {
    setPrompt('');
    reset();
    onClose();
  }, [reset, onClose]);

  const handleRegenerate = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] bg-void-black border border-warm-ivory/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-warm-ivory font-space-grotesk">
            <ImageIcon className="w-5 h-5 text-tech-olive" />
            Generate Image
          </DialogTitle>
          <DialogDescription className="text-warm-ivory/60">
            Describe the image you want to generate using AI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!state.preview ? (
            <>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene mountain landscape at sunset with a reflective lake in the foreground..."
                className="min-h-[120px] bg-void-black border-warm-ivory/20 text-warm-ivory placeholder:text-warm-ivory/40 focus:border-tech-olive"
                disabled={state.isGenerating}
              />

              {state.error && (
                <p className="text-sm text-red-400">{state.error}</p>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden border border-warm-ivory/10">
                <img
                  src={state.preview}
                  alt="Generated preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-warm-ivory/60 text-center truncate">
                {prompt}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          {!state.preview ? (
            <>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-warm-ivory/60 hover:text-warm-ivory hover:bg-warm-ivory/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || state.isGenerating}
                className="bg-tech-olive text-void-black hover:bg-tech-olive/90 font-medium"
              >
                {state.isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-warm-ivory/60 hover:text-warm-ivory hover:bg-warm-ivory/10"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRegenerate}
                  className="border-warm-ivory/20 text-warm-ivory hover:bg-warm-ivory/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button
                  onClick={handleInsert}
                  className="bg-tech-olive text-void-black hover:bg-tech-olive/90 font-medium"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Insert
                </Button>
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageGenerationModal;
