/**
 * Generate Hero Images - USANDO OS PROMPTS DO BRAND CORRETAMENTE
 * Aspect Ratio: 16:9 (1920x1080)
 * Estilos: shamanic-cinematic, urban-brutalist, liminal-hybrid
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

// ============================================================
// BRAND PROMPTS - EXATAMENTE COMO DEFINIDOS
// ============================================================

const SHAMANIC_CINEMATIC = `
CINEMATIC SHAMANIC FUTURISM. Shot on Arri Alexa 65, Panavision anamorphic primes 40-100mm. Real photography aesthetic NOT 3D render. Feature film quality - Blade Runner 2049 meets Planet Earth II meets Annihilation.

ENVIRONMENT: Bioengineered wilderness, nature enhanced by symbiotic tech. Massive trees with bioluminescent circuitry in bark. Overgrown brutalist ruins as substrate for new ecosystem. Water everywhere: rain, mist, flooded areas. Perpetual twilight: blue hour, golden hour, or deep night.

LIGHTING: ONLY motivated practical sources - bioluminescence is REAL light. High contrast 6:1 to 10:1 ratio, deep shadows, glowing highlights. Multi-source color: cyan from fungal, amber from sap, green from moss, magenta from flowers. Volumetric atmosphere catches ALL light.

COLOR: Vibrant bioluminescent primaries: CYAN, EMERALD, AMBER, MAGENTA, VIOLET on earth tone base. No flat neon - all glow has DEPTH. Blade Runner 2049 + Annihilation grading.

CAMERA: Observational distance OR intimate macro. Shallow DoF T1.4-T2.8. Anamorphic oval bokeh, horizontal flares. Frame holds on moments.

TEXTURE: Organic 35mm film grain 400-800 ISO. Material reality: fur, wet surfaces, glow depth. Slight halation. Rain on lens occasionally.

FORBIDDEN: Videogame CGI, flat digital illustration, uniform black backgrounds, clean sci-fi sterility, cartoonish proportions, static flat lighting, HDR crunchiness, ANY TEXT.
`;

const URBAN_BRUTALIST = `
Black and white atmospheric urban photography with cold desaturated tones, brutal concrete geometry, raw industrial structures, tunnels, overpasses, urban architectural voids. Deep blacks and harsh white light creating high contrast. Grainy film texture, analog imperfections, slight blur from motion, subtle noise.

GEOMETRIC DIGITAL INTERVENTIONS: Flat solid color blocks in olive green (#8dc75e), sharp rectangles and bars cutting through the photo, aligned like OS UI fragments. No gradients, only flat color.

FIGURES: When present appear as silhouettes or partial profiles, hooded, walking or turning away, never posed, never smiling, anonymous, cinematic, outsider energy.

DIGITAL ARTIFACTS: Micro-glitches, scanlines, pixel fragments, horizontal data streaks, extremely subtle matrix-like rain used as texture not illustration. No heavy sci-fi VFX.

TENSION: Visual tension between gritty analog photograph and razor-sharp digital overlays. Anti-corporate, anti-polished, anti-algorithm aesthetic. Editorial resistance and manifesto energy.

MOOD: Dystopian contemporary realism, systemic rupture, a glitch in reality. Clean composition, strong negative space, graphic hierarchy.

FORBIDDEN: 3D renders, glossy surfaces, surreal fantasy elements, soft gradients, warm saturated colors, ANY VISIBLE TEXT OR LETTERS OR WORDS on image.
`;

const LIMINAL_HYBRID = `
THRESHOLD HYBRID: Subject in aggressive sketch overlay, environment as soft photo base with granular texture.

CORE STYLE: Digital Rotoscoping Animation, Waking Life style, Richard Linklater inspired.

LINE WORK: Bold outlines, vibrating lines only on the subject.

TEXTURE: Intense cross-hatching on the figure, environment has heavy film grain texture overlay.

ATMOSPHERE: Subtle visual instability, high contrast between the sketch subject and the photographic background.

Muted color palette on the environment (teal/taupe), subject uses saturated color accents.

AI.TELIER CONCEPTUAL LAYER: Brutalist composition, CORE PALETTE accents (Neon Green #8dc75e / Black / Cream), threshold between states visualization.

COMPOSITION: Cinematic composition, soft depth of field, angular perspective.

ABSOLUTELY NO TEXT OR LETTERS OR WORDS on image.
`;

// ============================================================
// HERO OPTIONS - USANDO ESTILOS DO BRAND
// ============================================================

const HERO_OPTIONS = [
  {
    id: 'hero-shamanic-portal',
    style: 'shamanic-cinematic',
    prompt: `
${SHAMANIC_CINEMATIC}

SUBJECT: Solitary hooded figure standing at threshold of massive overgrown brutalist archway. Bioluminescent moss and circuitry veins glow emerald and cyan on concrete surfaces. Mist rising from flooded ground. Figure seen from behind, small against architecture.

CONTEXT: Website hero image for AI.TELIER - studio de storytelling e identidade
MOOD: Transformational threshold, "O Futuro É Ancestral", power of becoming visible

ASPECT RATIO: 16:9 ultra-wide cinematic (1920x1080)
`
  },
  {
    id: 'hero-shamanic-forest',
    style: 'shamanic-cinematic',
    prompt: `
${SHAMANIC_CINEMATIC}

SUBJECT: Dense bioengineered forest corridor, path leading toward distant amber glow. Trees with bioluminescent bark patterns - cyan and emerald circuitry. Heavy mist, rain visible in light beams. No visible figure - the viewer IS the one walking through.

CONTEXT: Website hero for identity studio - "Traduzimos o Invisível"
MOOD: Journey into transformation, nature reclaiming tech, threshold moment

ASPECT RATIO: 16:9 ultra-wide cinematic (1920x1080)
`
  },
  {
    id: 'hero-brutalist-tunnel',
    style: 'urban-brutalist',
    prompt: `
${URBAN_BRUTALIST}

SUBJECT: Concrete tunnel perspective, harsh white light at end creating silhouette of walking figure. Geometric olive green (#8dc75e) bars cutting horizontally through frame. Wet floor reflecting everything. Hooded figure walking toward light, back to camera.

CONTEXT: Website hero for AI.TELIER - anti-corporate identity studio
MOOD: Emergence from invisibility, systemic rupture, manifesto energy

ASPECT RATIO: 16:9 ultra-wide cinematic (1920x1080)
`
  },
  {
    id: 'hero-brutalist-overpass',
    style: 'urban-brutalist',
    prompt: `
${URBAN_BRUTALIST}

SUBJECT: Massive concrete overpass intersection from below, dramatic angles. Single small silhouette figure standing on edge against white sky. Olive green (#8dc75e) rectangular blocks fragmenting the composition. Scanlines texture.

CONTEXT: Hero image for studio that translates invisible complexity into presence
MOOD: Outsider becoming visible, structural power, glitch in reality

ASPECT RATIO: 16:9 ultra-wide cinematic (1920x1080)
`
  },
  {
    id: 'hero-liminal-threshold',
    style: 'liminal-hybrid',
    prompt: `
${LIMINAL_HYBRID}

SUBJECT: Figure at doorway/threshold, half in rotoscope sketch style, half emerging into photographic reality. The transition from sketch to photo happens across their body. Environment is soft brutalist interior with film grain.

CONTEXT: AI.TELIER hero - "Você é mais do que consegue mostrar"
MOOD: Transformation in progress, identity emerging, threshold between states

ASPECT RATIO: 16:9 ultra-wide cinematic (1920x1080)
`
  }
];

async function generateImage(spec) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`STYLE: ${spec.style}`);
  console.log(`ID: ${spec.id}`);
  console.log('─'.repeat(60));

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

        const outputDir = path.join(__dirname, '..', 'public', 'hero-options-v2');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${spec.id}.${ext}`);
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));

        console.log(`✓ SAVED: ${spec.id}.${ext}`);
        return { success: true, path: outputPath };
      }
    }

    console.log('✗ No image generated');
    return { success: false };

  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║  AI.TELIER HERO - BRAND-CORRECT GENERATION                     ║
║  Using actual brand prompts + 16:9 aspect ratio                ║
╚════════════════════════════════════════════════════════════════╝

Styles being used:
  • shamanic-cinematic (Blade Runner 2049 + Annihilation)
  • urban-brutalist (B&W + olive green #8dc75e overlays)
  • liminal-hybrid (rotoscope threshold)

Generating 5 options...
`);

  const results = [];

  for (const spec of HERO_OPTIONS) {
    const result = await generateImage(spec);
    results.push({ ...spec, ...result });
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`
${'═'.repeat(60)}
GENERATION COMPLETE
${'═'.repeat(60)}

Results:`);

  results.forEach((r, i) => {
    const icon = r.success ? '✓' : '✗';
    console.log(`  ${icon} ${r.style}: ${r.id}`);
  });

  console.log(`
→ Images saved to: public/hero-options-v2/
→ All in 16:9 aspect ratio
→ Using brand-defined visual styles
`);
}

main().catch(console.error);
