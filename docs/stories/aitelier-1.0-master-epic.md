# Epic AITELIER-1.0: Production Readiness Fixes

**Project:** ai.telier-site
**Status:** Active
**Priority:** P1 (High)
**Created:** 2025-12-27
**Owner:** PO (Pax)

---

## Epic Vision

Prepare ai.telier-site for production deployment by fixing all identified issues that impact user experience, functionality, and SEO.

---

## Context

The ai.telier-site is a React + Vite + Tailwind marketing website at ~75% completion. Frontend design is excellent (brutalist/cyberpunk aesthetic), but several issues need resolution before production deployment.

### Current State
- **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Pages:** Landing (complete), Journal (complete), 404 (incomplete)
- **Design System:** "Brutalismo Poetico" - black/green matrix aesthetic

### Issues Identified
1. **404 page unstyled** - Generic gray styling breaks brand consistency
2. **Contact form no backend** - Form exists but doesn't send emails
3. **SEO meta tags outdated** - HTML title shows "BRUTAL ARTE" instead of "AI.TELIER"
4. **Dynamic Tailwind classes broken** - Template literals don't work with Tailwind

---

## Stories

| ID | Story | Priority | Effort | Status |
|----|-------|----------|--------|--------|
| 1.1 | Style 404 NotFound Page | P1 | 1h | Draft |
| 1.2 | Implement Contact Form Backend | P1 | 3h | Draft |
| 1.3 | Fix SEO Meta Tags | P0 | 30min | Draft |
| 1.4 | Fix Dynamic Tailwind Classes | P2 | 2h | Draft |

---

## Acceptance Criteria (Epic Level)

1. All pages maintain consistent brutalist design (black bg, matrix-green accents)
2. Contact form successfully sends emails to configured recipient
3. Browser tab and search engines show correct "AI.TELIER" branding
4. All dynamic color classes render correctly
5. Site passes Lighthouse accessibility score >= 90
6. No console errors in production build

---

## Dependencies

**Technical:**
- Email service account (Resend, SendGrid, or similar)
- Environment variables for API keys

**None blocking start:**
- Stories 1.1, 1.3, 1.4 can start immediately
- Story 1.2 requires email service setup

---

## Success Metrics

- [ ] 404 page matches design system (visual review)
- [ ] Contact form delivers test email within 30 seconds
- [ ] Google search shows correct site title
- [ ] Zero Tailwind class warnings in console
- [ ] Production build succeeds without errors

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-12-27 | 1.0 | Epic created from site review | Pax (@po) |
