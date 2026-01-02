/**
 * Generate replacement images for gallery shamanic images
 * These will replace forest-portal and water-ceremony with cinematic versions
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const GEMINI_API_KEY = envContent.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const CINEMA_BASE = `
CRITICAL: This must look like a STILL FROM A FILM, not AI art.
Shot on 35mm Kodak Vision3 500T, pushed 1-2 stops.
Heavy visible film grain. Practical lighting ONLY.
Shallow depth of field. Lens imperfections: flares, halation.
Color: crushed blacks, lifted shadows, desaturated with single accent.
FORBIDDEN: Clean digital, neon glow, videogame aesthetic, CGI.
`;

const IMAGES_TO_GENERATE = [
  {
    id: 'forest-path-cinematic',
    replaces: 'forest-portal.png',
    prompt: `
${CINEMA_BASE}

APICHATPONG WEERASETHAKUL style forest scene.

SUBJECT: Dense tropical jungle path, morning mist filtering through canopy.
Natural light rays cutting through leaves. No figures visible.
Wet leaves, moss on trees, humid atmosphere visible in air.
Single accent: natural green (#8dc75e) from moss/vegetation.

MOOD: Contemplative, sacred, threshold between worlds.
TEXTURE: Heavy grain, soft focus edges, dappled light.
NOT: Bioluminescence, neon colors, fantasy elements, glowing things.
ASPECT: 16:9 wide
`
  },
  {
    id: 'water-reflection-cinematic',
    replaces: 'water-ceremony.png',
    prompt: `
${CINEMA_BASE}

ANDREI TARKOVSKY / APICHATPONG style water scene.

SUBJECT: Still pond or flooded area, trees reflected in dark water.
Early morning or late afternoon light. Mist hovering over surface.
Organic debris floating. Branches entering frame.
Single accent: green reflection from vegetation.

MOOD: Meditative, time suspended, nature reclaiming.
TEXTURE: Mirror-still water, atmospheric haze, grain.
NOT: Glowing elements, neon, fantasy structures, ruins with lights.
ASPECT: 16:9 wide
`
  }
];

async function generateImage(spec) {
  console.log(`\nGenerating: ${spec.id}`);
  console.log(`Replaces: ${spec.replaces}`);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      }
    });

    const result = await model.generateContent(spec.prompt);
    const response = await result.response;
    const parts = response.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const ext = part.inlineData.mimeType.split('/')[1] || 'png';

        const outputPath = path.join(__dirname, '..', 'src', 'assets', 'gallery', `${spec.id}.${ext}`);
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));

        console.log(`Saved: ${outputPath}`);
        return outputPath;
      }
    }

    console.log('No image generated');
    return null;

  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Generating cinematic gallery replacements...\n');

  for (const spec of IMAGES_TO_GENERATE) {
    await generateImage(spec);
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\nDone! Review images in src/assets/gallery/');
}

main().catch(console.error);
