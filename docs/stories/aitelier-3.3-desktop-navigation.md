# Story 3.3: Desktop Navigation

**Story ID:** AITELIER-3.3
**Epic:** AITELIER-3.0 (Horizontal Navigation)
**Status:** Done
**Priority:** P0
**Effort:** 3-4h
**Depends on:** Story 3.2

---

## Story

**As a** desktop user,
**I want** clear navigation controls (arrows, keyboard, indicators),
**so that** I can easily navigate between the 4 frames.

---

## Acceptance Criteria

1. Setas (← →) visíveis nas laterais do viewport
2. Keyboard navigation: ← e → trocam de frame
3. Indicadores (dots ou labels) mostram posição atual
4. Setas desabilitam nos extremos (início/fim)
5. Transição suave entre frames (scroll-behavior: smooth)
6. Estado sincronizado: dots atualizam com scroll manual

---

## Tasks / Subtasks

- [x] **Task 1:** Criar hook `useHorizontalNavigation` (AC: 2, 5, 6)
  - [x] Estado: currentFrame (0-3)
  - [x] Funções: goToFrame(index), goNext(), goPrev()
  - [x] Event listener para keyboard (ArrowLeft, ArrowRight)
  - [x] Scroll observer para sincronizar com scroll manual

- [x] **Task 2:** Criar componente `NavigationArrows.tsx` (AC: 1, 4)
  - [x] Seta esquerda (←) e direita (→)
  - [x] Posicionamento: fixed nas laterais, vertical center
  - [x] Desabilitar seta esquerda no frame 0
  - [x] Desabilitar seta direita no frame 3
  - [x] Estilo: transparente com hover effect

- [x] **Task 3:** Criar componente `NavigationDots.tsx` (AC: 3, 6)
  - [x] 4 dots horizontais
  - [x] Posicionamento: fixed no bottom center
  - [x] Dot ativo tem estilo diferente (filled vs outline)
  - [x] Click no dot navega para o frame
  - [x] Labels opcionais (ai.telier, Escola, Studio, Galeria)

- [x] **Task 4:** Integrar navegação no HorizontalNavigator (AC: 1-6)
  - [x] Passar ref do container para o hook
  - [x] Renderizar arrows e dots
  - [x] Conectar estado com scroll position

---

## Dev Notes

### Hook Interface

```typescript
interface UseHorizontalNavigation {
  currentFrame: number;
  totalFrames: number;
  goToFrame: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

function useHorizontalNavigation(
  containerRef: RefObject<HTMLElement>,
  totalFrames: number
): UseHorizontalNavigation
```

### Keyboard Events

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Scroll Observer

```typescript
// Detect which frame is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        setCurrentFrame(getFrameIndex(entry.target));
      }
    });
  },
  { threshold: 0.5 }
);
```

### Testing

- [ ] Testar navegação por setas (click)
- [ ] Testar navegação por keyboard (← →)
- [ ] Testar navegação por dots (click)
- [ ] Verificar sincronização com scroll manual
- [ ] Confirmar setas desabilitam nos extremos

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
- Created useHorizontalNavigation hook with full keyboard support
- NavigationArrows with ChevronLeft/ChevronRight from lucide-react
- NavigationDots with labels and active state
- CSS styles in index.css for arrows and dots
- Arrows hidden on mobile via media query

### File List
- `src/hooks/useHorizontalNavigation.ts` (new)
- `src/components/navigation/NavigationArrows.tsx` (new)
- `src/components/navigation/NavigationDots.tsx` (new)
- `src/index.css` (modified - added navigation CSS)
