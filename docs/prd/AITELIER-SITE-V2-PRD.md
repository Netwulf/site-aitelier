# PRD: AI.TELIER Site v2.0 — Complete Repositioning

**Document ID:** AITELIER-PRD-2024-002
**Version:** 2.0
**Status:** Ready for Development
**Created:** 2025-12-28
**Author:** Morgan (PM Agent)
**Stakeholder:** Taynã Puri (Founder)

---

## 1. Overview

### 1.1 Problem Statement

The current AI.TELIER site positions the brand as a "creative studio with soul" — competing in the crowded agency/studio market. This positioning fails to communicate the unique value proposition and invites comparison with traditional agencies.

**Current Issues:**
- Agency/studio language invites commodity comparison
- Timeline/price promises ("3 weeks", "R$200k") commoditize the offering
- Lack of clear philosophical foundation
- No differentiation from personal branding agencies
- Missing educational/field component

### 1.2 Proposed Solution

Complete repositioning as **a foundational field for language, form, and work in the AI era** — inspired by Bauhaus principles without explicitly naming them.

**New Positioning:**
- Field, not agency
- Reveals, not builds
- Forms, not teaches
- Philosophy: "Futuro Ancestral"

### 1.3 Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Avg. time on site | ~45s | 3+ min | 30 days |
| Scroll depth | ~40% | 80%+ | 30 days |
| Contact form submissions | baseline | +50% | 60 days |
| Brand perception | "agency" | "field/movement" | 90 days |

---

## 2. Strategic Foundation

### 2.1 Core Philosophy

**Futuro Ancestral (Ancestral Future)**
> Technology that serves humans so naturally it seems to have always existed. Like fire. Like writing. Like language.

### 2.2 Positioning Statement

```
AI.TELIER é um campo para quem cria na era da inteligência artificial.

Não somos agência. Não somos escola.
Somos onde arte, tecnologia e identidade se reorganizam.

O futuro é ancestral.
```

### 2.3 Target Audience

**Primary:**
- Founders building personal brands
- Creators seeking differentiation
- Professionals transitioning careers

**Psychographic:**
- Feel misfit in traditional agency/course market
- Value depth over speed
- Seek meaning, not just aesthetics
- Ready for transformation, not just service

**Exclusions:**
- Those seeking quick fixes
- Price-sensitive buyers
- Those wanting "personal branding"

---

## 3. Information Architecture

### 3.1 Site Structure

```
/                    → Home (The Field Entry)
/campo               → O Campo (Manifesto + Philosophy + Counselors)
/estudos             → Estudos (Formation)
/studio              → Studio (Application)
/archive             → Archive (Culture)
/contato             → Contact (Entry Points)
```

### 3.2 Navigation

```
┌─────────────────────────────────────────────────────────┐
│  AI.TELIER          O Campo  Estudos  Studio  Archive   │
└─────────────────────────────────────────────────────────┘
```

Minimal. No dropdown menus. Clean typography.

---

## 4. Page Requirements

### 4.1 HOME (`/`)

**Purpose:** Create immediate atmosphere. Establish field, not agency.

**Sections:**

| # | Section | Content | Priority |
|---|---------|---------|----------|
| 1 | Hero | Single impactful phrase + minimal scroll indicator | P0 |
| 2 | Rupture | Context of current moment (4-5 lines) | P0 |
| 3 | Triptych | Estudos / Studio / Archive cards | P0 |
| 4 | Futuro Ancestral | Philosophy block with visual | P0 |
| 5 | Visual Archive | Image grid preview (6-9 images) | P1 |
| 6 | Entry | Selective CTA | P0 |

**Hero Options (test):**

```
A: "O futuro é ancestral."

B: "A técnica virou commodity.
    O invisível virou o centro."

C: "Um campo para quem cria
    na era da inteligência artificial."
```

**Technical Requirements:**
- No above-fold CTA
- Scroll-triggered reveals (subtle)
- Cinematic image treatment
- Section numbers visible (01, 02, 03...)

---

### 4.2 O CAMPO (`/campo`)

**Purpose:** Establish identity, philosophy, and unique feature (Counselors).

**Sections:**

| # | Section | Content | Priority |
|---|---------|---------|----------|
| 1 | Manifesto | Who we are (full text) | P0 |
| 2 | Futuro Ancestral | Philosophy deep dive | P0 |
| 3 | Os Conselheiros | Cognitive clones feature | P1 |

**Os Conselheiros Feature:**

