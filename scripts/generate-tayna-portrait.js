/**
 * Generate Taynã Puri Portrait - Brand Aesthetic
 * Using real photos as reference for exact likeness
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

// Taynã's exact physical description based on real photos
const TAYNA_DESCRIPTION = `
EXACT PERSON DESCRIPTION - Must match precisely:
- Brazilian man, early 30s, medium brown skin tone
- Black curly/wavy hair in modern mullet style: curly fringe on top, longer wavy hair at back reaching shoulders
- Thin black mustache, no beard
- Round transparent/clear frame glasses
- Large white ear gauges/plugs (visible)
- Silver septum nose piercing
- Large geometric/tribal blackwork tattoo covering entire neck and upper chest (Maori/polynesian style patterns)
- Tattoos on both forearms
- Serene, confident expression
- Typically wears neutral tones: beige, cream, black, earth colors
`;

const URBAN_BRUTALIST_STYLE = `
Black and white atmospheric photography with cold desaturated tones, brutal concrete geometry, raw industrial aesthetic. Deep blacks and harsh white light creating high contrast. Grainy film texture, analog imperfections.

GEOMETRIC DIGITAL INTERVENTIONS: Flat solid color blocks in olive green (#8dc75e), sharp rectangles and bars cutting through the photo, aligned like OS UI fragments. No gradients, only flat color.

DIGITAL ARTIFACTS: Micro-glitches, scanlines, subtle matrix-like texture.

MOOD: Dystopian contemporary realism, anti-corporate, editorial resistance.

FORBIDDEN: 3D renders, glossy surfaces, warm saturated colors, ANY TEXT.
`;

const PORTRAITS = [
  {
    id: 'tayna-studio-brutalist',
    prompt: `
${URBAN_BRUTALIST_STYLE}

${TAYNA_DESCRIPTION}

SCENE: Portrait of this exact person seated at minimal dark wooden desk.
Laptop closed to the side. Simple notebook open. Glass of amber liquid.
Looking slightly off-camera with thoughtful expression.
Wearing black bomber jacket over dark shirt, neck tattoo visible.

ENVIRONMENT: Dark industrial studio space, concrete wall behind.
Single harsh light source from left creating dramatic shadows.
Olive green (#8dc75e) geometric bar overlay cutting horizontally through upper third.

FRAMING: Medium shot, slightly off-center composition.
High contrast black and white with green accent only.
Heavy film grain, slight motion blur on edges.

ASPECT RATIO: 16:9 wide cinematic
`
  },
  {
    id: 'tayna-studio-contemplative',
    prompt: `
${URBAN_BRUTALIST_STYLE}

${TAYNA_DESCRIPTION}

SCENE: Close portrait of this exact person in moment of thought.
Hand near chin, contemplative pose. Looking down slightly.
Wearing cream/beige linen shirt, open collar showing neck tattoo.
Clear glasses catching light.

ENVIRONMENT: Minimal brutalist interior, out of focus concrete.
Soft window light from one side, deep shadows on other.
Olive green (#8dc75e) rectangular block in corner of frame.

FRAMING: Tight medium close-up, face and upper body.
Black and white with green accent.
Visible film grain, intimate but professional.

ASPECT RATIO: 3:4 portrait orientation
`
  },
  {
    id: 'tayna-studio-working',
    prompt: `
${URBAN_BRUTALIST_STYLE}

${TAYNA_DESCRIPTION}

SCENE: This exact person working at desk, hands visible on notebook.
Writing or sketching. Concentration visible.
Wearing dark clothing, tattoos on forearms visible.
Laptop and small objects on wooden desk surface.

ENVIRONMENT: Dark moody workspace, industrial aesthetic.
Overhead practical light creating pool of illumination.
Olive green (#8dc75e) UI-like bars framing the composition.

FRAMING: Overhead angle or 45-degree view of workspace.
Subject and hands in focus, edges soft.
Black and white base with green geometric overlays.

ASPECT RATIO: 16:9 wide
`
  }
];

async function generateImage(spec) {
  console.log(`\nGenerating: ${spec.id}`);

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

        const outputDir = path.join(__dirname, '..', 'public', 'tayna-portraits');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${spec.id}.${ext}`);
        fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));

        console.log(`✓ Saved: ${spec.id}.${ext}`);
        return { success: true, path: outputPath };
      }
    }

    console.log('✗ No image generated');
    return { success: false };

  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    return { success: false };
  }
}

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  TAYNÃ PURI PORTRAIT GENERATOR                            ║
║  Urban Brutalist Style + Exact Likeness                   ║
╚═══════════════════════════════════════════════════════════╝
`);

  for (const spec of PORTRAITS) {
    await generateImage(spec);
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n→ Images saved to: public/tayna-portraits/');
}

main().catch(console.error);
