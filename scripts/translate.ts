/**
 * AI Translation Script for AI.TELIER
 *
 * Translates PT-BR JSON locale files to EN-US using Google Generative AI
 *
 * Usage:
 *   npx tsx scripts/translate.ts           # Translate changed keys only
 *   npx tsx scripts/translate.ts --force   # Force re-translate all
 *   npx tsx scripts/translate.ts --review  # Output to review folder
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const LOCALES_DIR = path.join(process.cwd(), 'src/i18n/locales');
const SOURCE_LANG = 'pt-BR';
const TARGET_LANG = 'en-US';

// Translation prompt for artistic content
const TRANSLATION_PROMPT = `You are translating content for AI.TELIER, an artistic AI studio.

BRAND VOICE:
- Philosophical and poetic
- "Futuro Ancestral" (Ancestral Future) philosophy
- Brutalist aesthetic - exposed, raw, honest
- Invitations, not demands
- Blend of ancient wisdom and future technology

TRANSLATION GUIDELINES:
1. Preserve poetic rhythm and flow
2. Adapt culturally, don't translate literally
3. Keep brand terms in Portuguese: "AI.TELIER", "Campo", "Futuro Ancestral", "Vorkurs"
4. Maintain the mystical-technical tone
5. Short sentences, powerful phrases
6. Avoid corporate/marketing speak

EXAMPLES:
PT: "A arte que ensinamos cria. A arte que criamos ensina."
EN: "The art we teach creates. The art we create teaches."

PT: "O futuro é ancestral."
EN: "The future is ancestral."

PT: "Aqui, não ensinamos a usar ferramentas. Ensinamos a pensar com elas."
EN: "Here, we don't teach how to use tools. We teach how to think with them."

Translate the following JSON from Portuguese to English.
Return ONLY valid JSON, no explanation or markdown.
Preserve the exact JSON structure and keys.`;

interface TranslationOptions {
  force?: boolean;
  review?: boolean;
  namespace?: string;
}

function parseArgs(): TranslationOptions {
  const args = process.argv.slice(2);
  return {
    force: args.includes('--force'),
    review: args.includes('--review'),
    namespace: args.find(a => a.startsWith('--namespace='))?.split('=')[1],
  };
}

function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = String(value);
    }
  }

  return result;
}

function unflattenObject(flat: Record<string, string>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = value;
  }

  return result;
}

function findMissingKeys(
  source: Record<string, any>,
  target: Record<string, any>
): Record<string, string> {
  const flatSource = flattenObject(source);
  const flatTarget = flattenObject(target);
  const missing: Record<string, string> = {};

  for (const [key, value] of Object.entries(flatSource)) {
    if (!(key in flatTarget)) {
      missing[key] = value;
    }
  }

  return missing;
}

function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target };

  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = deepMerge(result[key] || {}, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

async function translateWithAI(
  genAI: GoogleGenerativeAI,
  content: Record<string, string>
): Promise<Record<string, string>> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `${TRANSLATION_PROMPT}

JSON to translate:
${JSON.stringify(content, null, 2)}`;

  console.log(`  → Translating ${Object.keys(content).length} keys...`);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON in AI response');
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid JSON in AI response');
  }
}

async function translateFile(
  filename: string,
  genAI: GoogleGenerativeAI,
  options: TranslationOptions
): Promise<void> {
  const sourcePath = path.join(LOCALES_DIR, SOURCE_LANG, filename);
  const targetDir = options.review
    ? path.join(LOCALES_DIR, 'review')
    : path.join(LOCALES_DIR, TARGET_LANG);
  const targetPath = path.join(targetDir, filename);

  // Check if source exists
  if (!fs.existsSync(sourcePath)) {
    console.log(`  ⚠ Source file not found: ${filename}`);
    return;
  }

  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
  let targetContent: Record<string, any> = {};

  // Load existing translations if not forcing
  if (!options.force && fs.existsSync(targetPath)) {
    targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
  }

  // Find keys needing translation
  const toTranslate = options.force
    ? flattenObject(sourceContent)
    : findMissingKeys(sourceContent, targetContent);

  if (Object.keys(toTranslate).length === 0) {
    console.log(`  ✓ ${filename}: No new translations needed`);
    return;
  }

  console.log(`  → ${filename}: Translating ${Object.keys(toTranslate).length} keys...`);

  // Translate with AI
  const translated = await translateWithAI(genAI, toTranslate);

  // Unflatten and merge
  const unflattened = unflattenObject(translated);
  const merged = options.force ? unflattened : deepMerge(targetContent, unflattened);

  // Ensure directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // Write output
  fs.writeFileSync(targetPath, JSON.stringify(merged, null, 2) + '\n');

  console.log(`  ✓ ${filename}: Done`);
}

async function main() {
  const options = parseArgs();

  console.log('\n🌐 AI.TELIER Translation Pipeline\n');
  console.log(`Mode: ${options.force ? 'Force' : 'Incremental'}${options.review ? ' (Review)' : ''}`);

  // Check for API key
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('\n❌ Error: GOOGLE_GENERATIVE_AI_KEY or GEMINI_API_KEY environment variable required');
    console.log('\nSet it with:');
    console.log('  export GOOGLE_GENERATIVE_AI_KEY=your-api-key');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Get all JSON files from source directory
  const sourceDir = path.join(LOCALES_DIR, SOURCE_LANG);
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.json'));

  if (options.namespace) {
    const targetFile = `${options.namespace}.json`;
    if (files.includes(targetFile)) {
      await translateFile(targetFile, genAI, options);
    } else {
      console.error(`\n❌ Namespace not found: ${options.namespace}`);
      process.exit(1);
    }
  } else {
    console.log(`\nTranslating ${files.length} files...\n`);

    for (const file of files) {
      try {
        await translateFile(file, genAI, options);
      } catch (error) {
        console.error(`  ❌ ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  console.log('\n✅ Translation complete!\n');

  if (options.review) {
    console.log('Review files saved to: src/i18n/locales/review/');
    console.log('After review, move to en-US/ or run without --review\n');
  }
}

main().catch(console.error);
