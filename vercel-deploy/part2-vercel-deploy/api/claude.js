// api/claude.js
// ─────────────────────────────────────────────────────────────────────────────
// Vercel Serverless Function — Mistral API Proxy
//
// WHY THIS EXISTS:
//   Browsers cannot call the Mistral API directly because:
//   1. CORS: Mistral's API does not allow browser origins
//   2. Security: the API key must never appear in client-side code
//
// HOW IT WORKS:
//   Browser  →  POST /api/claude  →  this function  →  Mistral API
//                                          ↓
//   Browser  ←  JSON response     ←  this function  ←  Mistral API
//
// The API key lives in Vercel's environment variables (MISTRAL_API_KEY).
// It is never sent to the browser.
//
// VERCEL ROUTING:
//   Any file inside /api/ is automatically a serverless function.
//   POST /api/claude → this file. No Express, no server process.
// ─────────────────────────────────────────────────────────────────────────────

//const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
//const ANTHROPIC_VERSION = '2023-06-01';

const MISTRAL_API = 'https://api.mistral.ai/v1/chat/completions';

// Allowed origins — add your Vercel deployment URL here after first deploy
// e.g. 'https://your-project.vercel.app'
const ALLOWED_ORIGINS = [
  'https://module-design-flow.vercel.app',    // ← replace after first deploy
  'http://localhost:3000',             // local dev
  'http://localhost:5500',             // VS Code Live Server
];

export default async function handler(req, res) {

  // ── CORS headers ────────────────────────────────────────────────────────────
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Validate API key is configured ─────────────────────────────────────────
  //const apiKey = process.env.ANTHROPIC_API_KEY;
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    console.error('MISTRAL_API_KEY environment variable is not set');
    return res.status(500).json({
      error: 'Server configuration error: API key not configured. '
           + 'Add MISTRAL_API_KEY in your Vercel project settings.'
    });
  }

  // ── Extract and validate request body ──────────────────────────────────────
  const { model, max_tokens, system, messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array required' });
  }

  // ── Forward to Mistral API ────────────────────────────────────────────────
  try {
    const mistralRes = await fetch(MISTRAL_API, {
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'Authorization':  `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:       model      || 'mistral-large-latest',
        messages,
        max_tokens:  max_tokens || 2000,
        temperature: 0.2,
      }),
    });
    // Forward Mistral's response status and body directly
    const data = await mistralRes.json();

    if (!mistralRes.ok) {
      // Mistral returned an error — forward it with context
      console.error('Mistral API error:', mistralRes.status, data);
      return res.status(mistralRes.status).json({
        error: data.error?.message || 'Mistral API error',
        details: data,
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy fetch error:', err);
    return res.status(500).json({
      error: 'Failed to reach Mistral API',
      details: err.message,
    });
  }
}
