// LORE-3.8: Image Generation Service
// Integrates DALL-E and Replicate for AI image generation

import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';
import type { ImageProvider, ImageGenerationRequest, ImageGenerationResult } from '../types';

// ============================================================
// Image Generation via DALL-E
// ============================================================

async function generateWithDallE(
  prompt: string,
  apiKey: string,
  size: '1024x1024' | '512x512' | '256x256' = '1024x1024'
): Promise<string> {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size,
    quality: 'standard',
  });

  const imageUrl = response.data[0]?.url;
  if (!imageUrl) {
    throw new Error('No image URL returned from DALL-E');
  }

  return imageUrl;
}

// ============================================================
// Image Generation via Replicate (SDXL)
// ============================================================

async function generateWithReplicate(
  prompt: string,
  apiKey: string
): Promise<string> {
  // Create prediction
  const createResponse = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      input: {
        prompt,
        width: 1024,
        height: 1024,
        num_outputs: 1,
        scheduler: 'K_EULER',
        num_inference_steps: 25,
        guidance_scale: 7.5,
      },
    }),
  });

  if (!createResponse.ok) {
    const error = await createResponse.json();
    throw new Error(`Replicate API error: ${error.detail || 'Unknown error'}`);
  }

  const prediction = await createResponse.json();

  // Poll for completion
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const pollResponse = await fetch(result.urls.get, {
      headers: { 'Authorization': `Token ${apiKey}` },
    });
    result = await pollResponse.json();
  }

  if (result.status === 'failed') {
    throw new Error(`Replicate generation failed: ${result.error || 'Unknown error'}`);
  }

  const imageUrl = result.output?.[0];
  if (!imageUrl) {
    throw new Error('No image URL returned from Replicate');
  }

  return imageUrl;
}

// ============================================================
// Main Generation Function
// ============================================================

export async function generateImage(
  request: ImageGenerationRequest,
  apiKey: string
): Promise<ImageGenerationResult> {
  const { prompt, provider, size } = request;

  let url: string;
  if (provider === 'dalle') {
    url = await generateWithDallE(prompt, apiKey, size);
  } else if (provider === 'replicate') {
    url = await generateWithReplicate(prompt, apiKey);
  } else {
    throw new Error(`Unknown image provider: ${provider}`);
  }

  return {
    url,
    provider,
    prompt,
    generatedAt: new Date().toISOString(),
  };
}

// ============================================================
// Save Image to Supabase Storage
// ============================================================

export async function saveImageToStorage(
  imageUrl: string,
  userId: string
): Promise<string> {
  // Fetch the image
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch generated image');
  }

  const blob = await response.blob();

  // Generate unique filename
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const filename = `${userId}/generated/${timestamp}-${randomId}.png`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('lore-images')
    .upload(filename, blob, {
      contentType: 'image/png',
      cacheControl: '31536000',
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('lore-images')
    .getPublicUrl(filename);

  return publicUrlData.publicUrl;
}

// ============================================================
// Get User's Image Provider Settings
// ============================================================

export async function getImageProviderSettings(
  userId: string
): Promise<{ provider: ImageProvider; apiKey: string } | null> {
  const { data, error } = await supabase
    .from('lore_settings')
    .select('image_provider, openai_api_key, replicate_api_key')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  const provider = data.image_provider as ImageProvider;
  const apiKey = provider === 'dalle'
    ? data.openai_api_key
    : data.replicate_api_key;

  if (!apiKey) {
    return null;
  }

  return { provider, apiKey };
}
