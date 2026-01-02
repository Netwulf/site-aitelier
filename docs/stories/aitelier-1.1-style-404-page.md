# Story 1.1: Style 404 NotFound Page

**Epic:** AITELIER-1.0
**Status:** Done
**Priority:** P1 (High)
**Estimated Effort:** 1 hour

---

## Story

**As a** visitor who lands on a non-existent URL,
**I want** to see a 404 page that matches the site's brutalist design,
**so that** the brand experience remains consistent and I can easily navigate back.

---

## Acceptance Criteria

1. 404 page uses `bg-brutal-black` background (not gray)
2. Typography uses `text-brutal-white` with matrix-green accents
3. "404" number has glitch effect matching Hero component
4. "Page not found" message uses poetic/brutalist copy
5. Return home button uses `btn-primary` class
6. Page includes subtle scanline or terminal effect
7. Mobile responsive (matches other pages)

---

## Tasks / Subtasks

- [ ] Update NotFound.tsx styling (AC: 1, 2, 7)
  - [ ] Change `bg-gray-100` to `bg-brutal-black`
  - [ ] Change `text-gray-600` to `text-brutal-white/60`
  - [ ] Add `min-h-screen` with proper flex centering

- [ ] Add glitch effect to 404 number (AC: 3)
  - [ ] Import glitch CSS class from Hero
  - [ ] Apply `glitch` class to "404" heading
  - [ ] Consider adding `matrix-glow` effect

- [ ] Update copy to match brand voice (AC: 4)
  - [ ] Replace "Oops! Page not found" with brutalist copy
  - [ ] Suggested: "ROUTE_NOT_FOUND: Esta frequencia nao existe"
  - [ ] Add terminal-style decoration `[ERROR_404]`

- [ ] Style return button (AC: 5)
  - [ ] Replace anchor with button or styled link
  - [ ] Use `btn-primary` or `btn-matrix` class
  - [ ] Add hover state with matrix-green glow

- [ ] Add ambient effects (AC: 6)
  - [ ] Consider adding scanlines overlay
  - [ ] Optional: subtle background animation

- [ ] Test responsiveness (AC: 7)
  - [ ] Verify on mobile viewport (375px)
  - [ ] Verify on tablet viewport (768px)
  - [ ] Verify on desktop (1440px)

---

## Dev Notes

### Current State (Problem)

```tsx
// NotFound.tsx - Line 12-19
<div className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="text-center">
    <h1 className="mb-4 text-4xl font-bold">404</h1>
    <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
    <a href="/" className="text-blue-500 underline hover:text-blue-700">
      Return to Home
    </a>
  </div>
</div>
```

**Issues:**
- Uses generic gray/blue colors (not brand)
- No brutalist aesthetic
- Plain sans-serif typography
- No visual effects

### Design Reference

Follow existing components for styling patterns:
- `Hero.tsx` - Glitch text effect
- `FinalCTA.tsx` - Matrix-green button styling
- `index.css` - Contains `.glitch`, `.scanlines`, `.matrix-glow` classes

### Suggested Implementation

```tsx
<div className="flex min-h-screen items-center justify-center bg-brutal-black relative">
  {/* Optional scanlines overlay */}
  <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

  <div className="text-center z-10 px-4">
    <p className="text-matrix-green text-sm code-text mb-4">[ERROR_404]</p>
    <h1 className="text-6xl md:text-8xl font-bold text-brutal-white glitch mb-6">
      404
    </h1>
    <p className="text-xl text-brutal-white/70 font-serif italic mb-8">
      Esta frequencia nao existe no sistema
    </p>
    <a
      href="/"
      className="btn-primary inline-block"
    >
      Voltar ao Portal
    </a>
  </div>
</div>
```

### Relevant Files

```
ai.telier-site/
├── src/
│   ├── pages/
│   │   └── NotFound.tsx        # MODIFY (this story)
│   ├── components/
│   │   ├── Hero.tsx            # REFERENCE (glitch effect)
│   │   └── FinalCTA.tsx        # REFERENCE (button styling)
│   └── index.css               # REFERENCE (CSS classes)
```

---

## Testing

### Visual Test

1. Navigate to `/nonexistent-page`
2. Verify black background with matrix-green accents
3. Verify "404" has glitch animation
4. Click "Voltar ao Portal" - should navigate to home
5. Check no console errors

### Responsive Test

| Viewport | Expected |
|----------|----------|
| 375px | Text readable, button full-width or centered |
| 768px | Larger text, centered layout |
| 1440px | Full design, glitch effect visible |

---

## Definition of Done

- [ ] 404 page uses brutalist design system
- [ ] Glitch effect on 404 number
- [ ] Brand-appropriate copy in Portuguese
- [ ] Button uses design system class
- [ ] Responsive on all viewports
- [ ] No console errors
- [ ] Visual review approved

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-27 | 1.0 | Story created | Pax (@po) |

---

## Dev Agent Record

### Agent Model Used
[To be populated by dev agent]

### Completion Notes
[To be populated by dev agent]

### File List
[To be populated by dev agent]
