#!/usr/bin/env node
/**
 * AI.TELIER Image Generation Script
 * Uses Google Gemini Imagen API to generate art-directed images
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Keys (rotating)
const API_KEYS = [
  'AIzaSyA7Cc3Y3die70hZUmavfQdJ7pAQLvh1Z5A',
  'AIzaSyCymMwx2gKfuc2gUnt2KbB6WTRlxgTCwRw'
];

let currentKeyIndex = 0;

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image generation configs based on Art Direction Plan
const IMAGE_CONFIGS = [
  {
    name: 'hero-brutalist-v2',
    prompt: `Urban brutalist photography style. Concrete tunnel perspective with dramatic depth,
a solitary hooded figure walking toward a mysterious light source at the end.
Geometric green overlay bars (color #8dc75e) cutting through the frame at 45-degree angles.
Dense fog and mist filling the air creating layers of atmosphere.
High contrast, desaturated except for green accents.
Film grain texture, editorial photography feel.
Asymmetric composition with intentional negative space.
No text, no logos, no faces visible.
Cinematic 16:9 aspect ratio, dark moody atmosphere.
Style: urban documentary meets architectural photography.`,
    aspectRatio: '16:9',
    filename: 'hero-brutalist-v2.png'
  },
  {
    name: 'breather-forest',
    prompt: `Shamanic cinematic photography. Bioluminescent forest corridor at twilight.
No visible human figures. A mystical path leads toward a soft ethereal glow in the distance.
Organic technology integrated subtly into ancient tree bark - glowing circuits merging with nature.
Muted color palette with subtle green bioluminescence (#8dc75e tones).
Dense atmospheric fog creating depth layers.
Ultra-wide panoramic composition 21:9 aspect ratio.
Film grain texture, high contrast shadows.
Mood: transition, infinite possibility, threshold between worlds.
Style: nature documentary meets sci-fi concept art.
No text, no logos, pure atmosphere.`,
    aspectRatio: '21:9',
    filename: 'breather-forest.png'
  },
  {
    name: 'manifesto-contemplation',
    prompt: `Rotoscope animation style inspired by Waking Life and A Scanner Darkly.
Single person standing at a large window, contemplative pose, looking outward into undefined space.
The figure's silhouette is clear but features are abstracted.
Environment dissolves into loose sketchy lines at the edges of the frame.
Moment before a major decision - threshold energy.
Warm interior light contrasting with cool exterior.
Painterly brushstrokes visible, hand-drawn aesthetic.
Muted earth tones with subtle green accent hints.
Vertical 4:5 portrait composition.
Mood: introspective, hopeful, existential clarity.
No text, artistic fine art quality.`,
    aspectRatio: '4:5',
    filename: 'manifesto-contemplation.png'
  },
  {
    name: 'about-crossroads',
    prompt: `Urban brutalist photography. Solitary figure at concrete crossroads intersection.
Brutal architecture geometry surrounding the scene - raw concrete, sharp angles.
The figure stands at the exact center where paths diverge.
Dramatic top-down or elevated perspective.
Strong shadows creating geometric patterns on ground.
Desaturated palette with one accent: subtle green light reflection (#8dc75e).
Film noir atmosphere meets architectural photography.
High contrast, grain texture, documentary style.
Vertical 3:4 aspect ratio.
Mood: decisional moment, clear boundaries, filtered choice.
No text, no visible faces, pure form and shadow.`,
    aspectRatio: '3:4',
    filename: 'about-crossroads.png'
  }
];

function getNextApiKey() {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}

async function generateImage(config) {
  const apiKey = getNextApiKey();

  console.log(`\n🎨 Generating: ${config.name}`);
  console.log(`   Prompt preview: ${config.prompt.substring(0, 80)}...`);

  const requestBody = JSON.stringify({
    contents: [{
      parts: [{
        text: `Generate an image: ${config.prompt}`
      }]
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"]
    }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.log(`   ❌ API Error: ${response.error.message}`);
            reject(new Error(response.error.message));
            return;
          }

          // Extract image from response
          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content?.parts || [];

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
                const imageData = part.inlineData.data;
                const outputPath = path.join(OUTPUT_DIR, config.filename);

                fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));
                console.log(`   ✅ Saved: ${outputPath}`);
                resolve(outputPath);
                return;
              }
            }
          }

          console.log(`   ⚠️  No image in response. Full response:`);
          console.log(JSON.stringify(response, null, 2).substring(0, 500));
          reject(new Error('No image data in response'));

        } catch (e) {
          console.log(`   ❌ Parse error: ${e.message}`);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.log(`   ❌ Request error: ${e.message}`);
      reject(e);
    });

    req.write(requestBody);
    req.end();
  });
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('   AI.TELIER Image Generation');
  console.log('   Art Direction: Brutal Poetry Style');
  console.log('═══════════════════════════════════════════════════');
  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔑 API Keys available: ${API_KEYS.length}`);

  const results = [];

  for (const config of IMAGE_CONFIGS) {
    try {
      const outputPath = await generateImage(config);
      results.push({ name: config.name, status: 'success', path: outputPath });
      // Small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      results.push({ name: config.name, status: 'failed', error: error.message });
    }
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log('   Generation Summary');
  console.log('═══════════════════════════════════════════════════');

  for (const result of results) {
    const icon = result.status === 'success' ? '✅' : '❌';
    console.log(`${icon} ${result.name}: ${result.status}`);
    if (result.path) console.log(`   → ${result.path}`);
    if (result.error) console.log(`   → Error: ${result.error}`);
  }

  const successCount = results.filter(r => r.status === 'success').length;
  console.log(`\n📊 Total: ${successCount}/${results.length} images generated`);
}

main().catch(console.error);
