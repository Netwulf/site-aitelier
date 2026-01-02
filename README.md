# AI.TELIER - Site Institucional

> Escola de arte para a era da IA.

---

## URLs

| Ambiente | URL |
|----------|-----|
| **Produção** | https://aitelier-site.vercel.app |
| **Vercel Dashboard** | https://vercel.com/tays-projects-cdc23402/ai.telier-site |

---

## Deploy

O site está hospedado no **Vercel** com deploy automático.

### Deploy Manual

```bash
# Deploy para produção
npx vercel --prod

# Deploy preview
npx vercel
```

### Configuração Vercel

- **Project ID:** `prj_gGhBrAyt5ZYhltv46JsHYeu4UCTW`
- **Org ID:** `team_ce4qwjOxEqQCG84tJMLSFbUN`
- **Framework:** Vite

---

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Build
npm run build

# Preview do build
npm run preview
```

---

## Estrutura do Site

```
/                → Home (IndexV3)
/escola          → Escola (Estudos) - One Person Studio + Cursos
/studio          → Studio (StudioV2)
/playground      → Playground/Galeria (Archive)
/contato         → Contato (ContactV2)
```

---

## Geração de Imagens (Gemini API)

### API Keys

Configuradas no `.env`:

```env
GEMINI_API_KEY=AIzaSyA7Cc3Y3die70hZUmavfQdJ7pAQLvh1Z5A
GEMINI_API_KEY_BACKUP=AIzaSyCymMwx2gKfuc2gUnt2KbB6WTRlxgTCwRw
```

### Script de Geração

```bash
# Gerar imagens de cursos
node scripts/generate-course-images.js
```

O script usa o modelo **Gemini 2.0 Flash** para gerar imagens no estilo brutalista tech do ai.telier.

### Prompts

Todos os prompts estão documentados em:

```
public/courses/PROMPTS_CARTAZES.md
```

### Estilo Visual das Imagens

- **Aspect Ratio:** 3:4 (portrait/poster)
- **Cores:** Preto e branco com overlay neon-verde (#00FF88)
- **Estética:** Brutalista, anti-polished, anti-corporate
- **Elementos:** Grain, scanlines, glitches, moldura preta
- **Tipografia:** Monospace massiva (25-35% da altura)

---

## Banco de Dados

**Supabase** para:
- Lista de espera de cursos (`course_waitlist`)
- Leads de contato

Configuração no `.env`:

```env
VITE_SUPABASE_URL=https://sqsxrevfwqsfkorohfks.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

---

## Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/IndexV3.tsx` | Home principal |
| `src/pages/Estudos.tsx` | Página da Escola |
| `src/components/HeroV2.tsx` | Hero da home |
| `src/components/OnePersonStudioSection.tsx` | Seção One Person Studio |
| `src/components/CoursesNetflixGallery.tsx` | Galeria de cursos por categoria |
| `public/courses/` | Imagens dos cursos |
| `public/courses/PROMPTS_CARTAZES.md` | Prompts para gerar imagens |
| `.brand/` | Direção de arte e prompts visuais |
| `SITE-ARCHITECTURE.md` | Arquitetura e configuração do site |
| `docs/REPOSICIONAMENTO-V4.md` | Estratégia de posicionamento |

---

## Tecnologias

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Database:** Supabase
- **Deploy:** Vercel
- **Image Generation:** Google Gemini API

---

## Brand Guidelines

### Cores

```css
--void-black: #0a0a0a;
--warm-ivory: #f5f5f0;
--tech-olive: #8dc75e;
--matrix-green: #00FF88;
```

### Tipografia

- **Display:** Space Grotesk
- **Body:** Inter
- **Mono:** JetBrains Mono

### Tom de Voz

- Filosófico na Home
- Direto no Studio
- Prático na Escola
- Experimental no Playground

---

## Contato

- **Email:** taypuri@aitelier.com.br
- **Instagram:** @taypuri

---

*AI.TELIER — Escola de Arte para a Era da IA*
