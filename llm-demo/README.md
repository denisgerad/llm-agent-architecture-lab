# LLM vs Agent Pipeline — Ollama + Mistral Demo
### Live AI-powered hybrid pipeline

A live AI-powered demo of the full LLM → Agent pipeline, using **Ollama + Mistral locally** for real inference. Mock functions provide the structural outputs; Ollama enriches them with AI-generated reasoning, insights, and agent notes.

---

## ⚙️ Prerequisites

- [Ollama](https://ollama.ai) installed and running
- `mistral:7b-instruct-q4_K_M` model pulled
- Python (for the local HTTP server — required, `file://` blocks `localhost` fetches)

```powershell
# Pull the model if you haven't already
ollama pull mistral:7b-instruct-q4_K_M
```

---

## 🚀 Running

Use the start script from the **parent folder** (`../`):

```powershell
cd ..
.\start-demo-servers.ps1
```

This will:
1. Kill any existing Ollama process
2. Restart Ollama with `OLLAMA_ORIGINS=*` (required for browser CORS)
3. Start a Python HTTP server on port 8000
4. Print all stage URLs

Then open in your browser — **must use the HTTP URL, not `file://`**:

```
http://localhost:8000/llm-demo/stage1-llm-vs-agent-design-demo.html
http://localhost:8000/llm-demo/stage2-planning-eslint.html
http://localhost:8000/llm-demo/stage25-blueprint.html
http://localhost:8000/llm-demo/stage3-developer-discipline.html
```

---

## 📋 Stages

| File | Stage | Mock generates | Ollama enriches |
|---|---|---|---|
| `stage1-llm-vs-agent-design-demo.html` | Stage 1 | — | Full design spec: modules, decisions, tradeoffs |
| `stage2-planning-eslint.html` | Stage 2 | ESLint / Prettier / Stylelint config files | Reasoning per rule + agent brief |
| `stage25-blueprint.html` | Stage 2.5 | Folder tree, file manifest, module mapping | Module insights + agent notes |
| `stage3-developer-discipline.html` | Stage 3 | Developer discipline guide | — |

---

## 🤖 AI Engine Selector

Each stage has a **📋 Mock Data / 🤖 Ollama + Mistral** toggle in the input panel. Switch to Ollama mode before clicking Generate.

### Output Badge States

| Badge | Meaning |
|---|---|
| 🤖 `Ollama Mistral` | Full AI enrichment — Mistral responded and was parsed successfully |
| 🤖 `Ollama Mistral (partial)` | Mistral call failed — fell back to mock output. Check the error shown in the status bar and open DevTools console for details |
| 📋 `Mock Data` | Mock-only mode selected |

---

## 🔧 Troubleshooting

### CORS error / "Failed to fetch"

The page must be served over HTTP, not opened as a file. Use `http://localhost:8000/...`.

### Ollama running but no CORS

If Ollama was already running before the script, it won't have `OLLAMA_ORIGINS=*`. Restart it:

```powershell
Stop-Process -Name "ollama" -Force
$env:OLLAMA_ORIGINS="*"; ollama serve
```

### Model not found / HTTP 404

Confirm the model name exactly matches what `ollama list` shows:

```powershell
ollama list
```

> The code uses `mistral:7b-instruct-q4_K_M`. Update `callOllama()` in each file if you use a different model.

### To make CORS permanent (so any Ollama restart works)

```powershell
# Run as Administrator
[System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "Machine")
```

---

## 🧠 How the Hybrid Approach Works

Rather than asking Mistral to generate code or file paths (which causes JSON parse failures), each stage uses a **hybrid architecture**:

- **Mock layer** → generates all structured outputs (configs, file trees, manifests) — always reliable
- **Ollama layer** → generates **text-only JSON** (reasoning, insights, notes) — no code strings, no file paths

> This avoids the common failure modes where Mistral returns HTML syntax tags, backticks, or JavaScript string concatenation inside JSON values.

For the offline version with no AI dependency, see the `../mock-demo/` folder.
