# AI.TELIER v3.0 — Internationalization Master Epic

**Epic ID:** AITELIER-3.0-I18N
**Created:** 2026-01-02
**Status:** Completed
**Approach:** Hybrid JSON + AI Translation

---

## Overview

Complete internationalization of AI.TELIER site with Portuguese (primary) and English support.

**Strategy:** Hybrid JSON + AI
- Primary content authored in Portuguese
- AI-assisted translation to English
- Bilingual routes (`/pt/...`, `/en/...`)
- Language toggle in UI

**Core Principles:**
- Zero performance impact (JSON files, no runtime fetching)
- Single source of truth (PT-BR as primary)
- Automated translation sync via AI
- Type-safe translations with TypeScript

---

## Architecture Decision

### Selected: Hybrid JSON + AI Translation

```
src/
├── i18n/
│   ├── index.ts           # i18next config
│   ├── LanguageContext.tsx # React context
│   └── locales/
│       ├── pt-BR/
│       │   ├── common.json
│       │   ├── navigation.json
│       │   ├── pages/
│       │   │   ├── home.json
│       │   │   ├── studio.json
│       │   │   └── ...
│       │   └── portfolio.json
│       └── en-US/
│           └── [mirrored structure]
├── scripts/
│   └── translate.ts       # AI translation script
```

### Route Strategy

| Current Route (PT) | English Route | Neutral Path |
|-------------------|---------------|--------------|
| `/` | `/en` | - |
| `/atelier` | `/en/atelier` | Keep PT name (brand) |
| `/escola` | `/en/school` | Different paths |
| `/escola/cinema-sem-cameras` | `/en/school/cinema-without-cameras` | Translated |
| `/studio` | `/en/studio` | Same |
| `/contato` | `/en/contact` | Translated |

**Pattern:** `/pt/*` (default), `/en/*` (English)

---

## Epic Breakdown

| Story | Name | Priority | Est. Effort | Dependencies |
|-------|------|----------|-------------|--------------|
| 3.1 | i18n Foundation Setup | P0 | 3-4h | None |
| 3.2 | Content Extraction & JSON Structure | P0 | 4-6h | 3.1 |
| 3.3 | Bilingual Routes Implementation | P0 | 2-3h | 3.1 |
| 3.4 | Language Toggle UI | P0 | 2-3h | 3.1, 3.3 |
| 3.5 | AI Translation Pipeline | P1 | 3-4h | 3.2 |
| 3.6 | Portfolio Data Translation | P1 | 2-3h | 3.2, 3.5 |
| 3.7 | QA & Polish | P1 | 2-3h | All |

**Total Stories:** 7
**Total Effort:** 18-26 hours (~3-4 days)

---

## Story Index

### Phase 1: Foundation [P0]

#### 3.1 - i18n Foundation Setup
- Install i18next + react-i18next
- Configure language detection
- Setup TypeScript types for translations
- Create LanguageContext provider
- Initial folder structure

#### 3.2 - Content Extraction & JSON Structure
- Extract all hardcoded strings from components
- Create PT-BR JSON files organized by namespace
- Map ~200 translation keys
- Document extraction patterns

#### 3.3 - Bilingual Routes Implementation
- Configure React Router for language prefix
- Create route wrapper component
- Handle language switching via URL
- Preserve route state on language change
- Setup redirects (/ -> /pt/)

#### 3.4 - Language Toggle UI
- Create LanguageToggle component
- Integrate into Navigation
- Persist preference (localStorage)
- Animate transition
- Mobile-friendly design

### Phase 2: Translation [P1]

#### 3.5 - AI Translation Pipeline
- Create translation script with Gemini/GPT
- Configure artistic/poetic tone guidelines
- Setup diff detection (only translate changed keys)
- Add review workflow option
- npm script integration

#### 3.6 - Portfolio Data Translation
- Externalize portfolioData.ts to JSON
- Translate 11 project descriptions
- Handle image alt texts
- Maintain type safety

#### 3.7 - QA & Polish
- Cross-browser testing
- Mobile responsiveness check
- SEO meta tags for both languages
- Performance audit
- Edge cases (mixed content, fallbacks)

---

## Dependencies Graph

```
3.1 Foundation
    ├──> 3.2 Content Extraction
    │       └──> 3.5 AI Translation
    │               └──> 3.6 Portfolio Translation
    ├──> 3.3 Bilingual Routes
    │       └──> 3.4 Language Toggle
    └──────────────────────────────> 3.7 QA & Polish
```

---

## Content Inventory

| Category | Est. Keys | Priority | Namespace |
|----------|-----------|----------|-----------|
| Navigation | 8 | P0 | `navigation` |
| Hero/CTA | 5 | P0 | `home` |
| Footer | 12 | P0 | `common` |
| Contact Form | 15 | P0 | `contact` |
| Manifesto | 25 | P1 | `campo` |
| Rupture Section | 20 | P1 | `home` |
| Portfolio | 50+ | P1 | `portfolio` |
| Studio Page | 30 | P1 | `studio` |
| Estudos Page | 25 | P1 | `estudos` |
| Error/Success Messages | 10 | P0 | `common` |

**Total:** ~200 unique translation keys

---

## Technical Decisions

### i18next Configuration
```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US'],
    defaultNS: 'common',
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },
  });
```

### Route Wrapper Pattern
```typescript
// src/components/LocalizedRoutes.tsx
const LocalizedRoutes = () => {
  const { i18n } = useTranslation();
  const lang = useParams().lang || 'pt';

  useEffect(() => {
    i18n.changeLanguage(lang === 'en' ? 'en-US' : 'pt-BR');
  }, [lang]);

  return <Outlet />;
};
```

### Translation Hook Usage
```typescript
// Component usage
const { t } = useTranslation('home');
return <h1>{t('hero.title')}</h1>;
```

---

## Definition of Done (All Stories)

- [ ] Code implemented and working
- [ ] All text externalized to JSON
- [ ] Both languages functional
- [ ] Routes working for PT and EN
- [ ] Language toggle accessible
- [ ] No hardcoded strings remaining
- [ ] TypeScript types complete
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance maintained (Lighthouse > 85)

---

## Key Files Reference

**New Files:**
- `src/i18n/index.ts` — i18next configuration
- `src/i18n/locales/` — Translation JSON files
- `src/contexts/LanguageContext.tsx` — Language state
- `src/components/LanguageToggle.tsx` — Toggle UI
- `src/components/LocalizedRoutes.tsx` — Route wrapper
- `scripts/translate.ts` — AI translation script

**Modified Files:**
- `src/App.tsx` — Route structure
- `src/components/Navigation.tsx` — Add toggle
- `src/components/Footer.tsx` — Add toggle
- `src/data/portfolioData.ts` — Externalize to JSON
- All page and component files (use `useTranslation`)

---

## Notes for Dev

1. **PT-BR is source of truth** — Write content in Portuguese first
2. **Namespace organization** — Keep translations organized by page/feature
3. **Type safety** — Generate types from JSON structure
4. **Lazy loading** — Load only current language namespace
5. **SEO** — Implement hreflang tags for both languages
6. **Artistic tone** — AI translation needs guidelines for poetic content

---

## AI Translation Guidelines

When translating artistic/poetic content:
- Maintain the philosophical tone
- Preserve the brutalist aesthetic in language
- Keep invitations, not demands
- Respect the "Futuro Ancestral" philosophy
- Allow creative adaptation, not literal translation

---

*"The future is ancestral." / "O futuro é ancestral."*
