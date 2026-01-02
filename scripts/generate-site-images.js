/**
 * AI.TELIER Site Image Generator
 * Generates images for the website using DALL-E 3
 * Based on Taypuri Brand Visual System v4.2
 */

import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI (will use OPENAI_API_KEY from env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../src/assets/generated');

// ============================================================================
// TAYPURI BRAND VISUAL STYLES
// ============================================================================

const VISUAL_STYLES = {
  'urban-brutalist': `Black and white atmospheric urban photography with cold desaturated tones, brutal concrete geometry, raw industrial structures, tunnels, overpasses, urban architectural voids. Deep blacks and harsh white light creating high contrast. Grainy film texture, analog imperfections, slight blur from motion, subtle noise. GEOMETRIC DIGITAL INTERVENTIONS: Flat solid color blocks in olive green (#8dc75e), sharp rectangles and bars cutting through the photo, aligned like OS UI fragments. No gradients, only flat color. FIGURES: When present appear as silhouettes or partial profiles, hooded, walking or turning away, never posed, never smiling, anonymous, cinematic, outsider energy. DIGITAL ARTIFACTS: Micro-glitches, scanlines, pixel fragments, horizontal data streaks, extremely subtle matrix-like rain used as texture not illustration. No heavy sci-fi VFX. TENSION: Visual tension between gritty analog photograph and razor-sharp digital overlays. Anti-corporate, anti-polished, anti-algorithm aesthetic. Editorial resistance and manifesto energy. MOOD: Dystopian contemporary realism, systemic rupture, a glitch in reality. Clean composition, strong negative space, graphic hierarchy. FORBIDDEN: 3D renders, glossy surfaces, surreal fantasy elements, soft gradients, warm saturated colors, ANY VISIBLE TEXT OR LETTERS OR WORDS on image.`,

  'shamanic-cinematic': `CINEMATIC SHAMANIC FUTURISM. Shot on Arri Alexa 65, Panavision anamorphic primes 40-100mm. Real photography aesthetic NOT 3D render. Feature film quality - Blade Runner 2049 meets Planet Earth II meets Annihilation. ENVIRONMENT: Bioengineered wilderness, nature enhanced by symbiotic tech. Massive trees with bioluminescent circuitry in bark. Overgrown brutalist ruins as substrate for new ecosystem. Water everywhere: rain, mist, flooded areas. Perpetual twilight: blue hour, golden hour, or deep night. LIGHTING: ONLY motivated practical sources - bioluminescence is REAL light. High contrast 6:1 to 10:1 ratio, deep shadows, glowing highlights. Multi-source color: cyan from fungal, amber from sap, green from moss, magenta from flowers. Volumetric atmosphere catches ALL light. COLOR: Vibrant bioluminescent primaries: CYAN, EMERALD, AMBER, MAGENTA, VIOLET on earth tone base. No flat neon - all glow has DEPTH. Blade Runner 2049 + Annihilation grading. CAMERA: Observational distance OR intimate macro. Shallow DoF T1.4-T2.8. Anamorphic oval bokeh, horizontal flares. Frame holds on moments. TEXTURE: Organic 35mm film grain 400-800 ISO. Material reality: fur, wet surfaces, glow depth. Slight halation. Rain on lens occasionally. FORBIDDEN: Videogame CGI, flat digital illustration, uniform black backgrounds, clean sci-fi sterility, cartoonish proportions, static flat lighting, HDR crunchiness, ANY TEXT.`,

  'full-rotoscope': `Waking Life rotoscoping style, hand-drawn outlines with organic wobble, painterly cell-shading, surreal shifting contours. Realistic human proportions but with dreamlike warping at the edges. Minimal color gradients, flat muted tones with olive green (#8dc75e) as occasional unexpected color accent. Background half-rendered, half-sketch, as if reality is dissolving. Subtle trembling lines, slight motion blur even in still frame. Analog film grain over digital drawing. THEMES: Questioning reality, exploring possibilities, consciousness awakening, modern life tension. Characters appear engaged, curious, or in moment of realization - never sad or melancholic. COMPOSITION: Mid-shot or full-body in everyday environments that feel slightly unreal or bending, with objects stretching or melting subtly. FORBIDDEN: Sad expressions, melancholic faces, tears, depression, glossy lighting, anime shine, perfect symmetry, heavy stylization. AESTHETIC: Waking Life (2001), A Scanner Darkly, indie rotoscope animation, dreamlike realism. NO TEXT on image.`,

  'liminal-hybrid': `THRESHOLD HYBRID: Subject in aggressive sketch overlay, environment as soft photo base with granular texture. CORE STYLE: Digital Rotoscoping Animation, Waking Life style, Richard Linklater inspired. LINE WORK: Bold outlines, vibrating lines only on the subject. TEXTURE: Intense cross-hatching on the figure, environment has heavy film grain texture overlay. ATMOSPHERE: Subtle visual instability, high contrast between the sketch subject and the photographic background. Muted color palette on the environment (teal/taupe), subject uses saturated color accents. AI.TELIER CONCEPTUAL LAYER: Brutalist composition, CORE PALETTE accents (Neon Green #8dc75e / Black / Cream), threshold between states visualization. COMPOSITION: Cinematic composition, soft depth of field, angular perspective. ABSOLUTELY NO TEXT OR LETTERS OR WORDS on image.`
};

// ============================================================================
// IMAGE DEFINITIONS
// ============================================================================

const IMAGES_TO_GENERATE = [
  {
    id: 'hero-brutalist',
    filename: 'hero-brutalist-new.png',
    style: 'urban-brutalist',
    subject: 'Concrete tunnel perspective leading toward distant light, solitary hooded figure walking away from camera, geometric olive green (#8dc75e) overlay bars cutting through frame like UI fragments, fog and mist in air, high contrast black and white with green accents',
    context: 'Website hero image for AI consulting studio',
    mood: 'Mysterious, powerful, inviting the unknown',
    dimensions: '1792x1024'  // Wide for hero
  },
  {
    id: 'breather-forest',
    filename: 'breather-cinematic.png',
    style: 'shamanic-cinematic',
    subject: 'Bioluminescent forest corridor at twilight, no visible human figures, ancient overgrown path leads toward soft cyan and emerald glow, massive trees with circuitry patterns in bark, mist and volumetric light, water reflections on flooded ground',
    context: 'Full-width breathing space between website sections',
    mood: 'Transition, infinite possibility, depth and mystery',
    dimensions: '1792x1024'  // Ultra-wide for breather
  },
  {
    id: 'manifesto-contemplation',
    filename: 'manifesto-rotoscope.png',
    style: 'full-rotoscope',
    subject: 'Single person standing at large window looking outward, contemplative three-quarter pose, environment dissolving into sketch lines at edges, moment before important decision, subtle olive green accent in clothing or light',
    context: 'Side image for manifesto text section',
    mood: 'Introspective, hopeful, threshold of transformation',
    dimensions: '1024x1024'  // Square for side placement
  },
  {
    id: 'about-threshold',
    filename: 'about-threshold.png',
    style: 'liminal-hybrid',
    subject: 'Figure at crossroads in urban environment, sketch overlay on person contrasting with soft photo background, geometric composition, sense of choice and direction, architectural elements framing the scene',
    context: 'Background for About/BriefAbout section',
    mood: 'Decisional clarity, filtered purpose, boundaries defined',
    dimensions: '1792x1024'  // Wide for background
  }
];

// ============================================================================
// GENERATION FUNCTION
// ============================================================================

async function generateImage(imageConfig) {
  const { id, filename, style, subject, context, mood, dimensions } = imageConfig;

  console.log(`\n🎨 Generating: ${id}`);
  console.log(`   Style: ${style}`);
  console.log(`   Dimensions: ${dimensions}`);

  // Build the full prompt
  const baseStyle = VISUAL_STYLES[style];
  const fullPrompt = `${baseStyle}

SUBJECT: ${subject}
CONTEXT: ${context}
MOOD: ${mood}

CRITICAL: Absolutely NO text, letters, words, numbers, or typography anywhere in the image. Pure visual composition only.`;

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      size: dimensions,
      quality: 'hd',
      style: 'vivid',
      n: 1
    });

    const imageUrl = response.data[0].url;
    const revisedPrompt = response.data[0].revised_prompt;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Save the image
    const outputPath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(outputPath, Buffer.from(imageBuffer));

    console.log(`   ✓ Saved: ${filename}`);
    console.log(`   ✓ DALL-E revised prompt saved to log`);

    return {
      id,
      filename,
      path: outputPath,
      url: imageUrl,
      revisedPrompt,
      success: true
    };

  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    return {
      id,
      filename,
      error: error.message,
      success: false
    };
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  AI.TELIER Site Image Generator');
  console.log('  Based on Taypuri Brand Visual System v4.2');
  console.log('═══════════════════════════════════════════════════════════════');

  if (!process.env.OPENAI_API_KEY) {
    console.error('\n❌ OPENAI_API_KEY environment variable not set!');
    console.log('\nTo run this script:');
    console.log('  export OPENAI_API_KEY=sk-your-key-here');
    console.log('  node scripts/generate-site-images.js');
    process.exit(1);
  }

  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📷 Images to generate: ${IMAGES_TO_GENERATE.length}`);

  const results = [];

  for (const imageConfig of IMAGES_TO_GENERATE) {
    const result = await generateImage(imageConfig);
    results.push(result);

    // Small delay between generations to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  GENERATION COMPLETE');
  console.log('═══════════════════════════════════════════════════════════════');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n✓ Successful: ${successful.length}/${results.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed: ${failed.length}`);
    failed.forEach(f => console.log(`  - ${f.id}: ${f.error}`));
  }

  // Save generation log
  const logPath = path.join(OUTPUT_DIR, 'generation-log.json');
  await fs.writeFile(logPath, JSON.stringify({
    generated: new Date().toISOString(),
    results
  }, null, 2));
  console.log(`\n📄 Log saved: generation-log.json`);

  console.log('\n🎯 Next steps:');
  console.log('   1. Review generated images in src/assets/generated/');
  console.log('   2. Update components to use new images');
  console.log('   3. Regenerate any that need adjustments');
}

main().catch(console.error);
