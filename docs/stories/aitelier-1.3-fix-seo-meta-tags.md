# Story 1.3: Fix SEO Meta Tags

**Epic:** AITELIER-1.0
**Status:** Done
**Priority:** P0 (Critical)
**Estimated Effort:** 30 minutes

---

## Story

**As a** potential visitor searching for AI.TELIER,
**I want** search engines and browser tabs to show correct branding,
**so that** I can find and identify the site correctly.

---

## Acceptance Criteria

1. Browser tab shows "AI.TELIER" (not "BRUTAL ARTE")
2. Title tag updated to reflect AI.TELIER branding
3. Meta description describes AI.TELIER's value proposition
4. Open Graph tags show correct title and description
5. Twitter card tags updated
6. Author meta tag shows "AI.TELIER"
7. Keywords updated for AI branding education
8. OG image URL updated (or removed if using default)

---

## Tasks / Subtasks

- [ ] Update index.html title and meta tags (AC: 1, 2, 3, 6, 7)
  - [ ] Change `<title>` from "BRUTAL ARTE" to "AI.TELIER"
  - [ ] Update `<meta name="description">` with AI.TELIER value prop
  - [ ] Update `<meta name="author">` to "AI.TELIER"
  - [ ] Update `<meta name="keywords">` for branding + AI

- [ ] Update Open Graph tags (AC: 4, 8)
  - [ ] Update `og:title` to AI.TELIER branding
  - [ ] Update `og:description` to match site description
  - [ ] Update `og:image` to AI.TELIER image (or remove placeholder)

- [ ] Update Twitter card tags (AC: 5)
  - [ ] Update `twitter:site` to AI.TELIER handle
  - [ ] Verify `twitter:image` is correct

- [ ] Verify preload assets (housekeeping)
  - [ ] Check if `hero-brutalist.jpg` preload is still valid

---

## Dev Notes

### Current State (Problem)

```html
<!-- index.html - Current (wrong) -->
<title>BRUTAL ARTE — Escola de Arte Brutalismo Poetico</title>
<meta name="description" content="A arte e o ultimo erro do sistema..." />
<meta name="author" content="BRUTAL ARTE" />
<meta property="og:title" content="BRUTAL ARTE — A carne dentro do codigo" />
<meta name="twitter:site" content="@lovable_dev" />
```

All references show "BRUTAL ARTE" instead of "AI.TELIER".

### Target State

```html
<!-- index.html - Target (correct) -->
<title>AI.TELIER — Escola de Branding e IA</title>
<meta name="description" content="Ensinamos o metodo Brand OS: sistemas de marca que unem identidade humana, inteligencia artificial e autonomia criativa." />
<meta name="author" content="AI.TELIER" />
<meta name="keywords" content="branding, inteligencia artificial, brand os, marca pessoal, ia para criadores, escola de branding, sao paulo" />

<meta property="og:title" content="AI.TELIER — Escola de Branding e IA" />
<meta property="og:description" content="Ensinamos o metodo Brand OS: sistemas de marca que unem identidade humana, inteligencia artificial e autonomia criativa." />
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-image.png" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@ai_telier" />
<meta name="twitter:image" content="/og-image.png" />
```

### Copy Reference

From Footer.tsx (approved brand copy):
> "Ensinamos o metodo Brand OS e criamos sistemas de marca que unem identidade humana, inteligencia artificial e autonomia criativa."

### File to Modify

```
ai.telier-site/
└── index.html    # MODIFY (all meta tags)
```

### OG Image Considerations

Current: Uses Lovable placeholder (`lovable.dev/opengraph-image-p98pqg.png`)

Options:
1. Create custom OG image (1200x630px) for AI.TELIER
2. Use a screenshot of the hero section
3. Remove og:image temporarily (shows site screenshot by default)

---

## Testing

### Browser Tab Test

1. Open site in browser
2. Verify tab shows "AI.TELIER - Escola de Branding e IA"

### Meta Tag Validation

Use: https://metatags.io/ or browser dev tools

1. Check `<title>` tag
2. Check `og:title`, `og:description`
3. Check `twitter:card` tags

### Social Preview Test

1. Use Facebook Sharing Debugger
2. Use Twitter Card Validator
3. Verify preview shows correct title/description

---

## Definition of Done

- [ ] Title shows "AI.TELIER" in browser tab
- [ ] Meta description reflects Brand OS value prop
- [ ] OG tags show correct branding
- [ ] Twitter card shows correct branding
- [ ] Keywords relevant to AI branding education
- [ ] No "BRUTAL ARTE" references remain
- [ ] Metatags.io validation passes

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
