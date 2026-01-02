import type { VercelRequest, VercelResponse } from '@vercel/node';

// Contact form API endpoint for Vercel serverless functions
// Supports Resend (recommended) or fallback to console logging for development

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email invalido' });
    }

    if (!message || message.length < 10) {
      return res.status(400).json({ error: 'Mensagem deve ter pelo menos 10 caracteres' });
    }

    // Check if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'contato@aitelier.com.br';

    if (resendApiKey) {
      // Send via Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AI.TELIER Site <noreply@aitelier.com.br>',
          to: contactEmail,
          subject: `[Site] Nova mensagem de ${name}`,
          html: `
            <h2>Nova mensagem do site AI.TELIER</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Enviado via formulario de contato do site
            </p>
          `,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend error:', errorData);
        return res.status(500).json({ error: 'Erro ao enviar email' });
      }

      return res.status(200).json({ success: true, message: 'Email enviado com sucesso' });
    }

    // Development fallback - log to console
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('===================================');

    // In development without Resend, still return success
    return res.status(200).json({
      success: true,
      message: 'Mensagem recebida (dev mode - check server logs)',
      dev: true,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
