// LORE-3.8: Image Generation Hook
// React hook for AI image generation with DALL-E/Replicate

import { useState, useCallback } from 'react';
import { generateImage, saveImageToStorage, getImageProviderSettings } from '../services/imageGeneration';
import type { ImageGenerationRequest, ImageGenerationResult, GeneratedImageState } from '../types';

interface UseImageGenerationOptions {
  userId?: string;
  autoSaveToStorage?: boolean;
}

interface UseImageGenerationReturn {
  state: GeneratedImageState;
  generate: (prompt: string) => Promise<ImageGenerationResult | null>;
  saveToStorage: (imageUrl: string) => Promise<string>;
  reset: () => void;
}

export function useImageGeneration(options: UseImageGenerationOptions = {}): UseImageGenerationReturn {
  const { userId, autoSaveToStorage = false } = options;

  const [state, setState] = useState<GeneratedImageState>({
    isGenerating: false,
    preview: null,
    error: null,
  });

  const generate = useCallback(async (prompt: string): Promise<ImageGenerationResult | null> => {
    if (!userId) {
      setState(prev => ({ ...prev, error: 'User not authenticated' }));
      return null;
    }

    setState({
      isGenerating: true,
      preview: null,
      error: null,
    });

    try {
      // Get user's API settings
      const settings = await getImageProviderSettings(userId);

      if (!settings) {
        throw new Error('Please configure your image provider API key in settings');
      }

      const request: ImageGenerationRequest = {
        prompt,
        provider: settings.provider,
        size: '1024x1024',
      };

      const result = await generateImage(request, settings.apiKey);

      // Auto-save to storage if enabled
      let finalUrl = result.url;
      if (autoSaveToStorage) {
        finalUrl = await saveImageToStorage(result.url, userId);
      }

      setState({
        isGenerating: false,
        preview: finalUrl,
        error: null,
      });

      return { ...result, url: finalUrl };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate image';
      setState({
        isGenerating: false,
        preview: null,
        error: message,
      });
      return null;
    }
  }, [userId, autoSaveToStorage]);

  const saveToStorageManual = useCallback(async (imageUrl: string): Promise<string> => {
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return saveImageToStorage(imageUrl, userId);
  }, [userId]);

  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      preview: null,
      error: null,
    });
  }, []);

  return {
    state,
    generate,
    saveToStorage: saveToStorageManual,
    reset,
  };
}
