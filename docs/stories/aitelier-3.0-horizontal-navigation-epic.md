# AI.TELIER v3.0 — Horizontal Navigation Epic

**Epic ID:** AITELIER-3.0
**Created:** 2025-12-29
**Status:** Ready for Development
**Briefing:** `docs/briefing-navegacao-horizontal-v3.md`

---

## Overview

Implementar navegação em dois eixos para o ai.telier:
- **Vertical (↓):** Aprofunda no conteúdo da seção atual
- **Horizontal (←→):** Navega entre as 4 frentes do ai.telier

```
                    ↑
         [ai.telier] ←→ [Escola] ←→ [Studio] ←→ [Galeria]
                    ↓
              (conteúdo)
```

---

## Os 4 Frames

| Frame | Título | Subtítulo | Código |
|-------|--------|-----------|--------|
| 1 | O FUTURO É ANCESTRAL. | Usamos tecnologia do futuro para revelar verdades que sempre existiram. | // ai.telier |
| 2 | ESCOLA | A escola de cinema sem câmeras. | // onde se forma a linguagem |
| 3 | STUDIO | Não construímos marcas. Marcamos histórias. | // onde identidade vira obra |
| 4 | GALERIA | A memória viva do que construímos. | // onde o trabalho permanece |

---

## Story Index

| Story | Título | Prioridade | Esforço |
|-------|--------|------------|---------|
| 3.1 | Base Structure (CSS Scroll Snap) | P0 | 2-3h |
| 3.2 | HeroFrame Component | P0 | 2-3h |
| 3.3 | Desktop Navigation | P0 | 3-4h |
| 3.4 | Mobile Navigation | P1 | 2-3h |
| 3.5 | Transitions (Framer Motion) | P1 | 2-3h |

**Total Effort:** 11-16h (1.5-2 days)

---

## Dependencies

```
Story 3.1 (Base Structure)
    ↓
Story 3.2 (HeroFrame Component)
    ↓
Story 3.3 (Desktop Nav) + Story 3.4 (Mobile Nav) [parallel]
    ↓
Story 3.5 (Transitions)
```

---

## Technical Stack

- **CSS Scroll Snap:** Navegação horizontal suave
- **Framer Motion:** Transições e animações
- **Intersection Observer:** Ativar animações por frame
- **React hooks:** useRef, useState, useEffect para controle

---

## Definition of Done (All Stories)

- [ ] Código implementado e funcionando
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Copy conforme briefing
- [ ] Sem erros no console
- [ ] Performance Lighthouse > 85
- [ ] Navegação acessível (keyboard, ARIA)

---

## Key Files Reference

**Containers:**
- `src/components/HorizontalNavigator.tsx` — Container principal (novo)
- `src/components/HeroFrame.tsx` — Frame individual (novo)

**Navigation:**
- `src/components/NavigationArrows.tsx` — Setas laterais (novo)
- `src/components/NavigationDots.tsx` — Indicadores de posição (novo)

**Pages:**
- `src/pages/Index.tsx` — Integrar HorizontalNavigator

**Hooks:**
- `src/hooks/useHorizontalNavigation.ts` — Lógica de navegação (novo)

---

## Notes for Dev

1. **4 Frames = 4 Viewports:** Cada frame ocupa 100vw x 100vh
2. **Scroll Snap:** `scroll-snap-type: x mandatory` no container
3. **Keyboard:** ← → navegam entre frames
4. **Touch:** Swipe horizontal habilitado no mobile
5. **Vídeo background:** Lazy loading por frame visível
6. **State sync:** URL hash (#escola, #studio, #galeria) opcional

---

*"O futuro é ancestral."*
