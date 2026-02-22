require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY || process.env.ANTHROPIC || process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_KEY) console.warn('Warning: ANTHROPIC_KEY not set. Set it in .env or the environment.');

app.options('/anthropic', (req, res) => res.sendStatus(204));

// Health endpoint for quick checks
app.get('/health', (req, res) => {
  res.json({ status: 'ok', keyPresent: !!ANTHROPIC_KEY });
});

app.post('/anthropic', async (req, res) => {
  try {
    const r = await fetch('http://localhost:3000/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ANTHROPIC_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const text = await r.text();
    res.status(r.status);
    const ctype = r.headers.get('content-type') || 'application/json';
    res.set('Content-Type', ctype);
    res.send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'proxy_error', message: err.message });
  }
});

const port = process.env.PORT || 3000;
const masked = ANTHROPIC_KEY ? ("***" + ANTHROPIC_KEY.slice(-6)) : null;
console.log(`ANTHROPIC_KEY present: ${!!ANTHROPIC_KEY}` + (masked ? ` (masked ${masked})` : ''));
app.listen(port, () => console.log(`Anthropic proxy listening on http://localhost:${port}`));
