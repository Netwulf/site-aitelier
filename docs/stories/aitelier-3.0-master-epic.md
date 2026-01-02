# AI.TELIER v3.0 — Master Epic

**Epic ID:** AITELIER-3.0
**Created:** 2025-12-29
**Status:** Ready for Development
**Audit:** UX Visual Audit - Framer/Apple Level
**Prerequisite:** Epic 2.0 (Foundation complete)

---

## Overview

Elevate AI.TELIER from "good design" to **Framer/Apple-level polish**. Focus on micro-interactions, smooth animations, and premium feel.

**Philosophy:** Every pixel breathes
**Aesthetic:** High-ticket studio presence
**Core Change:** Static → Living interface

---

## Audit Summary

Current state: **70% Framer-level**
Gap areas:
- Micro-interactions (hover, click, scroll)
- Timing & easing refinements
- Scroll-triggered reveals
- Premium details (cursors, focus states)

---

## Epic Breakdown

| Epic | Name | Priority | Est. Effort | Stories |
|------|------|----------|-------------|---------|
| 3.1 | Quick Wins | P0 | 3-4 hours | 1 |
| 3.2 | Cards & Hover Polish | P0 | 4-5 hours | 1 |
| 3.3 | Gallery & Scroll | P1 | 5-6 hours | 1 |
| 3.4 | Deep Polish | P2 | 8-10 hours | 1 |

**Total Stories:** 4
**Total Effort:** 20-25 hours (~3 days)

---

## Story Index

### Story 3.1: Quick Wins [P0] - 3-4 hours
- Nav link hover underline animation
- Smooth scroll CSS global
- Backdrop blur enhancement
- Card stagger reveal on load
- Basic scroll-triggered fade-in

### Story 3.2: Cards & Hover Polish [P0] - 4-5 hours
- Card lift + shadow on hover
- Triptych scale effect
- Button shine/sweep effect
- Number indicator animation
- Border glow transitions

### Story 3.3: Gallery & Scroll [P1] - 5-6 hours
- Gallery images scroll reveal (IntersectionObserver)
- Modal spring physics
- Image hover brightness shift
- Scroll progress indicator
- Section reveal animations

### Story 3.4: Deep Polish [P2] - 8-10 hours
- Custom cursor system
- Magnetic button effect
- Hero parallax on mouse move
- Page transition animations
- Mobile menu stagger
- Focus ring animations

---

## Dependencies

```
Story 3.1 (Quick Wins)
    ↓
Story 3.2 (Cards) + Story 3.3 (Gallery) [parallel]
    ↓
Story 3.4 (Deep Polish)
```

---

## Definition of Done (All Stories)

- [ ] Animation implemented and smooth (60fps)
- [ ] Respects `prefers-reduced-motion`
- [ ] Mobile performance tested
- [ ] No layout shifts (CLS = 0)
- [ ] Lighthouse performance > 85
- [ ] Before/after comparison documented

---

## Key Files Reference

**Animation System:**
- `src/index.css` — CSS animations, keyframes
- `src/utils/motionVariants.ts` — Framer Motion variants
- `tailwind.config.ts` — Animation tokens

**Components to Update:**
- `src/components/NavigationV2.tsx` — Nav hover effects
- `src/components/Triptych.tsx` — Card animations
- `src/components/VisualArchiveGrid.tsx` — Gallery reveals
- `src/components/HeroV2.tsx` — Parallax effects
- `src/components/ImageModal.tsx` — Modal transitions

**Hooks:**
- `src/hooks/useReducedMotion.ts` — A11y support
- `src/hooks/useIntersectionObserver.ts` — Scroll triggers (new)
- `src/hooks/useMousePosition.ts` — Cursor tracking (new)

---

## Technical Approach

### Animation Philosophy
1. **Easing:** Use `cubic-bezier(0.4, 0, 0.2, 1)` for most, spring for bouncy
2. **Duration:** 200-400ms for micro, 400-600ms for reveals
3. **Stagger:** 50-100ms between siblings
4. **Performance:** CSS for simple, Framer Motion for complex

### CSS-First Strategy
Prefer CSS animations over JS when possible:
```css
/* Good - CSS handles it */
.nav-link::after { transition: width 0.3s ease-out; }

/* Use Framer Motion for */
- Complex orchestration
- Spring physics
- Gesture-based
- State-dependent
```

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Framer-feel | 70% | 95% |
| Lighthouse Perf | 85 | 90+ |
| CLS | 0.05 | 0 |
| Animation fps | 45-60 | 60 |

---

## Notes for Dev

1. **Performance first** — If animation causes jank, simplify it
2. **A11y always** — Check `prefers-reduced-motion` everywhere
3. **Mobile different** — Some effects desktop-only (parallax, cursor)
4. **Test real devices** — Don't trust Chrome DevTools alone
5. **Incremental** — Ship Story 3.1 first, validate, continue

---

*"The details are not the details. They make the design."* — Charles Eames
