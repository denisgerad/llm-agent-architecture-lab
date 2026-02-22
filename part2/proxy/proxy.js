import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const KEY = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_KEY || process.env.ANTHROPIC;
console.log(`ANTHROPIC key present: ${!!KEY}` + (KEY ? ` (masked: ***${KEY.slice(-6)})` : ''));

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', keyPresent: !!KEY });
});

app.post('/api/claude', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✓ Proxy running at http://localhost:${PORT}`);
  console.log(`  POST http://localhost:${PORT}/api/claude\n`);
});