```yaml
feature_name: "Os Conselheiros"
description: |
  Cognitive clones of great thinkers available for dialogue.
  Not chatbots - cognitive systems extracted from real works.

minds_featured:
  - steve_jobs: "Design, simplicity, 'insanely great'"
  - walt_disney: "Storytelling, worlds, experience"
  - leonardo_da_vinci: "Art-science, observation, synthesis"
  - kapil_gupta: "Truth, anti-prescriptions, sincerity"
  - seth_godin: "Remarkability, tribe, generosity"
  - count: "40+ available"

ux_concept:
  - Grid of mind cards
  - Click to see profile
  - CTA: "Conversar" (Talk) or "Em breve" (Coming soon)

integration:
  - Links to MMOS minds system
  - Future: Direct chat interface
```

---

### 4.3 ESTUDOS (`/estudos`)

**Purpose:** Present formation offerings. Position as "film school without cameras."

**Sections:**

| # | Section | Content | Priority |
|---|---------|---------|----------|
| 1 | Opening | "Escola de cinema sem câmeras" concept | P0 |
| 2 | Fundamentos | The Vorkurs - 5 foundations | P0 |
| 3 | Laboratórios | Thematic labs (4-6) | P1 |
| 4 | Residências | Intensive periods concept | P2 |

**Fundamentos (Vorkurs):**

```
01. OBSERVAÇÃO
    Ver o que está ali, não o que você quer ver

02. LINGUAGEM
    Encontrar palavras que são suas

03. FORMA
    Dar corpo ao que era só sensação

04. RITMO
    Entender tempo como material

05. SÍNTESE
    Comprimir até restar só o essencial
```

**Laboratórios:**

```
→ ARQUEOLOGIA DE HISTÓRIA
→ DIREÇÃO DE SI
→ ESTÉTICA PESSOAL
→ IA COMO EXTENSÃO
→ PRESENÇA PÚBLICA
```

---

### 4.4 STUDIO (`/studio`)

**Purpose:** Present application work. Position as "where field meets world."

**Sections:**

| # | Section | Content | Priority |
|---|---------|---------|----------|
| 1 | Opening | "Onde o campo encontra o mundo" | P0 |
| 2 | O Processo | 3 movements (no timeline/price) | P0 |
| 3 | Projetos | Visual grid of past work | P1 |
| 4 | Entrar | Qualification + conversation start | P0 |

**O Processo:**

```
01. ARQUEOLOGIA
    Escavamos. Quem você é. O que você defende.
    → Saída: Identidade Narrativa, Posicionamento, Manifesto

02. DIREÇÃO
    Damos forma ao invisível.
    → Saída: Presença Cinematográfica

03. ATIVAÇÃO
    Estruturamos a comunicação.
    → Saída: Sistema de Presença
```

**What NOT to include:**
- ❌ Timeline ("3 weeks")
- ❌ Price ("R$200k")
- ❌ Result promises
- ❌ Comparison with agencies

**Qualification Copy:**

```
Não trabalhamos com qualquer projeto.

Trabalhamos com quem:
→ Entende que marca não é logo
→ Quer revelar, não inventar
→ Valoriza processo tanto quanto resultado
→ Está pronto para ser dirigido

Se isso ressoa, vamos conversar.
```

---

### 4.5 ARCHIVE (`/archive`)

**Purpose:** Show cultural output. Prove method through artifacts.

**Sections:**

| # | Section | Content | Priority |
|---|---------|---------|----------|
| 1 | Journal | Essays (blog format) | P1 |
| 2 | Visual Archive | Dense image grid | P0 |
| 3 | Obras | Authorial projects | P2 |

**Visual Archive:**

```yaml
content:
  - Storyboards
  - Rotoscopy frames
  - Street photography
  - Film frames
  - Human gestures
  - Previous works (Guarani, dance)
  - Creation processes
  - AI screenshots
  - Sketches
  - References

treatment:
  - No captions
  - No explanations
  - Pure visual immersion
  - Masonry or justified grid
  - Cinematic treatment (grain, contrast)
```

---

### 4.6 CONTACT (`/contato`)

**Purpose:** Multiple entry points based on intent.

**Entry Doors:**

```
ESTUDOS
Quero aprender a linguagem
[Entrar na lista de espera]

STUDIO
Quero trabalhar com vocês
[Iniciar conversa]

CONSELHEIROS
Quero acessar as mentes
[Conhecer os conselheiros]

APENAS ACOMPANHAR
Quero receber os ensaios
[Entrar para a newsletter]
```

