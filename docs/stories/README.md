# AI.TELIER Site - Stories Index

## Active Epic

### AITELIER-1.0: Production Readiness Fixes
**Status:** Active | **Priority:** P1 | **Created:** 2025-12-27

Prepare ai.telier-site for production deployment by fixing all identified issues.

---

## Stories

| ID | Story | Priority | Effort | Status | File |
|----|-------|----------|--------|--------|------|
| 1.1 | Style 404 NotFound Page | P1 | 1h | Done | [aitelier-1.1-style-404-page.md](./aitelier-1.1-style-404-page.md) |
| 1.2 | Implement Contact Form Backend | P1 | 3h | Done | [aitelier-1.2-contact-form-backend.md](./aitelier-1.2-contact-form-backend.md) |
| 1.3 | Fix SEO Meta Tags | P0 | 30min | Done | [aitelier-1.3-fix-seo-meta-tags.md](./aitelier-1.3-fix-seo-meta-tags.md) |
| 1.4 | Fix Dynamic Tailwind Classes | P2 | 2h | Done | [aitelier-1.4-fix-dynamic-tailwind-classes.md](./aitelier-1.4-fix-dynamic-tailwind-classes.md) |

---

## Recommended Execution Order

1. **Story 1.3** (P0, 30min) - SEO fix is critical and quick
2. **Story 1.1** (P1, 1h) - 404 page is user-facing
3. **Story 1.4** (P2, 2h) - Tailwind fixes for visual consistency
4. **Story 1.2** (P1, 3h) - Contact form requires external setup

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

---

## Epic Document
[aitelier-1.0-master-epic.md](./aitelier-1.0-master-epic.md)
