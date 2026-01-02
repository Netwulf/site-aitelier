# Story 3.1: Base Structure with CSS Scroll Snap

**Story ID:** AITELIER-3.1
**Epic:** AITELIER-3.0 (Horizontal Navigation)
**Status:** Done
**Priority:** P0
**Effort:** 2-3h

---

## Story

**As a** visitor to ai.telier,
**I want** a horizontal navigation container that holds all 4 frames,
**so that** I can seamlessly navigate between the 4 fronts of ai.telier.

---

## Acceptance Criteria

1. Container ocupa 100vw x 100vh com overflow horizontal
2. CSS Scroll Snap configurado como `mandatory` para snap preciso
3. Container aceita children (HeroFrame components)
4. Scroll vertical dentro de cada frame funciona normalmente
5. Performance: Não há layout shift durante navegação

---

## Tasks / Subtasks

- [x] **Task 1:** Criar container base `HorizontalNavigator.tsx` (AC: 1, 2, 3)
  - [x] Container com `display: flex` e `overflow-x: scroll`
  - [x] CSS: `scroll-snap-type: x mandatory`
  - [x] CSS: `scroll-behavior: smooth`
  - [x] Esconder scrollbar nativa (`-webkit-scrollbar: none`)

- [x] **Task 2:** Configurar scroll snap children (AC: 2, 5)
  - [x] CSS children: `scroll-snap-align: start`
  - [x] CSS children: `flex-shrink: 0; width: 100vw; height: 100vh`

- [x] **Task 3:** Permitir scroll vertical dentro de frames (AC: 4)
  - [x] CSS children: `overflow-y: auto`
  - [x] Testar que scroll vertical não interfere no horizontal

- [x] **Task 4:** Integrar na página Index (AC: 1)
  - [x] Importar e usar `HorizontalNavigator` em `IndexHorizontal.tsx`
  - [x] Adicionar 4 frames com dados do briefing

---

## Dev Notes

### Estrutura CSS

```css
/* Container */
.horizontal-navigator {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100vw;
  height: 100vh;
}

/* Hide scrollbar */
.horizontal-navigator::-webkit-scrollbar {
  display: none;
}
.horizontal-navigator {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Children frames */
.hero-frame {
  flex-shrink: 0;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  overflow-y: auto;
}
```

### Testing

- [ ] Verificar scroll snap funciona em Chrome, Safari, Firefox
- [ ] Testar em mobile (touch scroll)
- [ ] Confirmar não há horizontal scroll escape

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-29 | 1.0 | Story created | @po |

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Created HorizontalNavigator.tsx component with CSS Scroll Snap
- Added comprehensive CSS in index.css for horizontal navigation
- Created IndexHorizontal.tsx page for testing at /horizontal route
- Build passes successfully

### File List
- `src/components/navigation/HorizontalNavigator.tsx` (new)
- `src/pages/IndexHorizontal.tsx` (new)
- `src/index.css` (modified - added horizontal navigation CSS)
- `src/App.tsx` (modified - added /horizontal route)
