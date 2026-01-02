# Story 1.2: Implement Contact Form Backend

**Epic:** AITELIER-1.0
**Status:** Done
**Priority:** P1 (High)
**Estimated Effort:** 3 hours

---

## Story

**As a** visitor who wants to contact AI.TELIER,
**I want** the contact form to actually send my message,
**so that** I can reach the team and get a response.

---

## Acceptance Criteria

1. Form submission sends email to configured recipient
2. User receives visual feedback (loading state during send)
3. Success message displayed after successful send
4. Error message displayed if send fails
5. Form validates required fields (name, email, message)
6. Email validation (proper format check)
7. Rate limiting to prevent spam (optional but recommended)
8. Works in production environment

---

## Tasks / Subtasks

- [ ] Choose and setup email service (AC: 1, 8)
  - [ ] Option A: Resend (recommended - simple, free tier)
  - [ ] Option B: SendGrid
  - [ ] Option C: Netlify/Vercel serverless function + Nodemailer
  - [ ] Create account and get API key
  - [ ] Add API key to `.env`

- [ ] Create API endpoint for form submission (AC: 1)
  - [ ] Option A (Vite + Serverless): Create `api/contact.ts` for Vercel/Netlify
  - [ ] Option B (External): Create separate API or use email service directly
  - [ ] Implement email sending logic
  - [ ] Return success/error response

- [ ] Update Footer.tsx form handling (AC: 2, 3, 4)
  - [ ] Add form state management (useState or react-hook-form)
  - [ ] Add loading state during submission
  - [ ] Add success toast on successful send
  - [ ] Add error toast on failure
  - [ ] Clear form after successful submission

- [ ] Implement form validation (AC: 5, 6)
  - [ ] Name: required, min 2 characters
  - [ ] Email: required, valid email format
  - [ ] Message: required, min 10 characters
  - [ ] Display validation errors inline

- [ ] Add rate limiting (AC: 7) - Optional
  - [ ] Client-side: disable button after submit for 30s
  - [ ] Server-side: IP-based rate limiting (if using serverless)

- [ ] Test end-to-end (AC: 1, 8)
  - [ ] Test in development
  - [ ] Test in production build
  - [ ] Verify email received

---

## Dev Notes

### Current State (Problem)

```tsx
// Footer.tsx - Line 57
<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
```

The form currently just prevents default - no actual submission logic.

### Recommended Approach: Resend

**Why Resend:**
- Simple API
- Free tier (100 emails/day)
- Works with serverless functions
- Good DX

**Setup Steps:**
1. Create account at resend.com
2. Verify domain or use their test domain
3. Get API key
4. Create API route

### Implementation Architecture

```
User fills form
     ↓
Footer.tsx submits to /api/contact
     ↓
Serverless function (Vercel/Netlify)
     ↓
Resend API sends email
     ↓
Response back to user (success/error)
```

### API Route Example (Vercel)

Create `api/contact.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'AI.TELIER <noreply@aitelier.com.br>',
      to: 'contato@aitelier.com.br',
      subject: `[Site] Nova mensagem de ${name}`,
      html: `
        <h2>Nova mensagem do site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
```

### Footer.tsx Update Example

```tsx
import { useState } from 'react';
import { toast } from 'sonner';

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro de conexao. Verifique sua internet.');
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of component
};
```

### Environment Variables

Add to `.env`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=contato@aitelier.com.br
```

### Relevant Files

```
ai.telier-site/
├── src/
│   └── components/
│       └── Footer.tsx          # MODIFY (form handling)
├── api/
│   └── contact.ts              # CREATE (serverless function)
├── .env                        # ADD (API keys)
└── .env.example                # ADD (template)
```

### Alternative: Formspree/Getform

If serverless is too complex, use a form backend service:
- Formspree: `action="https://formspree.io/f/xxxxx"`
- Getform: `action="https://getform.io/f/xxxxx"`

These require no code changes except adding the action URL.

---

## Testing

### Unit Test (Form Validation)

```typescript
// Test cases
- Empty name: should show error
- Invalid email (no @): should show error
- Empty message: should show error
- Valid data: should submit
```

### Integration Test

1. Fill form with valid data
2. Submit
3. Verify loading state appears
4. Verify success toast
5. Verify email received at inbox
6. Verify form cleared

### Error Test

1. Disconnect network
2. Submit form
3. Verify error toast appears
4. Form data preserved (user can retry)

---

## Definition of Done

- [ ] Email service configured and API key stored
- [ ] API endpoint created and functional
- [ ] Form shows loading state during submission
- [ ] Success toast on successful send
- [ ] Error toast on failure
- [ ] Form validation with inline errors
- [ ] Test email received in inbox
- [ ] Works in production build
- [ ] No console errors

---

## Dependencies

**External:**
- Resend/SendGrid account
- Domain verification (for production)
- Vercel/Netlify for serverless (if using)

**Internal:**
- Sonner toast already installed (verified in package.json)

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
