#!/usr/bin/env node
/**
 * AI.TELIER Gallery Image Generation
 * Uses COMPLETE brand prompts from visual-styles.md
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEYS = [
  'AIzaSyA7Cc3Y3die70hZUmavfQdJ7pAQLvh1Z5A',
  'AIzaSyCymMwx2gKfuc2gUnt2KbB6WTRlxgTCwRw'
];

let currentKeyIndex = 0;
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'gallery');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// COMPLETE BRAND PROMPTS
const BRAND_STYLES = {
  'shamanic-cinematic': `CINEMATIC SHAMANIC FUTURISM. Shot on Arri Alexa 65, Panavision anamorphic primes 40-100mm. Real photography aesthetic NOT 3D render. Feature film quality - Blade Runner 2049 meets Planet Earth II meets Annihilation.

ENVIRONMENT: Bioengineered wilderness, nature enhanced by symbiotic tech. Massive trees with bioluminescent circuitry in bark. Overgrown brutalist ruins as substrate for new ecosystem. Water everywhere: rain, mist, flooded areas. Perpetual twilight: blue hour, golden hour, or deep night.

LIGHTING: ONLY motivated practical sources - bioluminescence is REAL light. High contrast 6:1 to 10:1 ratio, deep shadows, glowing highlights. Multi-source color: cyan from fungal, amber from sap, green from moss, magenta from flowers. Volumetric atmosphere catches ALL light.

COLOR: Vibrant bioluminescent primaries: CYAN, EMERALD, AMBER, MAGENTA, VIOLET on earth tone base. No flat neon - all glow has DEPTH. Blade Runner 2049 + Annihilation grading.

CAMERA: Observational distance OR intimate macro. Shallow DoF T1.4-T2.8. Anamorphic oval bokeh, horizontal flares. Frame holds on moments.

TEXTURE: Organic 35mm film grain 400-800 ISO. Material reality: fur, wet surfaces, glow depth. Slight halation. Rain on lens occasionally.

FORBIDDEN: Videogame CGI, flat digital illustration, uniform black backgrounds, clean sci-fi sterility, cartoonish proportions, static flat lighting, HDR crunchiness, ANY TEXT.`,

  'urban-brutalist': `Black and white atmospheric urban photography with cold desaturated tones, brutal concrete geometry, raw industrial structures, tunnels, overpasses, urban architectural voids. Deep blacks and harsh white light creating high contrast. Grainy film texture, analog imperfections, slight blur from motion, subtle noise.

GEOMETRIC DIGITAL INTERVENTIONS: Flat solid color blocks in olive green (#8dc75e), sharp rectangles and bars cutting through the photo, aligned like OS UI fragments. No gradients, only flat color.

FIGURES: When present appear as silhouettes or partial profiles, hooded, walking or turning away, never posed, never smiling, anonymous, cinematic, outsider energy.

DIGITAL ARTIFACTS: Micro-glitches, scanlines, pixel fragments, horizontal data streaks, extremely subtle matrix-like rain used as texture not illustration. No heavy sci-fi VFX.

TENSION: Visual tension between gritty analog photograph and razor-sharp digital overlays. Anti-corporate, anti-polished, anti-algorithm aesthetic. Editorial resistance and manifesto energy.

MOOD: Dystopian contemporary realism, systemic rupture, a glitch in reality. Clean composition, strong negative space, graphic hierarchy.

FORBIDDEN: 3D renders, glossy surfaces, surreal fantasy elements, soft gradients, warm saturated colors, ANY VISIBLE TEXT OR LETTERS OR WORDS on image.`,

  'full-rotoscope': `Waking Life rotoscoping style, hand-drawn outlines with organic wobble, painterly cell-shading, surreal shifting contours. Realistic human proportions but with dreamlike warping at the edges. Minimal color gradients, flat muted tones with olive green (#8dc75e) as occasional unexpected color accent. Background half-rendered, half-sketch, as if reality is dissolving. Subtle trembling lines, slight motion blur even in still frame. Analog film grain over digital drawing.

THEMES: Questioning reality, exploring possibilities, consciousness awakening, modern life tension. Characters appear engaged, curious, or in moment of realization - never sad or melancholic.

COMPOSITION: Mid-shot or full-body in everyday environments that feel slightly unreal or bending, with objects stretching or melting subtly.

FORBIDDEN: Sad expressions, melancholic faces, tears, depression, glossy lighting, anime shine, perfect symmetry, heavy stylization.

AESTHETIC: Waking Life (2001), A Scanner Darkly, indie rotoscope animation, dreamlike realism. NO TEXT on image.`,

  'liminal-hybrid': `THRESHOLD HYBRID: Subject in aggressive sketch overlay, environment as soft photo base with granular texture.

CORE STYLE: Digital Rotoscoping Animation, Waking Life style, Richard Linklater inspired.

LINE WORK: Bold outlines, vibrating lines only on the subject.

TEXTURE: Intense cross-hatching on the figure, environment has heavy film grain texture overlay.

ATMOSPHERE: Subtle visual instability, high contrast between the sketch subject and the photographic background.

Muted color palette on the environment (teal/taupe), subject uses saturated color accents.

AI.TELIER CONCEPTUAL LAYER: Brutalist composition, CORE PALETTE accents (Neon Green #8dc75e / Black / Cream), threshold between states visualization.

COMPOSITION: Cinematic composition, soft depth of field, angular perspective.

ABSOLUTELY NO TEXT OR LETTERS OR WORDS on image.`
};

// Gallery images to generate - creating an art space experience
const GALLERY_IMAGES = [
  // SHAMANIC CINEMATIC - Nature, consciousness, ecosystem
  {
    style: 'shamanic-cinematic',
    name: 'gallery-forest-portal',
    subject: 'Ancient forest corridor with bioluminescent path leading into mist, no human figures, mysterious glowing fungi on tree bark, twilight atmosphere, portal-like clearing in distance',
    mood: 'Threshold, infinite possibility, ancestral future',
    filename: 'forest-portal.png'
  },
  {
    style: 'shamanic-cinematic',
    name: 'gallery-water-ceremony',
    subject: 'Flooded brutalist ruin at dawn, water reflecting cyan and amber bioluminescence, vegetation reclaiming concrete, mist rising from water surface, no humans',
    mood: 'Rebirth, nature reclaiming, sacred space',
    filename: 'water-ceremony.png'
  },
  {
    style: 'shamanic-cinematic',
    name: 'gallery-tree-circuitry',
    subject: 'Extreme close-up macro of tree bark with integrated bioluminescent circuitry patterns, organic meeting digital, emerald and amber glow, rain droplets',
    mood: 'Symbiosis, organic technology, living systems',
    filename: 'tree-circuitry.png'
  },

  // URBAN BRUTALIST - Manifesto, structure, outsider
  {
    style: 'urban-brutalist',
    name: 'gallery-concrete-void',
    subject: 'Massive concrete tunnel perspective, single distant figure walking toward light, geometric green overlay bars cutting through frame diagonally, heavy fog',
    mood: 'Journey, isolation, determination',
    filename: 'concrete-void.png'
  },
  {
    style: 'urban-brutalist',
    name: 'gallery-overpass-solitude',
    subject: 'Urban overpass architecture from below, dramatic upward angle, hooded silhouette at edge, green digital rectangles fragmenting the sky, rain',
    mood: 'Outsider, urban poetry, systemic rupture',
    filename: 'overpass-solitude.png'
  },
  {
    style: 'urban-brutalist',
    name: 'gallery-industrial-light',
    subject: 'Abandoned industrial space with shafts of harsh white light cutting through darkness, geometric shadows on concrete floor, subtle green digital artifacts',
    mood: 'Revelation, truth through darkness',
    filename: 'industrial-light.png'
  },

  // FULL ROTOSCOPE - Narrative, personal, consciousness
  {
    style: 'full-rotoscope',
    name: 'gallery-window-moment',
    subject: 'Person at large window looking outward, contemplative pose, environment dissolving into sketch at edges, warm interior light, moment of realization',
    mood: 'Threshold, awakening, clarity',
    filename: 'window-moment.png'
  },
  {
    style: 'full-rotoscope',
    name: 'gallery-cafe-conversation',
    subject: 'Two people in deep conversation at cafe table, reality warping subtly around them, objects slightly stretching, engaged curious expressions',
    mood: 'Connection, ideas flowing, dialogue',
    filename: 'cafe-conversation.png'
  },
  {
    style: 'full-rotoscope',
    name: 'gallery-street-walk',
    subject: 'Person walking through urban street, buildings bending dreamlike, puddles reflecting distorted reality, curious expression looking up',
    mood: 'Discovery, urban dream, possibility',
    filename: 'street-walk.png'
  },

  // LIMINAL HYBRID - Transition, transformation
  {
    style: 'liminal-hybrid',
    name: 'gallery-threshold-figure',
    subject: 'Person standing in doorway between dark interior and bright exterior, aggressive sketch overlay on figure, photographic environment, cross-hatched details',
    mood: 'Transformation, decision point, becoming',
    filename: 'threshold-figure.png'
  },
  {
    style: 'liminal-hybrid',
    name: 'gallery-studio-create',
    subject: 'Artist hands working on canvas, bold sketch lines on hands, studio environment soft and grainy, green accent on paint or light',
    mood: 'Creation, craft, making visible',
    filename: 'studio-create.png'
  }
];

function getNextApiKey() {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}

async function generateImage(config) {
  const apiKey = getNextApiKey();
  const basePrompt = BRAND_STYLES[config.style];

  const fullPrompt = `Generate an image:

${basePrompt}

SUBJECT: ${config.subject}
MOOD: ${config.mood}

Additional: Ultra high quality, 16:9 aspect ratio, cinematic composition`;

  console.log(`\n🎨 Generating: ${config.name}`);
  console.log(`   Style: ${config.style}`);
  console.log(`   Subject: ${config.subject.substring(0, 60)}...`);

  const requestBody = JSON.stringify({
    contents: [{ parts: [{ text: fullPrompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
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
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) {
            console.log(`   ❌ API Error: ${response.error.message}`);
            reject(new Error(response.error.message));
            return;
          }
          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content?.parts || [];
            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
                const outputPath = path.join(OUTPUT_DIR, config.filename);
                fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, 'base64'));
                console.log(`   ✅ Saved: ${outputPath}`);
                resolve(outputPath);
                return;
              }
            }
          }
          console.log(`   ⚠️  No image in response`);
          reject(new Error('No image data'));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   AI.TELIER Gallery Generation');
  console.log('   Using COMPLETE brand prompts from visual-styles.md');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`🎨 Images to generate: ${GALLERY_IMAGES.length}`);

  const results = [];

  for (const config of GALLERY_IMAGES) {
    try {
      const outputPath = await generateImage(config);
      results.push({ name: config.name, status: 'success', path: outputPath });
      await new Promise(resolve => setTimeout(resolve, 3000)); // Rate limit
    } catch (error) {
      results.push({ name: config.name, status: 'failed', error: error.message });
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('   Generation Summary');
  console.log('═══════════════════════════════════════════════════════════');

  const success = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'failed').length;

  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\nFailed images:');
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`   - ${r.name}: ${r.error}`);
    });
  }

  console.log(`\n📊 Total: ${success}/${GALLERY_IMAGES.length} images generated`);
}

main().catch(console.error);
