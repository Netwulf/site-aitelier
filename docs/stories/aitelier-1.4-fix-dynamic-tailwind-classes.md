# Story 1.4: Fix Dynamic Tailwind Classes

**Epic:** AITELIER-1.0
**Status:** Done
**Priority:** P2 (Medium)
**Estimated Effort:** 2 hours

---

## Story

**As a** developer maintaining the codebase,
**I want** all dynamic color classes to render correctly,
**so that** the design displays as intended without missing styles.

---

## Acceptance Criteria

1. All components using template literal classes are identified
2. Dynamic classes replaced with working alternatives
3. No Tailwind purge warnings in build
4. All colors render correctly in production build
5. Design system integrity maintained

---

## Tasks / Subtasks

- [ ] Audit codebase for dynamic Tailwind classes (AC: 1)
  - [ ] Search for pattern: `text-${` or `bg-${`
  - [ ] Search for pattern: `className={.*\$\{`
  - [ ] Document all occurrences with file:line

- [ ] Analyze each occurrence (AC: 1)
  - [ ] Determine if class is color-based
  - [ ] Determine source of dynamic value
  - [ ] Categorize: fixable vs needs refactor

- [ ] Fix using safe patterns (AC: 2, 5)
  - [ ] Option A: Use inline styles for truly dynamic values
  - [ ] Option B: Use CSS variables
  - [ ] Option C: Use class lookup objects
  - [ ] Option D: Safelist in tailwind.config.ts

- [ ] Verify build output (AC: 3, 4)
  - [ ] Run `npm run build`
  - [ ] Check for purge warnings
  - [ ] Verify CSS includes all needed classes

- [ ] Visual regression test (AC: 4, 5)
  - [ ] Compare before/after screenshots
  - [ ] Verify colors match design

---

## Dev Notes

### The Problem

Tailwind uses PurgeCSS at build time. It scans files for class names as **complete strings**. Template literals break this:

```tsx
// BROKEN - Tailwind can't detect this at build time
className={`text-${stage.color}`}  // stage.color = "matrix-green"
// Expected: text-matrix-green
// Actual: class not in CSS bundle
```

### Common Patterns Found

Based on analysis, these patterns likely exist:

```tsx
// Pattern 1: Color from props/state
<div className={`text-${color}`}>  // BROKEN

// Pattern 2: Conditional with template
<div className={`${isActive ? 'bg-green' : 'bg-gray'}`}>  // OK (full strings)

// Pattern 3: Dynamic from array/object
stages.map(s => <div className={`border-${s.color}`}>)  // BROKEN
```

### Solution Options

**Option A: Inline Styles (Simplest)**
```tsx
// Before
<div className={`text-${stage.color}`}>

// After
<div style={{ color: stage.colorHex }}>
// Where colorHex = "#00FF41" for matrix-green
```

**Option B: Class Lookup Object (Recommended)**
```tsx
const colorClasses = {
  'matrix-green': 'text-matrix-green',
  'brutal-white': 'text-brutal-white',
  'neon-cyan': 'text-neon-cyan',
} as const;

// Usage
<div className={colorClasses[stage.color]}>
```

**Option C: CSS Variables**
```tsx
// In CSS
:root {
  --stage-color: #00FF41;
}

// In component
<div className="text-[var(--stage-color)]">
```

**Option D: Safelist in Tailwind Config**
```ts
// tailwind.config.ts
export default {
  safelist: [
    'text-matrix-green',
    'text-brutal-white',
    'text-neon-cyan',
    'bg-matrix-green',
    // ... all possible dynamic classes
  ],
}
```

### Recommended Approach

1. **For known finite values**: Use Class Lookup Object (Option B)
2. **For truly dynamic values**: Use Inline Styles (Option A)
3. **Avoid Safelist** unless absolutely necessary (bloats CSS)

### Files to Check

Based on site review, likely locations:
- `BrandOSMethodUnified.tsx` - Stage colors
- `CoursesAndMentorship.tsx` - Card accents
- `CommunityHub.tsx` - Category colors
- `Journal.tsx` - Filter tags

### Search Commands

```bash
# Find template literal classes
grep -r "className={\`" src/
grep -r 'className={`.*\${' src/

# Find specific dynamic patterns
grep -r "text-\${" src/
grep -r "bg-\${" src/
grep -r "border-\${" src/
```

---

## Testing

### Build Test

```bash
npm run build
# Should complete without warnings about missing classes
```

### Visual Test

1. Run dev server: `npm run dev`
2. Navigate to each page
3. Verify all colors display correctly
4. Compare to design reference

### Specific Component Tests

| Component | Element | Expected Color |
|-----------|---------|----------------|
| BrandOSMethodUnified | Stage icons | matrix-green |
| CommunityHub | Category tags | Various neon |
| Journal | Filter pills | matrix-green active |

---

## Definition of Done

- [ ] All dynamic class patterns identified and documented
- [ ] Each pattern fixed with appropriate solution
- [ ] Build completes without purge warnings
- [ ] All colors render in production build
- [ ] Visual review confirms design integrity
- [ ] No console warnings about undefined classes

---

## Technical Notes

### Why This Happens

Tailwind's JIT compiler scans source files at build time looking for complete class strings. It uses regex patterns like:

```
/[^<>"'`\s]*[^<>"'`\s:]/g
```

Template literals with variables are evaluated at **runtime**, but Tailwind needs to find classes at **build time**. The variable value doesn't exist during build, so the class is never added to the CSS.

### Prevention Going Forward

Add to team guidelines:
1. Never use template literals for Tailwind classes
2. Use lookup objects for dynamic styling
3. Keep color values in CSS variables when truly dynamic
4. Run `npm run build` before committing color changes

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
