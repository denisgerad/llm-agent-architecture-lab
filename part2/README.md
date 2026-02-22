# Anthropic API Proxy

Fixes the CORS error when running HTML demos locally.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your API key to .env
#    Open .env and replace: your_api_key_here

# 3. Start the proxy
npm start
```

Proxy runs at: `http://localhost:3000`

## Quick Install & Run (new users)

Follow these steps to run the proxy locally and serve the demo HTML:

1. Install and start the proxy (from the `part2` folder):

```powershell
cd D:\projects\llm\part2
npm install
# create .env from the example and edit the key if you have one:
copy .env.example .env
# or on PowerShell: Copy-Item .env.example .env
npm start
```

2. Serve the static site (from the repo root) so the browser origin is not `null`:

```powershell
cd D:\projects\llm
python -m http.server 8000
```

3. Open the demo in your browser:

```
http://localhost:8000/part2/part2-module-design-flow.html
```

Notes:
- If you do not set an API key in `.env`, pages that call the Anthropic API will receive upstream errors; `part2-developer-discipline.html` contains no API calls and runs without a key.
- Keep your real API key out of source control. Use `.env.example` to share the variable name.
- If you prefer to run the proxy from inside the `proxy` folder, you can `cd proxy` and run `npm install` there, but this repo's `package.json` in `part2` already contains the start script.

---

## Update Your HTML Demo Files

Find and replace this one line in **each** HTML file:

```javascript
// BEFORE — causes CORS error
fetch("https://api.anthropic.com/v1/messages", {

// AFTER — routes through local proxy
fetch("http://localhost:3000/api/claude", {
```

### Files to update:

| File | Occurrences |
|------|-------------|
| `llm-vs-agent-design-demo.html`  | 1 |
| `stage2-planning-eslint.html`    | 1 |
| `stage25-blueprint.html`         | 1 |
| `stage3-developer-discipline.html` | 1 |
| `part2-module-design-flow.html`  | 3 |

> **Tip:** Use VS Code Find & Replace across files:
> `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac)
> Search: `https://api.anthropic.com/v1/messages`
> Replace: `http://localhost:3000/api/claude`

---

## How It Works

```
Browser (HTML file)
      │
      │ POST /api/claude
      ▼
Express proxy (localhost:3000)
      │
      │ Adds API key from .env
      │ POST /v1/messages
      ▼
Anthropic API
      │
      ▼
Response back to browser
```

The API key stays in `.env` on your machine — never in the browser.

---

## Verify It's Working

With the proxy running, open your browser console. You should see:

```
POST http://localhost:3000/api/claude  200 OK
```

Instead of the previous CORS error.
