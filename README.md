# LLM vs Agent Pipeline
### Design → Rules → Blueprint → Execution

A structured demonstration of how modern AI systems should be built:

**LLM for strategic reasoning. Agent for operational execution.**

This repository shows the full lifecycle of AI-assisted software development — from architecture design to rule generation to execution discipline — using both deterministic mocks and live local inference.

---

## 🚀 What This Project Demonstrates

It models a clean pipeline:

| Stage | Role | Mode |
|-------|------|------|
| Stage 1 | Design | LLM |
| Stage 2 | Rule Translation | LLM |
| Stage 2.5 | Blueprint & Execution Package | LLM |
| Stage 3 | Developer Discipline | Agent Constraints |

Each stage feeds into the next.

This repository demonstrates how to separate them correctly.

---

## 🧠 Core Philosophy

| Symbol | Role |
|--------|------|
| LLM | Strategic Brain |
| Agent | Operational Executor |
| Mock | Deterministic Blueprint |
| Live | Probabilistic Intelligence Layer |

---

## 🔄 The Pipeline Architecture

### Stage 1 — Design (LLM)

Produces:
- Project overview
- Modules
- Tech decisions
- Tradeoffs
- Architecture notes

> This is strategic reasoning.

### Stage 2 — Rules (LLM)

Translates design decisions into:
- ESLint config
- Prettier config
- Stylelint config
- Agent brief per rule

> This demonstrates decision-to-policy translation.

### Stage 2.5 — Blueprint (LLM)

Produces:
- Folder tree
- File manifest
- Module mapping
- `agent-execution-package.json`

> This is the handoff artifact for execution.

### Stage 3 — Developer Discipline

Defines:
- Rules the scaffolding agent must follow
- Structural constraints
- Zero-assumption development policy

> This is where execution becomes controlled.

---

## 📁 Repository Structure

```
/
├── README.md               ← Master documentation (this file)
├── mock-demo/              ← Fully deterministic offline pipeline
├── llm-demo/               ← Live Ollama + Mistral hybrid pipeline
└── start-demo-servers.ps1  ← Helper script for local live demo
```

## 📋 1️⃣ Mock Demo (Deterministic Mode)

**Location:** `/mock-demo`

### Purpose

A fully offline, self-contained pipeline:
- No API keys
- No AI server
- No network required
- Fully deterministic outputs
- Ideal for presentations and screenshots

### Why It Exists

- Instant and predictable
- Shows the architecture clearly
- Demonstrates stage hand-offs
- Makes pipeline reasoning inspectable
- Avoids probabilistic variability

> This is your controlled lab environment.



## 🤖 2️⃣ Ollama + Mistral Demo (Live Mode)

**Location:** `/llm-demo`

### Purpose

A hybrid AI integration demo using:
- Ollama (local runtime)
- Mistral 7B instruct model
- Browser-based inference via localhost
- Structured mock outputs + AI reasoning enrichment

### Why Hybrid?

Smaller local models struggle with:
- Strict JSON formatting
- File path generation
- Structured config outputs
- Embedded syntax inside JSON

So this architecture separates:
- **Mock layer** → generates all structured artifacts (configs, file trees, manifests)
- **Ollama layer** → generates reasoning, insights, tradeoff explanations

> This prevents common local LLM failure modes.



## 🧩 Part 2 — Local Demo & Anthropic Proxy

This repository includes a small local demo under `part2/` that calls the
Anthropic API from browser pages. To avoid browser CORS and to keep your API
key out of the frontend, a tiny Express proxy is provided at `part2/proxy`.

### Files

| File | API calls | Purpose |
|------|-----------|---------|
| `part2/part2-module-design-flow.html` | Yes — Claude via proxy | Interactive 5-step LLM→Agent→LLM module design flow |
| `part2/part2-developer-discipline.html` | No — static | Developer discipline reference guide (tabs: Before / During / Anti-Patterns / Quick Reference / Consequences) |
| `part2/part2-developer-discipline.html` | No — static | Developer discipline reference guide (tabs: Before / During / Anti-Patterns / Quick Reference / Consequences) |
| `part2/proxy/proxy.js` | — | Express proxy that injects the Anthropic API key and forwards to `api.anthropic.com` |

---

### Consequences Tab

Shows what happens when **Step 4 stays as LLM (correct)** vs **Step 4 is replaced by an Agent (broken)** — run in parallel so both outputs appear simultaneously.

| Panel | What it produces |
|-------|-----------------|
| **LLM Final Design** (left) | Correct design — extracts shared hooks before Admin uses them, creates `types/` folder, builds `AuthGuard` from blueprint spec |

After both panels populate, the tab also renders:

| Section | Content |
|---------|---------|
| **Step 5 — Execution Packages** | Side-by-side: LLM shows Part A remediation → Part B build; Agent shows no Part A with a red blocker warning |
| **Comparison table** | 8-row metric table — Remediation phase, AuthGuard, Shared hooks, Types folder, Files created, Blueprint fidelity, Tech debt added, Estimated extra debug cycles. LLM column green, Agent column red |
| **LLM Verdict** | Third Claude call — the LLM that produced the correct output analyses the agent's output and writes a second-person verdict to the developer naming specific files and explaining why each agent decision fails in production |

---

*Note:* The interactive demo file `part2/part2-developer-discipline-agent.html` (live Consequences + Agent demo) has been removed. Use `part2/part2-developer-discipline.html` for the static Developer Discipline guide, or `part2/part2-module-design-flow.html` for the live module flow demo.

---

### Quick start

1. Install and start the proxy (run from the `part2` folder):

```powershell
cd D:\projects\llm\part2
npm install
copy .env.example .env   # or: Copy-Item .env.example .env
npm start
```

2. Serve the site so the browser origin is not `null` (run from repo root):

```powershell
cd D:\projects\llm
python -m http.server 8000
```

3. Open a demo in your browser:

```
http://localhost:8000/part2/part2-module-design-flow.html
http://localhost:8000/part2/part2-developer-discipline.html
```

> **Notes:**
> - Keep your real API key out of source control. The repo contains `part2/.env.example` (placeholder) and `.gitignore` ignores `.env`, `node_modules`, and `my-docs/`.
> - `part2-developer-discipline.html` contains the Developer Discipline guide (static) and the Consequences content. The interactive Agent demo was removed from the repository.
> - If you do not set an API key, pages that rely on the Anthropic API will receive upstream errors. `part2-developer-discipline.html` runs without a key.




















