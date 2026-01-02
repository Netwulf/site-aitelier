# Story 3.2: HeroFrame Reusable Component

**Story ID:** AITELIER-3.2
**Epic:** AITELIER-3.0 (Horizontal Navigation)
**Status:** Done
**Priority:** P0
**Effort:** 2-3h
**Depends on:** Story 3.1

---

## Story

**As a** developer,
**I want** a reusable HeroFrame component that accepts content props,
**so that** I can easily configure each of the 4 frames with their unique content.

---

## Acceptance Criteria

1. Componente aceita props: título, subtítulo, código, background, children
2. Background suporta vídeo ou imagem
3. Layout segue hierarquia visual do briefing
4. Componente é responsivo (mobile/desktop)
5. Vídeo background tem lazy loading

---

## Tasks / Subtasks

- [x] **Task 1:** Criar componente `HeroFrame.tsx` (AC: 1, 3)
  - [x] Interface TypeScript com todas as props
  - [x] Layout: fullscreen com conteúdo centralizado
  - [x] Tipografia: título grande, subtítulo menor, código estilo terminal

- [x] **Task 2:** Implementar background media (AC: 2, 5)
  - [x] Suporte para `backgroundImage` (URL ou import)
  - [x] Suporte para `backgroundVideo` (URL ou import)
  - [x] Lazy loading do vídeo com Intersection Observer
  - [x] Fallback para imagem se vídeo falhar

- [x] **Task 3:** Estilização seguindo briefing (AC: 3, 4)
  - [x] Título: fonte bold, uppercase, tamanho hero
  - [x] Subtítulo: fonte lighter, normal case
  - [x] Código: fonte mono, cor accent, prefixo "//"
  - [x] Overlay escuro para legibilidade

- [x] **Task 4:** Criar os 4 frames com dados do briefing (AC: 1)
  - [x] Frame 1: ai.telier (institucional)
  - [x] Frame 2: Escola
  - [x] Frame 3: Studio
  - [x] Frame 4: Galeria

---

## Dev Notes

### Props Interface

```typescript
interface HeroFrameProps {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  children?: React.ReactNode;
}
```

### Dados dos 4 Frames

```typescript
const frames: HeroFrameProps[] = [
  {
    id: 'aitelier',
    title: 'O FUTURO É ANCESTRAL.',
    subtitle: 'Usamos tecnologia do futuro para revelar verdades que sempre existiram.',
    code: '// ai.telier'
  },
  {
    id: 'escola',
    title: 'ESCOLA',
    subtitle: 'A escola de cinema sem câmeras.',
    code: '// onde se forma a linguagem'
  },
  {
    id: 'studio',
    title: 'STUDIO',
    subtitle: 'Não construímos marcas. Marcamos histórias.',
    code: '// onde identidade vira obra'
  },
  {
    id: 'galeria',
    title: 'GALERIA',
    subtitle: 'A memória viva do que construímos.',
    code: '// onde o trabalho permanece'
  }
];
```

### Testing

- [ ] Testar com imagem de background
- [ ] Testar com vídeo de background
- [ ] Verificar responsividade em 3 breakpoints
- [ ] Confirmar lazy loading do vídeo funciona

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
- Created HeroFrame.tsx component with all required props
- Implemented video lazy loading with Intersection Observer
- Created frames.ts data file with all 4 frames from briefing
- Responsive design with proper typography hierarchy

### File List
- `src/components/navigation/HeroFrame.tsx` (new)
- `src/data/frames.ts` (new)
- `src/pages/IndexHorizontal.tsx` (new)
