# LLM vs Agent Design Demo - Quick Start Guide

## 🚀 Quick Start (Current Session Only)

Just run this script:
```powershell
.\start-demo-servers.ps1
```

This starts:
- ✅ Ollama server with CORS enabled
- ✅ HTTP server on port 8000
- ✅ Opens browser to demo page

**Note:** This setup is temporary and lasts only until you close PowerShell or restart your computer.

---

## 🔒 Permanent Setup (Do Once)

To avoid running the setup every time, make OLLAMA_ORIGINS permanent:

### Option 1: GUI Method (Easiest)

1. Press `Win + R`
2. Type: `sysdm.cpl` and press Enter
3. Click **"Advanced"** tab
4. Click **"Environment Variables"** button
5. Under **"System variables"**, click **"New"**
6. Enter:
   - **Variable name:** `OLLAMA_ORIGINS`
   - **Variable value:** `*`
7. Click **OK** → **OK** → **OK**
8. **Restart Ollama** (or restart computer)

### Option 2: PowerShell (Run as Administrator)

```powershell
[System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "Machine")
```

Then restart Ollama or reboot.

---

## ✅ After Permanent Setup

Once OLLAMA_ORIGINS is set permanently, you only need:

1. **Start Ollama:** `ollama serve` (or it auto-starts)
2. **Start HTTP Server:**
   ```powershell
   python -m http.server 8000
   # or
   npx serve -p 8000
   ```
3. **Open browser:** http://localhost:8000/stage1-llm-vs-agent-design-demo.html

---

## 🔍 Verify Ollama Is Being Used

### Visual Confirmation:
Look for badge at top of output panels:
- 📋 **Mock Data** = Using hardcoded responses
- 🤖 **Ollama Mistral** = Using live AI model

### Console Logs (F12 → Console):
- Mock: `[Mock] Generating mock response...`
- Ollama: `[Ollama] Starting request...`
- Ollama: `[Ollama] Response received in 7.3s`

### Response Time:
- Mock: 1-2 seconds (instant)
- Ollama: 5-15 seconds (real AI inference)

### Variability Test:
Run the demo 3 times:
- Mock = Identical results every time
- Ollama = Different results each time (AI-generated)

---

## 📋 Files

- **stage1-llm-vs-agent-design-demo.html** - Main demo (Stage 1: Design)
- **stage2-planning-eslint.html** - Stage 2: Rules & packages
- **stage25-blueprint.html** - Stage 2.5: File structure blueprint
- **start-demo-servers.ps1** - Startup script
- **README-OLLAMA-SETUP.md** - This file

---

## 🐛 Troubleshooting

### "Failed to fetch" Error
- ✗ Opening HTML file directly (file://) blocks localhost requests
- ✓ Use HTTP server: http://localhost:8000/...

### "Ollama connection failed"
- Check if Ollama is running: `ollama list`
- Start Ollama: `ollama serve`
- Test: http://localhost:11434/api/tags

### Ollama Installed But Command Not Found
- Windows: May need to restart terminal or add to PATH
- Install from: https://ollama.ai

### No Models Available
```powershell
ollama pull mistral
# or
ollama pull mistral:7b-instruct-q4_K_M
```

---

## 🎯 Expected Quality: Ollama vs Mock

| Feature | Mock Data | Ollama (Mistral) |
|---------|-----------|------------------|
| Speed | 1-2s | 5-15s |
| Quality | 100% (Claude-like) | 60-80% |
| Detail | Very detailed | Good but shorter |
| Consistency | Identical always | Varies per run |
| Cost | Free | Free (local) |
| Tradeoffs | Static content | Real AI reasoning |

**Why use Ollama?**
- Test with real AI locally
- No API costs
- Privacy (runs offline)
- Faster iterations than cloud APIs
- Good enough for design/planning tasks

**When to use Mock?**
- Quick demos
- Presentations
- When Ollama isn't set up
- Showing ideal Claude-quality output

---

## 📚 Model Options

Current: **Mistral 7B** (~4GB)

Alternatives you can try:
```powershell
# Larger, better quality (slower)
ollama pull llama2:13b

# Smaller, faster (lower quality)
ollama pull phi

# See all available models
ollama list
```

To change model in HTML, edit line ~650:
```javascript
model: 'mistral',  // Change to 'llama2:13b' or other model
```

---

## 💡 Tips

1. **First run is slow** (10-15s) - model loads into RAM
2. **Subsequent runs are faster** (3-5s) - model stays in memory
3. **Quality varies** - Run 2-3 times and pick the best output
4. **Simpler prompts = better results** - Mistral handles straightforward stacks better
5. **Close other apps** - LLMs use significant RAM (4-8GB)

---

## 🔐 Security Note

Setting `OLLAMA_ORIGINS=*` allows browser requests from any origin. This is fine for local development but avoid on production servers. For production, set specific origins:

```powershell
$env:OLLAMA_ORIGINS="http://yourdomain.com,http://localhost:8000"
```

---

## 📖 Learn More

- Ollama: https://ollama.ai
- Mistral AI: https://mistral.ai
- Model list: https://ollama.ai/library
