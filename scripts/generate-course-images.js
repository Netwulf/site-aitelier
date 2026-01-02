/**
 * Script para gerar imagens de cursos usando Gemini API
 * Usa o modelo gemini-2.0-flash-exp com geração de imagens
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Keys
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyA7Cc3Y3die70hZUmavfQdJ7pAQLvh1Z5A";
const API_KEY_BACKUP = process.env.GEMINI_API_KEY_BACKUP || "AIzaSyCymMwx2gKfuc2gUnt2KbB6WTRlxgTCwRw";

// Output directory
const OUTPUT_DIR = path.join(__dirname, "../public/courses");

// Course prompts - One Person Studio courses
const coursePrompts = [
  {
    id: "solo-biz",
    filename: "solo-biz.png",
    prompt: `Create a dramatic portrait poster image. Aspect ratio 3:4 (portrait).

SCENE:
Portrait with solo entrepreneur energy, confident and self-sufficient. One person, entire studio presence. Background: business elements dissolving — organizational charts fragmenting into single node, multiple roles merging into one figure, systems flowing autonomously. Energy of complete independence, one-person empire.

STYLE:
Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green (#00FF88) overlay on the portrait:
– single-node network diagram lines
– money/value flow lines
– system automation indicators
– micro-glitches, scanlines

Add thick black frame around image.

TYPOGRAPHY (MASSIVE):
Add MASSIVE neon-green monospaced typography at bottom,
occupying 25% to 35% of total cover height.
Bold weight, uppercase, dominant presence.

Title: SOLO.BIZ
Subtitle below: NEGÓCIO DE UMA PESSOA

Footer in black frame:
AI.TELIER // NEGÓCIOS

Mood: independence, self-sufficiency, solo empire, lean operation.
Make it cinematic, brutalist, anti-corporate aesthetic.`
  },
  {
    id: "produto-zero",
    filename: "produto-zero.png",
    prompt: `Create a dramatic portrait poster image. Aspect ratio 3:4 (portrait).

SCENE:
Portrait with knowledge-to-product transformation energy, hands gesturing creation. Background: abstract knowledge symbols transforming — brain patterns becoming product boxes, ideas crystallizing into tangible shapes, vapor condensing into solid forms. Energy of materialization, knowledge alchemy.

STYLE:
Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green (#00FF88) overlay:
– transformation arrows
– product package wireframes
– knowledge-to-value flow lines
– crystallization patterns
– micro-glitches

Add thick black frame around image.

TYPOGRAPHY (MASSIVE):
Add MASSIVE neon-green monospaced typography at bottom,
occupying 25% to 35% of total cover height.
Bold weight, uppercase, dominant presence.

Title: PRODUTO ZERO
Subtitle below: DO CONHECIMENTO AO PRODUTO

Footer in black frame:
AI.TELIER // NEGÓCIOS

Mood: alchemy, transformation, knowledge materialization, MVP energy.
Make it cinematic, brutalist, anti-corporate aesthetic.`
  },
  {
    id: "narrativa-venda",
    filename: "narrativa-venda.png",
    prompt: `Create a dramatic portrait poster image. Aspect ratio 3:4 (portrait).

SCENE:
Portrait with storyteller-seller energy, persuasive but authentic gaze, not salesy. Background: narrative and commerce merging — story arcs connecting to conversion points, words transforming into value, authentic connection lines. Energy of selling through truth, not tactics.

STYLE:
Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green (#00FF88) overlay:
– story arc flowing into sale point
– authentic connection lines
– conversion funnel as narrative structure
– micro-glitches, scanlines

Add thick black frame around image.

TYPOGRAPHY (MASSIVE):
Add MASSIVE neon-green monospaced typography at bottom,
occupying 25% to 35% of total cover height.
Bold weight, uppercase, dominant presence.

Title: NARRATIVA DE VENDA
Subtitle below: VENDER SEM PERFORMANCE

Footer in black frame:
AI.TELIER // NEGÓCIOS

Mood: authentic selling, storyselling, conversion through connection.
Make it cinematic, brutalist, anti-corporate aesthetic.`
  },
  {
    id: "studio-os",
    filename: "studio-os.png",
    prompt: `Create a dramatic portrait poster image. Aspect ratio 3:4 (portrait).

SCENE:
Portrait with systems architect energy, orchestrating invisible tools. Background: operating system interface dissolving — multiple tool windows converging, workflow pipelines flowing, automation gears meshing silently. One person controlling entire studio infrastructure. Energy of systematic creation, tooling mastery.

STYLE:
Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green (#00FF88) overlay:
– OS window frames
– workflow pipeline connections
– tool integration nodes
– automation gear symbols
– micro-glitches as system processes

Add thick black frame around image.

TYPOGRAPHY (MASSIVE):
Add MASSIVE neon-green monospaced typography at bottom,
occupying 25% to 35% of total cover height.
Bold weight, uppercase, dominant presence.

Title: STUDIO OS
Subtitle below: SISTEMA OPERACIONAL CRIATIVO

Footer in black frame:
AI.TELIER // NEGÓCIOS

Mood: systems mastery, tooling orchestration, infrastructure as art.
Make it cinematic, brutalist, anti-corporate aesthetic.`
  },
  {
    id: "presenca-monetizada",
    filename: "presenca-monetizada.png",
    prompt: `Create a dramatic portrait poster image. Aspect ratio 3:4 (portrait).

SCENE:
Portrait with magnetic presence energy, natural attraction without performance. Background: audience symbols transforming into value — follower icons crystallizing into currency patterns, attention flows converting to revenue streams, organic funnel forming naturally. Energy of monetization without manipulation.

STYLE:
Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green (#00FF88) overlay:
– audience-to-revenue flow lines
– natural funnel structure
– value exchange indicators
– organic growth patterns
– micro-glitches, scanlines

Add thick black frame around image.

TYPOGRAPHY (MASSIVE):
Add MASSIVE neon-green monospaced typography at bottom,
occupying 25% to 35% of total cover height.
Bold weight, uppercase, dominant presence.

Title: PRESENÇA MONETIZADA
Subtitle below: AUDIÊNCIA → RECEITA

Footer in black frame:
AI.TELIER // NEGÓCIOS

Mood: organic monetization, natural conversion, presence as asset.
Make it cinematic, brutalist, anti-corporate aesthetic.`
  }
];

async function generateImage(prompt, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);

  // Using gemini-2.0-flash-exp for image generation
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseModalities: ["image", "text"],
    }
  });

  const response = await model.generateContent(prompt);
  const result = response.response;

  // Extract image from response
  for (const part of result.candidates[0].content.parts) {
    if (part.inlineData) {
      return Buffer.from(part.inlineData.data, "base64");
    }
  }

  throw new Error("No image generated in response");
}

async function saveImage(buffer, filename) {
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Saved: ${filename}`);
  return filepath;
}

async function main() {
  console.log("🎨 Generating course images with Gemini API...\n");

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let currentApiKey = API_KEY;
  let useBackup = false;

  for (const course of coursePrompts) {
    console.log(`\n📷 Generating: ${course.id}...`);

    try {
      const imageBuffer = await generateImage(course.prompt, currentApiKey);
      await saveImage(imageBuffer, course.filename);
    } catch (error) {
      console.log(`⚠️ Error with primary key, trying backup...`);

      if (!useBackup) {
        currentApiKey = API_KEY_BACKUP;
        useBackup = true;

        try {
          const imageBuffer = await generateImage(course.prompt, currentApiKey);
          await saveImage(imageBuffer, course.filename);
        } catch (backupError) {
          console.error(`❌ Failed to generate ${course.id}:`, backupError.message);
        }
      } else {
        console.error(`❌ Failed to generate ${course.id}:`, error.message);
      }
    }

    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log("\n✅ Image generation complete!");
}

main().catch(console.error);
