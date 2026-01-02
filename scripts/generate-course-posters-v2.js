#!/usr/bin/env node
/**
 * AI.TELIER Course Posters Generation Script V2
 * NEW AESTHETIC: Golden + Purple + Symbolic (No faces)
 * Film poster style, ai.telier visual identity
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

// Base style for all posters - ai.telier V2 aesthetic
const BASE_STYLE = `
STYLE REQUIREMENTS:
- Color palette: Deep black background, golden amber highlights, royal purple accents, warm ivory details
- NO human faces - only symbolic, abstract, archetypal imagery
- Cinematic film poster composition with dramatic lighting
- Sacred geometry elements, brutalist typography integration
- Film grain texture, subtle scanlines, analog imperfections
- Heavy use of negative space, asymmetric balance
- Golden ratio composition, rule of thirds
- Typography: Bold monospace, uppercase, massive presence
- Thick black frame border around entire image
- Mood: Ancestral meets futuristic, ritual meets technology
- Aspect ratio 3:4 portrait poster
`;

// Course poster configurations - V2 Symbolic Style
const COURSE_POSTERS = [
  {
    name: 'zero-one',
    filename: 'zero-one.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: The moment of creation - a single golden geometric form emerging from pure darkness. Sacred geometry: the seed of life pattern dissolving into digital fragments. A vertical golden beam splitting the void. Broken triangles and incomplete circles floating. The number "1" formed by light particles.

${BASE_STYLE}

COLORS: Deep void black, brilliant gold, hints of purple in shadows.

TYPOGRAPHY (integrated into design):
- Title: ZERO→ONE (massive, golden, top or center)
- Subtitle: MATÉRIA E FORMA
- Footer: AI.TELIER // FUNDAÇÃO

Mood: Genesis, first light, void becoming form, creation myth.`
  },
  {
    name: 'storycraft',
    filename: 'storycraft.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: A golden narrative arc - a luminous curved line that tells a story through its shape alone. Fragmenting story structure as geometric constellation. Ancient scroll unraveling into digital particles. The hero's journey as a sacred path of light. Floating text fragments dissolving like embers.

${BASE_STYLE}

COLORS: Deep black, warm gold story arc, purple shadows, ivory text fragments.

TYPOGRAPHY (integrated into design):
- Title: STORYCRAFT (massive, commanding)
- Subtitle: NARRATIVA COMO ARMA
- Footer: AI.TELIER // STORYTELLING

Mood: Story as weapon, narrative architecture, the power of structured tales.`
  },
  {
    name: 'soundscape',
    filename: 'soundscape.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: Sound waves as golden light frequencies in the void. Audio waveforms transforming into sacred geometry. An abstract golden horn or vessel emanating vibration patterns. Equalizer bars as ancient temple columns. Musical notation dissolving into stardust.

${BASE_STYLE}

COLORS: Deep black void, golden sound waves, purple resonance, amber frequency lines.

TYPOGRAPHY (integrated into design):
- Title: SOUNDSCAPE (massive)
- Subtitle: MÚSICA & TRILHA COM IA
- Footer: AI.TELIER // ÁUDIO

Mood: Sound as invisible architecture, sonic meditation, hearing the unseen.`
  },
  {
    name: 'vibe-code',
    filename: 'vibe-code.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: Code as golden calligraphy floating in void. Terminal window frames as sacred portals. Binary rain but alchemical - 0s and 1s as golden symbols. An abstract key or tool made of light. Algorithmic patterns forming mandala structures.

${BASE_STYLE}

COLORS: Deep black, golden code characters, purple terminal glow, ivory syntax.

TYPOGRAPHY (integrated into design):
- Title: VIBE.CODE (massive, monospace)
- Subtitle: PROGRAMAÇÃO CRIATIVA
- Footer: AI.TELIER // CODE

Mood: Code as creative magic, programming as art, logic as poetry.`
  },
  {
    name: 'cinema-sem-cameras',
    filename: 'cinema-sem-cameras.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: A golden film strip unspooling into pure light. Cinema frames floating as sacred windows. The director's chair as empty throne - no person, only vision. Aspect ratio bars as ancient columns. A lens flare becoming a sun. Celluloid dissolving into particles.

${BASE_STYLE}

COLORS: Deep black, golden film elements, purple lens flares, warm amber light.

TYPOGRAPHY (integrated into design):
- Title: CINEMA SEM CÂMERAS (massive, cinematic)
- Subtitle: FILME 100% IA
- Footer: AI.TELIER // CINEMA

Mood: Vision without equipment, pure direction, imagination as camera.`
  },
  {
    name: 'retrato-arquetipico',
    filename: 'retrato-arquetipico.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: An empty golden frame - the portrait space waiting to reveal. Mirrors reflecting into infinity but showing only light. Archetypal masks floating but faceless - just golden silhouettes. Light setup as sacred geometry. The essence of identity without showing identity.

${BASE_STYLE}

COLORS: Deep black, golden frame and light, purple mirror reflections, ivory highlights.

TYPOGRAPHY (integrated into design):
- Title: RETRATO ARQUETÍPICO (massive)
- Subtitle: FOTOGRAFIA & IDENTIDADE
- Footer: AI.TELIER // FOTO

Mood: Capturing essence, the symbol behind the face, archetypal revelation.`
  },
  {
    name: 'digital-presence',
    filename: 'digital-presence.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: A golden browser window floating in void - but showing only light, no content. Website wireframes as sacred architectural blueprints. Cursor arrow as golden compass. Domain bar as portal inscription. The internet as infinite dark ocean with golden paths.

${BASE_STYLE}

COLORS: Deep black, golden UI elements, purple hyperlink trails, warm amber glow.

TYPOGRAPHY (integrated into design):
- Title: PRESENÇA DIGITAL (massive)
- Subtitle: SITES & APRESENTAÇÕES
- Footer: AI.TELIER // WEB

Mood: Digital territory, online as sacred space, web as stage.`
  },
  {
    name: 'motion-lab',
    filename: 'motion-lab.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: Motion paths as golden light trails through darkness. Keyframes as glowing waypoints. A static object beginning to move - captured in multiple golden ghost forms. Animation timeline as horizontal light bar. Frame-by-frame sequence as flickering constellation.

${BASE_STYLE}

COLORS: Deep black, golden motion trails, purple afterimages, amber keyframes.

TYPOGRAPHY (integrated into design):
- Title: MOTION LAB (massive)
- Subtitle: ANIMAÇÃO COM IA
- Footer: AI.TELIER // ANIMAÇÃO

Mood: Bringing stillness to life, movement as meaning, animation alchemy.`
  },
  {
    name: 'doc-real',
    filename: 'doc-real.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: A golden eye symbol - all-seeing but abstract, no human eye. Documentary frame as window to truth. Timecode running as sacred numbers. Audio waveform of testimony. The weight of witness as light pressing through darkness.

${BASE_STYLE}

COLORS: Deep black, golden truth-light, purple documentary shadows, raw amber.

TYPOGRAPHY (integrated into design):
- Title: DOC.REAL (massive, raw)
- Subtitle: DOCUMENTÁRIO CONTEMPORÂNEO
- Footer: AI.TELIER // DOC

Mood: Witnessing truth, reality as narrative, documentary as testimony.`
  },
  {
    name: 'ai-artist',
    filename: 'ai-artist.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: All disciplines converging into one golden nexus point. Film, sound, code, photo, motion - all as golden streams flowing into center. The renaissance star - a complex sacred geometry combining all arts. Mastery as unified light. No single symbol dominant - all in harmony.

${BASE_STYLE}

COLORS: Deep black, brilliant gold convergence, purple depth, all warm tones.

TYPOGRAPHY (integrated into design):
- Title: AI ARTIST (massive, regal)
- Subtitle: FORMAÇÃO COMPLETA
- Footer: AI.TELIER // FORMAÇÃO

Mood: Complete mastery, renaissance spirit, the total artist of the AI era.`
  },
  {
    name: 'post-vision',
    filename: 'post-vision.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: Color wheels as golden mandalas. Editing timeline as horizontal light spectrum. VFX layers separating and recombining as floating planes of gold. The transformation: raw footage fragment becoming polished golden gem. Compositing nodes as constellation.

${BASE_STYLE}

COLORS: Deep black, golden grading wheels, purple VFX layers, amber spectrum.

TYPOGRAPHY (integrated into design):
- Title: POST.VISION (massive)
- Subtitle: EDIÇÃO & VFX COM IA
- Footer: AI.TELIER // PÓS

Mood: Raw to refined, post-production alchemy, transformation magic.`
  },
  {
    name: 'artists-journey',
    filename: 'artists-journey.png',
    prompt: `Cinematic movie poster. Abstract symbolic composition.

SCENE: The hero's journey as golden path through darkness. A threshold/door made of light - slightly ajar, revealing golden glow. The labyrinth of creativity as sacred geometry. Obstacles dissolving into light particles. The journey inward as spiral.

${BASE_STYLE}

COLORS: Deep black, golden path and door, purple inner depths, warm threshold light.

TYPOGRAPHY (integrated into design):
- Title: JORNADA DO ARTISTA (massive)
- Subtitle: CRIATIVIDADE COMO CAMINHO
- Footer: AI.TELIER // PROCESSO

Mood: Inner journey, creative awakening, fear transformed into expression.`
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
  console.log('   AI.TELIER Course Poster Generation V2');
  console.log('   NEW STYLE: Golden + Purple + Symbolic (No Faces)');
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
}

main().catch(console.error);