---

## 5. Visual Design System

### 5.1 Design Principles

```yaml
principle_1: "Brutalism with soul"
  - Exposed structure
  - Honest materials
  - Function over decoration

principle_2: "Tech Ancestral aesthetic"
  - Modern technology
  - Ancient feeling
  - Natural integration

principle_3: "Cinematic treatment"
  - Film ratios (2.35:1, 16:9)
  - Grain texture
  - High contrast
```

### 5.2 Color System

```css
:root {
  /* Primary */
  --brutal-black: #0a0a0a;
  --brutal-white: #f5f5f0;

  /* Accent (Ancestral warmth) */
  --ancestral-terracotta: #c45a3b;
  --ancestral-amber: #d4a853;

  /* Neutral */
  --stone-dark: #1a1a1a;
  --stone-mid: #2a2a2a;
  --stone-light: #e5e5e0;

  /* Text */
  --text-primary: #f5f5f0;
  --text-secondary: #a0a0a0;
  --text-muted: #666666;
}
```

### 5.3 Typography

```css
/* Titles - Heavy, Brutalist */
--font-display: 'Space Grotesk', 'Archivo Black', sans-serif;

/* Body - Humanist, Readable */
--font-body: 'Inter', 'Source Sans Pro', sans-serif;

/* Mono - Technical, Ancestral */
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;

/* Scale */
--text-hero: clamp(3rem, 8vw, 8rem);
--text-h1: clamp(2rem, 5vw, 4rem);
--text-h2: clamp(1.5rem, 3vw, 2.5rem);
--text-body: 1rem;
--text-small: 0.875rem;
```

### 5.4 Grid & Layout

```yaml
grid:
  type: "CSS Grid with intentional breaks"
  columns: 12
  gutter: "clamp(1rem, 3vw, 2rem)"
  max_width: "1400px"

whitespace:
  section_gap: "clamp(4rem, 10vh, 8rem)"
  element_gap: "clamp(1rem, 3vh, 2rem)"

asymmetry:
  - Intentional off-center elements
  - Broken alignments with purpose
  - Section numbers in margins
```

### 5.5 Motion

```yaml
principles:
  - Subtle over flashy
  - Purposeful over decorative
  - Slow over fast

scroll_reveals:
  type: "Fade + slight translate"
  duration: "0.6s"
  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)"

transitions:
  page: "Fade, 0.4s"
  hover: "0.2s ease"

parallax:
  - Very subtle (0.1-0.2 factor)
  - Only on images
  - Disabled on mobile
```

---

## 6. Technical Requirements

### 6.1 Stack (Current)

```yaml
framework: "React 18 + TypeScript"
bundler: "Vite"
styling: "Tailwind CSS"
ui_components: "shadcn/ui"
routing: "React Router v6"
state: "TanStack Query"
animations: "Framer Motion (to add/enhance)"
```

### 6.2 New Components Needed

| Component | Purpose | Priority |
|-----------|---------|----------|
| `HeroV2` | New minimal hero | P0 |
| `Triptych` | 3-pillar cards | P0 |
| `PhilosophyBlock` | Futuro Ancestral section | P0 |
| `CounselorCard` | Mind display card | P1 |
| `CounselorsGrid` | Minds grid layout | P1 |
| `ProcessTimeline` | Studio process (vertical) | P0 |
| `VisualArchiveGrid` | Masonry image grid | P1 |
| `EntryDoors` | Multi-CTA contact | P0 |
| `SectionNumber` | Margin section numbers | P1 |
| `FundamentosAccordion` | Vorkurs display | P1 |
| `LabCard` | Laboratory cards | P2 |

### 6.3 Pages to Modify

| Page | Changes | Priority |
|------|---------|----------|
| `Index.tsx` | Complete rebuild | P0 |
| `Studio.tsx` | Remove pricing, new copy | P0 |
| `Manifesto.tsx` | Merge into `/campo` | P0 |
| `Journal.tsx` | Move to `/archive` | P1 |
| `Contact.tsx` | Multi-door approach | P0 |

### 6.4 New Pages

| Page | Route | Priority |
|------|-------|----------|
| `Campo.tsx` | `/campo` | P0 |
| `Estudos.tsx` | `/estudos` | P1 |
| `Archive.tsx` | `/archive` | P1 |

### 6.5 Performance Requirements

