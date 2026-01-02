/**
 * Generate Hero Image Options for AI.TELIER
 * 5 concepts that represent the brand essence:
 * - Translation of complexity into presence
 * - Artisanal identity crafting
 * - Revealing what's hidden
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
CRITICAL: This must look like a STILL FROM AN AUTEUR FILM, not AI art.

TECHNICAL:
- Shot on 35mm Kodak Vision3 500T or Portra 800
- Heavy visible film grain (this is essential)
- Practical lighting only - tungsten, natural, or neon reflections
- Shallow depth of field T1.4-T2.0
- Lens characteristics: slight halation, breathing, flares
- Color: crushed blacks, lifted shadows, desaturated with single accent

COMPOSITION:
- Off-center, asymmetric framing
- Negative space as storytelling element
- Subject not looking at camera
- Caught in moment, never posed

FORBIDDEN:
- Clean digital aesthetic
- CGI glow or particles
- Stock photo composition
- Perfect skin/lighting
- Bright saturated colors
- Any "AI art" markers
`;

const HERO_OPTIONS = [
  {
    id: 'hero-darkroom-reveal',
    concept: 'O REVELADOR - Quarto Escuro',
    prompt: `
${CINEMA_BASE}

WONG KAR-WAI meets darkroom photography.

SUBJECT: Hands in a photographic darkroom, developing a photograph.
The image is emerging from the chemical bath - face becoming visible.
Red safelight casting deep shadows, single green accent (#8dc75e)
from the emerging photograph's content.

FRAMING: Close on hands and developing tray, shallow focus.
Face in photo slightly visible but mysterious.
Tongs holding paper, liquid rippling.

TEXTURE: Heavy grain, wet surfaces reflecting light, steam/vapor.
MOOD: Revelation, patience, the moment before clarity.
METAPHOR: Extracting identity that already exists.

ASPECT: 16:9 wide cinematic
NOT: Digital screens, modern tech, bright lighting.
`
  },
  {
    id: 'hero-atelier-workspace',
    concept: 'O ATELIER - Mesa de Trabalho',
    prompt: `
${CINEMA_BASE}

CLAIRE DENIS intimacy meets artisan workshop.

SUBJECT: Overhead or angled view of creator's workspace at night.
Wooden table with fragments of identity work spread out:
handwritten notes, photographs, sketches, torn paper.
Single desk lamp creating pool of warm light.
Hands visible at edge of frame, arranging pieces.

FRAMING: Bird's eye or 45-degree angle, partial hands visible.
Depth through scattered papers at different heights.
Window with city lights bokeh in background.

TEXTURE: Wood grain, paper textures, ink marks, wear.
COLOR: Warm tungsten light, deep shadows, green accent on one element.
MOOD: Late night creation, careful curation, artisanal process.
METAPHOR: Building identity piece by piece.

ASPECT: 16:9 wide
NOT: Clean minimalist desk, Apple products, corporate aesthetic.
`
  },
  {
    id: 'hero-mirror-depth',
    concept: 'O ESPELHO PROFUNDO',
    prompt: `
${CINEMA_BASE}

DAVID LYNCH meets WONG KAR-WAI reflection study.

SUBJECT: Person seen through/reflected in aged mirror or glass.
The reflection shows something the direct view doesn't -
more depth, different light, another layer.
Figure partially obscured, face not fully visible.
Mirror has imperfections, spots, age marks.

FRAMING: Medium shot, reflection dominant, real figure at edge.
Layered depth: foreground blur, mirror surface, reflected figure.
Green accent (#8dc75e) in reflected light only.

TEXTURE: Mirror imperfections, dust particles in light, grain.
MOOD: Duality, hidden depths, what's unseen becoming visible.
METAPHOR: "You are more than you can show" - the mirror reveals it.

ASPECT: 16:9 wide
NOT: Perfect mirror, clean glass, obvious supernatural elements.
`
  },
  {
    id: 'hero-emergence-light',
    concept: 'A EMERGÊNCIA - Luz e Sombra',
    prompt: `
${CINEMA_BASE}

CLAIRE DENIS skin and light study.

SUBJECT: Close portrait, face half in deep shadow, half in warm light.
The lit side reveals texture, humanity, presence.
The shadow side suggests depth, complexity, what's hidden.
Eyes looking slightly away from camera, thoughtful.
Visible skin texture - pores, small imperfections = real.

FRAMING: Tight close-up, unconventional crop.
One eye visible, one in shadow.
Background completely dark or soft bokeh.

TEXTURE: Skin as landscape, every pore visible, heavy film grain.
COLOR: Warm light on lit side, cool shadow, green accent in eye reflection.
MOOD: Intimate revelation, vulnerability, emergence from hiding.
METAPHOR: The moment of becoming visible.

ASPECT: 16:9 (will be cropped from tighter shot)
NOT: Beauty lighting, fashion aesthetic, smooth skin, direct gaze.
`
  },
  {
    id: 'hero-weaver-threads',
    concept: 'O TECELÃO - Fios da Narrativa',
    prompt: `
${CINEMA_BASE}

APICHATPONG contemplative craft meets tactile texture.

SUBJECT: Hands working with threads, strings, or thin wires.
Creating something - a web, a pattern, a connection.
Natural light from window, dust particles visible in beam.
Threads catching light, some green (#8dc75e) among neutral colors.
Simple wooden frame or loom visible.

FRAMING: Close on hands and threads, face not visible.
Depth through thread layers at different distances.
Background soft, suggesting workshop or home space.

TEXTURE: Thread fibers, skin texture on hands, wood grain, dust in air.
MOOD: Patience, craft, the slow work of building something lasting.
METAPHOR: Weaving narrative, connecting threads of identity.

ASPECT: 16:9 wide
NOT: Industrial machinery, clean modern space, rushed action.
`
  }
];

async function generateImage(spec) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Generating: ${spec.concept}`);
  console.log(`ID: ${spec.id}`);
  console.log('='.repeat(50));

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

        const outputDir = path.join(__dirname, '..', 'public', 'hero-options');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${spec.id}.${ext}`);
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));

        console.log(`✓ Saved: ${outputPath}`);
        return { success: true, path: outputPath, concept: spec.concept };
      }
    }

    const textResponse = parts.find(p => p.text)?.text;
    if (textResponse) {
      console.log('Model text response:', textResponse.substring(0, 200));
    }

    return { success: false, concept: spec.concept, error: 'No image in response' };

  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    return { success: false, concept: spec.concept, error: error.message };
  }
}

async function main() {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     AI.TELIER HERO IMAGE OPTIONS GENERATOR               ║');
  console.log('║     5 Concepts for Brand-Aligned Hero                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('\nConcepts:');
  HERO_OPTIONS.forEach((opt, i) => {
    console.log(`  ${i + 1}. ${opt.concept}`);
  });

  const results = [];

  for (const spec of HERO_OPTIONS) {
    const result = await generateImage(spec);
    results.push(result);
    // Rate limiting between requests
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                    GENERATION COMPLETE                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝');

  console.log('\nResults:');
  results.forEach((r, i) => {
    const status = r.success ? '✓' : '✗';
    console.log(`  ${status} ${i + 1}. ${r.concept}`);
    if (r.path) console.log(`      → ${r.path}`);
    if (r.error) console.log(`      Error: ${r.error}`);
  });

  console.log('\n→ Review images in: public/hero-options/');
  console.log('→ Choose the one that best represents AI.TELIER\n');
}

main().catch(console.error);
