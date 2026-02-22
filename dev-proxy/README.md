Local Anthropic proxy (development only)

Usage

1. Copy `.env.example` to `.env` and set your `ANTHROPIC_KEY`.

2. Install dependencies and start the proxy:

```bash
cd dev-proxy
npm install
npm start
```

3. Serve the demo HTML from a local static server (so origin isn't null). From the repo root:

```bash
# using python
python -m http.server 8000

# then open in browser:
# http://localhost:8000/Part%202/part2-module-design-flow.html
```

Notes
- This proxy forwards requests to `https://api.anthropic.com/v1/messages` and injects your API key server-side, avoiding CORS issues and keeping the key out of the browser.
- Do NOT use this in production. Use a secure backend for real deployments.