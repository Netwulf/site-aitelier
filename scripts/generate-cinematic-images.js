/**
 * Cinematic Image Generator - AI.TELIER
 *
 * Generates film-quality images using Google Gemini
 * Aesthetic: Wong Kar-Wai, Apichatpong, Claire Denis, Villeneuve
 *
 * Usage: node scripts/generate-cinematic-images.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const GEMINI_API_KEY = envContent.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in .env');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// =============================================================================
// CINEMATIC PROMPT SYSTEM
// =============================================================================

const CINEMA_BASE = `
CRITICAL: This must look like a STILL FROM A FILM, not AI art.

TECHNICAL FOUNDATION:
- Shot on 35mm Kodak Vision3 500T, pushed 1-2 stops
- Heavy visible film grain (ISO 800-1600 aesthetic)
- Practical lighting ONLY - no CGI glow
- Shallow depth of field, T1.4-T2.0
- Slight motion blur on edges
- Lens imperfections: flares, halation, breathing
- Color: crushed blacks, lifted shadows, single accent color

COMPOSITION RULES:
- Off-center framing (rule of thirds broken intentionally)
- Negative space as storytelling
- Subject partially obscured or turning away
- Environmental context matters
- Never posed, always caught in moment

FORBIDDEN:
- Clean digital render aesthetic
- Perfect symmetry
- Uniform studio lighting
- Flawless skin texture
- Bright saturated colors
- Any holographic/particle effects
- Stock photo composition
- Direct eye contact with camera
`;

const DIRECTORS = {
  wongKarWai: `
WONG KAR-WAI AESTHETIC:
- Neon reflections on wet surfaces
- Blur and smear as emotional texture
- Saturated reds/greens in shadows
- Intimate close-ups, fragmented bodies
- Smoke, rain, condensation on glass
- Melancholic beauty in urban spaces
- Step-printed motion blur
Reference: In the Mood for Love, Chungking Express, 2046
`,

  apichatpong: `
APICHATPONG WEERASETHAKUL AESTHETIC:
- Natural tropical light, dappled shadows
- Contemplative stillness, long gaze
- Nature reclaiming human spaces
- Bioluminescence as spiritual presence
- Slow time, meditative frames
- Bodies at rest in landscape
- Magic realism through mundane
Reference: Uncle Boonmee, Tropical Malady, Memoria
`,

  claireDenis: `
CLAIRE DENIS AESTHETIC:
- Skin as landscape, extreme texture
- Fragmented body close-ups
- Tactile sensuality without explicit
- Desert light, harsh and beautiful
- Silence and tension in frame
- Muscles, sweat, physical labor
- Intimate without invasion
Reference: Beau Travail, 35 Shots of Rum, High Life
`,

  villeneuve: `
DENIS VILLENEUVE AESTHETIC:
- Epic scale with human intimacy
- Silhouettes against vast spaces
- Atmospheric haze, dust, fog
- Monumental architecture dwarfing figures
- Desaturated palette with single accent
- Sound design implied through stillness
- Dread and beauty coexisting
Reference: Blade Runner 2049, Arrival, Dune
`
};

// =============================================================================
// IMAGE SPECIFICATIONS
// =============================================================================

const IMAGES_TO_GENERATE = [
  {
    id: 'hero-cinematic',
    replaces: 'hero-tayna-tech.jpg',
    director: 'villeneuve',
    aspectRatio: '16:9',
    prompt: `
${CINEMA_BASE}
${DIRECTORS.villeneuve}

SUBJECT: Solitary figure seen from behind, standing at threshold of massive
brutalist concrete structure. Dawn light cutting through fog.
Figure wearing dark loose clothing, silhouette against pale sky.
Single accent: olive green (#8dc75e) light leak on right edge.

MOOD: Anticipation before transformation. Power without display.
NOT: Any tech elements, screens, holographics, particles.
`
  },
  {
    id: 'profile-contemplative',
    replaces: 'tayna-profile-new.jpg',
    director: 'wongKarWai',
    aspectRatio: '3:4',
    prompt: `
${CINEMA_BASE}
${DIRECTORS.wongKarWai}

SUBJECT: Mixed-heritage man, 30s, curly dark hair, neck tattoos visible.
Seated in shadow, face half-lit by neon from window.
Cigarette smoke or steam rising. Looking down, not at camera.
Urban night outside - rain on glass, blurred city lights.
Wearing simple dark clothing, nothing ceremonial.

TEXTURE: Heavy grain, halation on highlights, slight blur.
COLOR: Deep shadows, neon green and red reflections.
MOOD: Private moment of thought. No performance.
NOT: Spiritual symbols, perfect lighting, posed meditation.
`
  },
  {
    id: 'profile-street',
    replaces: 'tayna-profile.jpg',
    director: 'claireDenis',
    aspectRatio: '16:9',
    prompt: `
${CINEMA_BASE}
${DIRECTORS.claireDenis}

SUBJECT: Man walking through São Paulo concrete underpass.
Shot from side/behind, mid-stride, slight motion blur.
Harsh afternoon light cutting through structure.
Wearing simple linen shirt, sleeves rolled.
Visible tattoos catching light on forearm and neck.
Sweat on skin - it's hot. Real texture.

ENVIRONMENT: Raw concrete, graffiti tags, urban grit.
Single accent: olive green painted stripe on wall.
MOOD: Purpose without destination. Urban nomad.
NOT: Golden hour perfection, clean streets, fashion shoot pose.
`
  },
  {
    id: 'methodology-workspace',
    replaces: 'tayna-methodology.jpg',
    director: 'apichatpong',
    aspectRatio: '16:9',
    prompt: `
${CINEMA_BASE}
${DIRECTORS.apichatpong}

SUBJECT: Man at wooden table, tropical setting visible through open wall.
Natural light from jungle outside, dappled shadows on table.
Laptop closed, papers spread, hands resting.
Looking outward at nature, not at screen or camera.
Simple space: concrete, wood, plants encroaching.

ATMOSPHERE: Morning mist, humid air visible in light beams.
Wildlife sounds implied through stillness of frame.
MOOD: Thinking happens in pause. Integration of nature/tech.
NOT: Corporate office, coworking aesthetic, staged productivity.
`
  },
  {
    id: 'breather-threshold',
    replaces: null,
    director: 'villeneuve',
    aspectRatio: '21:9',
    prompt: `
${CINEMA_BASE}
${DIRECTORS.villeneuve}

SUBJECT: No people. Abstract threshold space.
Massive concrete corridor, fog rolling through.
Single shaft of light from unseen source above.
Wet floor reflecting everything.
Organic matter (moss, roots) breaking through cracks.

COLOR: Near monochrome with single olive green (#8dc75e)
bioluminescent growth on wall edge.
MOOD: Transition space. Between states. Possibility.
FOR: Full-width breathing image between site sections.
`
  }
];

// =============================================================================
// GENERATION FUNCTION
// =============================================================================

async function generateImage(spec) {
  console.log(`\nGenerating: ${spec.id}`);
  console.log(`Director style: ${spec.director}`);
  console.log(`Replaces: ${spec.replaces || 'NEW IMAGE'}`);

  try {
    // Using Gemini 2.0 Flash for image generation
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      }
    });

    const result = await model.generateContent(spec.prompt);
    const response = await result.response;

    // Check for image in response
    const parts = response.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        const ext = mimeType.split('/')[1] || 'png';

        const outputDir = path.join(__dirname, '..', 'public', 'generated');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${spec.id}.${ext}`);
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));

        console.log(`Saved: ${outputPath}`);
        return outputPath;
      }
    }

    // If no image, log the text response
    const textResponse = parts.find(p => p.text)?.text;
    if (textResponse) {
      console.log('Model response:', textResponse);
    }

    console.log('No image generated - may need different model or approach');
    return null;

  } catch (error) {
    console.error(`Error generating ${spec.id}:`, error.message);
    return null;
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('='.repeat(60));
  console.log('AI.TELIER Cinematic Image Generator');
  console.log('Aesthetic: Wong Kar-Wai / Apichatpong / Claire Denis / Villeneuve');
  console.log('='.repeat(60));

  const results = [];

  for (const spec of IMAGES_TO_GENERATE) {
    const result = await generateImage(spec);
    results.push({ id: spec.id, path: result, replaces: spec.replaces });

    // Rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('GENERATION COMPLETE');
  console.log('='.repeat(60));

  console.log('\nResults:');
  for (const r of results) {
    const status = r.path ? 'OK' : 'FAILED';
    console.log(`  [${status}] ${r.id} -> ${r.replaces || 'NEW'}`);
  }

  console.log('\nNext steps:');
  console.log('1. Review generated images in public/generated/');
  console.log('2. If good, copy to replace originals in lovable-uploads/');
  console.log('3. Run generation again for any that need iteration');
}

main().catch(console.error);