```yaml
lighthouse_targets:
  performance: ">90"
  accessibility: ">95"
  best_practices: ">90"
  seo: ">95"

core_web_vitals:
  LCP: "<2.5s"
  FID: "<100ms"
  CLS: "<0.1"

image_optimization:
  format: "WebP with AVIF fallback"
  lazy_loading: true
  srcset: true
```

---

## 7. Content Requirements

### 7.1 Copy to Write

| Section | Word Count | Status |
|---------|------------|--------|
| Hero variants (3) | ~20 each | ✅ Draft |
| Rupture block | ~50 | ✅ Draft |
| Manifesto | ~150 | ✅ Draft |
| Futuro Ancestral | ~200 | ✅ Draft |
| Fundamentos (5) | ~30 each | ✅ Draft |
| Labs (5) | ~20 each | Needed |
| Studio Process | ~100 | ✅ Draft |
| Entry/Contact | ~50 | ✅ Draft |

### 7.2 Images Needed

| Type | Count | Source |
|------|-------|--------|
| Hero background | 1-3 | Generate/Source |
| Visual Archive | 20-30 | Existing + new |
| Counselor avatars | 6+ | Generate |
| Process illustrations | 3 | Generate |
| Breathers | 3-5 | Existing |

### 7.3 Video (Future)

```yaml
brand_film:
  duration: "60-90s"
  style: "Contemplative, cinematic"
  content: "Futuro Ancestral concept"
  priority: P2 (post-launch)
```

---

## 8. Implementation Plan

### 8.1 Epics

```
Epic 1: Foundation & Home [P0]
  - Design system updates
  - New Home page
  - Core components

Epic 2: O Campo [P0]
  - Manifesto page
  - Philosophy section
  - Counselors feature (basic)

Epic 3: Studio Revision [P0]
  - New copy integration
  - Process section
  - Entry form

Epic 4: Estudos [P1]
  - New page creation
  - Fundamentos section
  - Labs section

Epic 5: Archive [P1]
  - Visual Archive grid
  - Journal integration
  - Works section

Epic 6: Polish & Launch [P1]
  - Animations
  - Performance
  - SEO
  - Testing
```

### 8.2 Estimated Effort

| Epic | Complexity | Est. Time |
|------|------------|-----------|
| Epic 1 | High | 2-3 days |
| Epic 2 | Medium | 1-2 days |
| Epic 3 | Medium | 1 day |
| Epic 4 | Medium | 1-2 days |
| Epic 5 | Medium | 1-2 days |
| Epic 6 | Medium | 1-2 days |

**Total:** 7-12 days development

---

## 9. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Copy doesn't resonate | High | Medium | A/B test hero variants |
| Too abstract for audience | High | Medium | Balance philosophy with concrete offerings |
| Counselors feature complexity | Medium | High | Launch basic version first |
| Performance regression | Medium | Low | Lighthouse CI checks |
| SEO impact from restructure | Medium | Medium | Proper redirects, meta tags |

---

## 10. Success Criteria

### 10.1 Launch Criteria

- [ ] All P0 sections implemented
- [ ] Lighthouse scores meet targets
- [ ] Mobile responsive verified
- [ ] Copy reviewed and approved
- [ ] Analytics implemented
- [ ] Contact forms functional

### 10.2 Post-Launch Metrics (30 days)

- [ ] Time on site > 2 min average
- [ ] Scroll depth > 70%
- [ ] Contact form submissions +25%
- [ ] Bounce rate < 50%

### 10.3 Qualitative Success

- [ ] Brand perception shifts from "agency" to "field"
- [ ] Organic referrals mention philosophy
- [ ] Qualified leads increase (right fit)

---

## 11. Appendices

### A. Reference Sites

```
Bauhaus-inspired:
- haus.ch
- bauhaus-dessau.de

Brutalist web:
- brutalist-web.design

Cinematic brands:
- a24films.com
- sacaistore.com

Philosophical tech:
- stripe.com/press
- linear.app
```

### B. Source Documents

- Strategy Document: `docs/strategy/AITELIER-V2-STRATEGY.md`
- Council of Minds Analysis: (embedded in strategy)
- Current Copy Bank: (conversation history)
- Minds System: `/outputs/minds/`

### C. Stakeholder Sign-off

| Role | Name | Date | Status |
|------|------|------|--------|
| Founder | Taynã Puri | 2025-12-28 | Pending |
| PM | Morgan (Agent) | 2025-12-28 | ✅ |

---

**Document prepared by:** Morgan (PM Agent)
**Review cycle:** Single pass
**Next action:** Epic breakdown and story creation

---

*"O futuro é ancestral."*
