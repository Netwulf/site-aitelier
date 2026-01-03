# AI.TELIER Site - Stories Index

## Active Epics

### AITELIER-3.0-I18N: Internationalization
**Status:** Ready for Development | **Priority:** P0 | **Created:** 2026-01-02

Complete internationalization with Portuguese and English support, bilingual routes, and AI-assisted translation.

### AITELIER-2.0: Site Repositioning
**Status:** Completed | **Priority:** P0 | **Created:** 2025-12-28

Complete repositioning from "creative studio" to "foundational field for the AI era".

### AITELIER-1.0: Production Readiness
**Status:** Completed | **Priority:** P1 | **Created:** 2025-12-27

Prepare ai.telier-site for production deployment.

---

## Epic 3.0 Stories (i18n)

| ID | Story | Priority | Effort | Status | File |
|----|-------|----------|--------|--------|------|
| 3.1 | i18n Foundation Setup | P0 | 3-4h | Draft | [3.1-i18n-foundation-setup.md](./3.1-i18n-foundation-setup.md) |
| 3.2 | Content Extraction & JSON Structure | P0 | 4-6h | Draft | [3.2-content-extraction.md](./3.2-content-extraction.md) |
| 3.3 | Bilingual Routes Implementation | P0 | 2-3h | Draft | [3.3-bilingual-routes.md](./3.3-bilingual-routes.md) |
| 3.4 | Language Toggle UI | P0 | 2-3h | Draft | [3.4-language-toggle-ui.md](./3.4-language-toggle-ui.md) |
| 3.5 | AI Translation Pipeline | P1 | 3-4h | Draft | [3.5-ai-translation-pipeline.md](./3.5-ai-translation-pipeline.md) |
| 3.6 | Portfolio Data Translation | P1 | 2-3h | Draft | [3.6-portfolio-translation.md](./3.6-portfolio-translation.md) |
| 3.7 | QA & Polish | P1 | 2-3h | Draft | [3.7-i18n-qa-polish.md](./3.7-i18n-qa-polish.md) |

**Total Effort:** 18-26 hours (~3-4 days)

### Recommended Execution Order

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

## Epic 2.0 Stories (Site Repositioning)

| ID | Story | Priority | Status | File |
|----|-------|----------|--------|------|
| 2.1.1 | Design System Updates | P0 | Done | [2.1.1-design-system-updates.md](./2.1.1-design-system-updates.md) |
| 2.1.2 | Core Components | P0 | Done | [2.1.2-core-components.md](./2.1.2-core-components.md) |
| 2.1.3 | New Hero Section | P0 | Done | [2.1.3-new-hero-section.md](./2.1.3-new-hero-section.md) |
| 2.1.4 | Home Page Sections | P0 | Done | [2.1.4-home-page-sections.md](./2.1.4-home-page-sections.md) |
| 2.1.5 | Home Entry & Footer | P0 | Done | [2.1.5-home-entry-footer.md](./2.1.5-home-entry-footer.md) |
| ... | ... | ... | Done | ... |

---

## Epic 1.0 Stories (Production Readiness)

| ID | Story | Priority | Effort | Status | File |
|----|-------|----------|--------|--------|------|
| 1.1 | Style 404 NotFound Page | P1 | 1h | Done | [aitelier-1.1-style-404-page.md](./aitelier-1.1-style-404-page.md) |
| 1.2 | Implement Contact Form Backend | P1 | 3h | Done | [aitelier-1.2-contact-form-backend.md](./aitelier-1.2-contact-form-backend.md) |
| 1.3 | Fix SEO Meta Tags | P0 | 30min | Done | [aitelier-1.3-fix-seo-meta-tags.md](./aitelier-1.3-fix-seo-meta-tags.md) |
| 1.4 | Fix Dynamic Tailwind Classes | P2 | 2h | Done | [aitelier-1.4-fix-dynamic-tailwind-classes.md](./aitelier-1.4-fix-dynamic-tailwind-classes.md) |

---

## Quick Reference

### Project Location
```
/Users/taypuri/Documents/AIOS/mmos-sintetica-factory-v3.0/ai.telier-site/
```

### Run Dev Server
```bash
cd ai.telier-site
npm install
npm run dev
# → http://localhost:8080/
```

### Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- i18next + react-i18next (Epic 3.0)

---

## Epic Documents

- [aitelier-3.0-i18n-master-epic.md](./aitelier-3.0-i18n-master-epic.md) - Internationalization
- [aitelier-2.0-master-epic.md](./aitelier-2.0-master-epic.md) - Site Repositioning
- [aitelier-1.0-master-epic.md](./aitelier-1.0-master-epic.md) - Production Readiness
