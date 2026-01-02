# AI.TELIER v2.0 — Master Epic

**Epic ID:** AITELIER-2.0
**Created:** 2025-12-28
**Status:** Ready for Development
**PRD:** `docs/prd/AITELIER-SITE-V2-PRD.md`
**Strategy:** `docs/strategy/AITELIER-V2-STRATEGY.md`

---

## Overview

Complete repositioning of AI.TELIER site from "creative studio" to "foundational field for the AI era".

**Philosophy:** Futuro Ancestral
**Aesthetic:** Brutalism + Tech Ancestral
**Core Change:** Agency → Field

---

## Epic Breakdown

| Epic | Name | Priority | Est. Effort | Stories |
|------|------|----------|-------------|---------|
| 1 | Foundation & Home | P0 | 2-3 days | 5 |
| 2 | O Campo | P0 | 1-2 days | 3 |
| 3 | Studio Revision | P0 | 1 day | 2 |
| 4 | Estudos | P1 | 1-2 days | 3 |
| 5 | Archive | P1 | 1-2 days | 3 |
| 6 | Polish & Launch | P1 | 1-2 days | 4 |

**Total Stories:** 20
**Total Effort:** 7-12 days

---

## Story Index

### Epic 1: Foundation & Home [P0]
- `2.1.1` Design System Updates (colors, typography, spacing)
- `2.1.2` Core Components (SectionNumber, Triptych, PhilosophyBlock)
- `2.1.3` New Hero Section
- `2.1.4` Home Page Sections (Rupture, Triptych, Futuro Ancestral)
- `2.1.5` Home Page Entry & Footer

### Epic 2: O Campo [P0]
- `2.2.1` Campo Page Structure & Manifesto
- `2.2.2` Futuro Ancestral Section
- `2.2.3` Os Conselheiros Feature (Basic)

### Epic 3: Studio Revision [P0]
- `2.3.1` Studio Page New Copy & Structure
- `2.3.2` Studio Process Section & Entry

### Epic 4: Estudos [P1]
- `2.4.1` Estudos Page Structure
- `2.4.2` Fundamentos Section (Vorkurs)
- `2.4.3` Laboratórios Section

### Epic 5: Archive [P1]
- `2.5.1` Archive Page Structure
- `2.5.2` Visual Archive Grid
- `2.5.3` Journal Integration

### Epic 6: Polish & Launch [P1]
- `2.6.1` Animations & Transitions
- `2.6.2` Contact Page Multi-Door
- `2.6.3` SEO & Meta Tags
- `2.6.4` Performance Optimization

---

## Dependencies

```
Epic 1 (Foundation)
    ↓
Epic 2 (Campo) + Epic 3 (Studio) [parallel]
    ↓
Epic 4 (Estudos) + Epic 5 (Archive) [parallel]
    ↓
Epic 6 (Polish)
```

---

## Definition of Done (All Stories)

- [ ] Code implemented and working
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Copy matches PRD specifications
- [ ] No console errors
- [ ] Lighthouse performance > 85
- [ ] Reviewed by stakeholder

---

## Key Files Reference

**Design System:**
- `src/index.css` — Global styles, CSS variables
- `tailwind.config.ts` — Tailwind configuration

**Pages:**
- `src/pages/Index.tsx` — Home
- `src/pages/Studio.tsx` — Studio
- `src/pages/Campo.tsx` — O Campo (new)
- `src/pages/Estudos.tsx` — Estudos (new)
- `src/pages/Archive.tsx` — Archive (new)
- `src/pages/Contact.tsx` — Contact

**Components:**
- `src/components/` — All components

---

## Notes for Dev

1. **Copy is final** — All text in stories is approved, implement as-is
2. **Brutalist aesthetic** — Exposed structure, visible borders, asymmetry
3. **No aggressive CTAs** — Invitations, not demands
4. **Section numbers** — Visible in margins (01, 02, 03...)
5. **Cinematic images** — Grain, high contrast, film ratios
6. **Mobile-first** — But desktop is primary experience

---

*"O futuro é ancestral."*
