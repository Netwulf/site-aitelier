#!/usr/bin/env node
/**
 * AI.TELIER Course Posters Generation Script
 * Uses Google Gemini Imagen API to generate course poster images
 * 12 posters with brutalist black & white + neon-green overlay style
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

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'courses');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Course poster configurations
const COURSE_POSTERS = [
  {
    name: 'zero-one',
    filename: 'zero-one.png',
    prompt: `Dramatic portrait, cinematic close-up, 3/4 angle. Harsh side lighting creating deep shadow and aggressive contrast. Abstract urban-brutalist background blurred: concrete, tunnel shadows, liminal atmospheres. Fragmented geometric elements floating behind — broken triangles, incomplete circles, digital narrative symbols dissolving. Energy of genesis, creation from void, first spark.

Black and white brutalist portrait, cold desaturated tones, harsh rim light, deep blacks, strong negative space. Heavy grain, dust, film imperfections. Background slightly blurred.

Apply illustrated neon-green overlay on face: thin lines tracing jaw, cheekbones, eyebrows, nose, eyes, neck. Cyber-ancestral ritual. Geometric precision: horizontal neon-green bars (flat, no gradient), geometric wireframes neon-green (sacred geometry meets OS UI), micro-glitches, scanlines, pixel debris (very subtle).

Add thick black frame around image.

MASSIVE neon-green monospaced typography, occupying 25% to 35% of total cover height. Bold weight, uppercase, dominant presence.
Title: ZERO→ONE
Subtitle below: MATÉRIA E FORMA
Footer in black frame: AI.TELIER // FUNDAÇÃO

Mood: genesis, creation, first principles, void to form. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'storycraft',
    filename: 'storycraft.png',
    prompt: `Dramatic portrait, intense frontal gaze, storyteller energy. Harsh lighting creating tension between light and shadow. Background: abstract narrative elements — story arcs as neon lines, character silhouettes fragmenting, plot structures as geometric grids. Floating text fragments dissolving. Energy of someone about to reveal a truth that breaks structures.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks, strong negative space. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: narrative arc lines flowing around face, story structure wireframes, micro-glitches, scanlines.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: STORYCRAFT
Subtitle: NARRATIVA COMO ARMA
Footer: AI.TELIER // STORYTELLING

Mood: manifesto, narrative power, storytelling as weapon. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'soundscape',
    filename: 'soundscape.png',
    prompt: `Portrait with sound wave aesthetics, side profile, eyes closed in musical trance. Abstract background: soundwaves as neon-green frequencies, audio waveforms fragmenting, equalizer bars dissolving. Floating musical notation as geometric debris. Energy of deep listening, sonic meditation.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: sound wave patterns flowing across face, frequency lines, audio spectrum bars, micro-glitches as audio artifacts.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: SOUNDSCAPE
Subtitle: MÚSICA & TRILHA COM IA
Footer: AI.TELIER // ÁUDIO

Mood: sonic immersion, invisible narrative, sound as emotion. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'vibe-code',
    filename: 'vibe-code.png',
    prompt: `Portrait of creator-coder, 3/4 angle, intense focus. Abstract background: code fragments floating, terminal windows dissolving, algorithmic patterns as sacred geometry. Matrix-style code rain but brutalist. Energy of creation through logic, art through systems.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: code syntax lines flowing around face, terminal UI elements, cursor blinks, binary patterns, pixel grid debris, micro-glitches, scanlines.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: VIBE.CODE
Subtitle: PROGRAMAÇÃO CRIATIVA
Footer: AI.TELIER // CODE

Mood: creative coding, art as algorithm, tools that create tools. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'cinema-sem-cameras',
    filename: 'cinema-sem-cameras.png',
    prompt: `Dramatic portrait, director's gaze, commanding presence. Background: film frames fragmenting, camera lens elements dissolving, cinematic aspect ratio bars floating. No physical camera — only vision. Energy of pure direction, filmmaking from imagination.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film texture, 35mm imperfections.

Apply illustrated neon-green overlay: film frame borders around face, viewfinder UI elements, aspect ratio lines, focus marks, micro-glitches as film scratches.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: CINEMA SEM CÂMERAS
Subtitle: FILME 100% IA
Footer: AI.TELIER // CINEMA

Mood: pure direction, vision without equipment, AI as camera. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'retrato-arquetipico',
    filename: 'retrato-arquetipico.png',
    prompt: `Meta-portrait — portrait of someone creating a portrait. Intense gaze, archetypal presence. Background: photography studio elements dissolving, light setups fragmenting, symbolic masks floating. Energy of capturing essence, not just image.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: photography composition guides, light direction indicators, archetypal symbol fragments, micro-glitches.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: RETRATO ARQUETÍPICO
Subtitle: FOTOGRAFIA & IDENTIDADE
Footer: AI.TELIER // FOTO

Mood: symbolic capture, essence photography, archetype revelation. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'digital-presence',
    filename: 'digital-presence.png',
    prompt: `Portrait with digital presence energy, frontal, confident. Background: website wireframes dissolving, UI elements floating, presentation slides fragmenting. Browser windows as geometric shapes. Energy of digital territory, online existence.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: website grid lines, UI navigation elements, cursor arrows, click indicators, micro-glitches, pixel debris.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: PRESENÇA DIGITAL
Subtitle: SITES & APRESENTAÇÕES
Footer: AI.TELIER // WEB

Mood: digital territory, online as stage, web as narrative. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'motion-lab',
    filename: 'motion-lab.png',
    prompt: `Portrait with movement energy, slight motion blur on edges, dynamic pose. Background: animation keyframes floating, motion paths as neon arcs, timeline elements dissolving. Frame-by-frame sequences fragmenting. Energy of bringing stillness to life.

Black and white brutalist portrait with subtle motion blur, cold tones, harsh rim light. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: motion path curves, keyframe markers, animation timeline elements, micro-glitches as frame drops.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: MOTION LAB
Subtitle: ANIMAÇÃO COM IA
Footer: AI.TELIER // ANIMAÇÃO

Mood: life from stillness, movement as meaning, animation magic. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'doc-real',
    filename: 'doc-real.png',
    prompt: `Portrait with documentary gaze — observing, recording, witnessing. Contemplative eyes. Background: interview setups dissolving, B-roll fragments floating, real footage frames as geometric debris. Raw footage aesthetic. Energy of truth-seeking, reality capture.

Black and white brutalist portrait, raw documentary feel, cold tones, harsh natural light. Heavy grain, authentic film imperfections, handheld texture.

Apply illustrated neon-green overlay: interview framing guides, timecode displays, audio level meters, micro-glitches.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: DOC.REAL
Subtitle: DOCUMENTÁRIO CONTEMPORÂNEO
Footer: AI.TELIER // DOC

Mood: truth witness, reality as narrative, documentary as weapon. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'ai-artist',
    filename: 'ai-artist.png',
    prompt: `Portrait with master artist energy, commanding presence, renaissance meets cyber. Background: all disciplines converging — film frames, sound waves, code, photography, animation — all as neon geometric patterns dissolving. Energy of complete formation, total artist.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: multiple discipline symbols converging, sacred geometry patterns, mastery indicators, micro-glitches, scanlines.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: AI ARTIST
Subtitle: FORMAÇÃO COMPLETA
Footer: AI.TELIER // FORMAÇÃO

Mood: mastery, complete artist, renaissance AI creator. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'post-vision',
    filename: 'post-vision.png',
    prompt: `Portrait with editor's focused intensity, eyes analyzing. Background: editing timeline dissolving, color wheels fragmenting, VFX layers separating, compositing nodes floating. Post-production chaos becoming order. Energy of transformation in post.

Black and white brutalist portrait, cold tones, harsh rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: editing timeline bars, color grading wheels, layer stack indicators, compositing node connections, micro-glitches.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: POST.VISION
Subtitle: EDIÇÃO & VFX COM IA
Footer: AI.TELIER // PÓS

Mood: transformation, post-magic, raw to refined. Aspect ratio 3:4 portrait poster.`
  },
  {
    name: 'artists-journey',
    filename: 'artists-journey.png',
    prompt: `Portrait with introspective artist energy, vulnerability and strength. Background: abstract creative journey — paths splitting and converging, doors opening, symbolic obstacles dissolving. Inner landscape externalized. Energy of creative awakening, fear to expression.

Black and white brutalist portrait, cold tones, softer rim light, deep blacks. Heavy grain, film imperfections.

Apply illustrated neon-green overlay: journey path lines, door/threshold symbols, inner landscape wireframes, micro-glitches as creative blocks dissolving.

Thick black frame.

MASSIVE neon-green monospaced typography.
Title: JORNADA DO ARTISTA
Subtitle: CRIATIVIDADE COMO CAMINHO
Footer: AI.TELIER // PROCESSO

Mood: creative awakening, inner journey, fear to expression. Aspect ratio 3:4 portrait poster.`
  }
];

function getNextApiKey() {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
}

async function generateImage(config) {
  const apiKey = getNextApiKey();

  console.log(`\n🎬 Generating: ${config.name}`);
  console.log(`   Prompt preview: ${config.prompt.substring(0, 100)}...`);

  const requestBody = JSON.stringify({
    contents: [{
      parts: [{
        text: `Generate a movie poster style image: ${config.prompt}`
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

          console.log(`   ⚠️  No image in response. API may have returned text only.`);
          if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.log(`   Text response: ${response.candidates[0].content.parts[0].text.substring(0, 200)}...`);
          }
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
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('   AI.TELIER Course Poster Generation');
  console.log('   Style: Brutalist Black & White + Neon-Green Overlay');
  console.log('   12 Course Posters');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🔑 API Keys available: ${API_KEYS.length}`);
  console.log(`📦 Posters to generate: ${COURSE_POSTERS.length}`);

  const results = [];

  for (const config of COURSE_POSTERS) {
    try {
      const outputPath = await generateImage(config);
      results.push({ name: config.name, status: 'success', path: outputPath });
      // Delay between requests to avoid rate limiting
      console.log('   ⏳ Waiting 3s before next request...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      results.push({ name: config.name, status: 'failed', error: error.message });
      // Also wait on failure to not hammer the API
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('   Generation Summary');
  console.log('═══════════════════════════════════════════════════════════════');

  for (const result of results) {
    const icon = result.status === 'success' ? '✅' : '❌';
    console.log(`${icon} ${result.name}: ${result.status}`);
    if (result.path) console.log(`   → ${result.path}`);
    if (result.error) console.log(`   → Error: ${result.error}`);
  }

  const successCount = results.filter(r => r.status === 'success').length;
  console.log(`\n📊 Total: ${successCount}/${results.length} posters generated`);

  if (successCount < results.length) {
    console.log('\n💡 Tip: Failed images can be regenerated by running the script again.');
    console.log('   The script will skip already existing files if you add that logic.');
  }
}

main().catch(console.error);
