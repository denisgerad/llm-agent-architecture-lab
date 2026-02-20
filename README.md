LLM vs Agent Pipeline
Design → Rules → Blueprint → Execution

A structured demonstration of how modern AI systems should be built:

LLM for strategic reasoning. Agent for operational execution.

This repository shows the full lifecycle of AI-assisted software development — from architecture design to rule generation to execution discipline — using both deterministic mocks and live local inference.

🚀 What This Project Demonstrates

It models a clean pipeline:
Stage 1  →  Design (LLM)
Stage 2  →  Rule Translation (LLM)
Stage 2.5 → Blueprint & Execution Package (LLM)
Stage 3  →  Developer Discipline (Agent Constraints)

Each stage feeds into the next.

🧠 Core Philosophy
LLM  = Strategic Brain
Agent = Operational Executor
Mock  = Deterministic Blueprint
Live  = Probabilistic Intelligence Layer

This repository demonstrates how to separate them correctly.

📁 Repository Structure
/
├── README.md               ← Master documentation (this file)
├── mock-demo/              ← Fully deterministic offline pipeline
├── llm-demo/               ← Live Ollama + Mistral hybrid pipeline
└── start-demo-servers.ps1  ← Helper script for local live demo
📋 1️⃣ Mock Demo (Deterministic Mode)

Location:
/mock-demo

Purpose
A fully offline, self-contained pipeline.
No API keys
No AI server
No network required
Fully deterministic outputs
Ideal for presentations and screenshots

Why It Exists
Instant and predictable
Shows the architecture clearly
Demonstrates stage hand-offs
Makes pipeline reasoning inspectable
Avoids probabilistic variability
This is your controlled lab environment.

🤖 2️⃣ Ollama + Mistral Demo (Live Mode)

Location:
/llm-demo
Purpose

A hybrid AI integration demo using:
Ollama (local runtime)
Mistral 7B instruct model
Browser-based inference via localhost
Structured mock outputs + AI reasoning enrichment

Why Hybrid?
Smaller local models struggle with:
Strict JSON formatting
File path generation
Structured config outputs
Embedded syntax inside JSON

So this architecture separates:
Mock layer → generates all structured artifacts (configs, file trees, manifests)
Ollama layer → generates reasoning, insights, tradeoff explanations
This prevents common local LLM failure modes.

🔄 The Pipeline Architecture
Stage 1 — Design (LLM)

Produces:
Project overview
Modules
Tech decisions
Tradeoffs
Architecture notes
This is strategic reasoning.

Stage 2 — Rules (LLM)

Translates design decisions into:
ESLint config
Prettier config
Stylelint config
Agent brief per rule

This demonstrates decision-to-policy translation.

Stage 2.5 — Blueprint (LLM)

Produces:
Folder tree
File manifest
Module mapping
agent-execution-package.json

This is the handoff artifact for execution.

Stage 3 — Developer Discipline

Defines:
Rules the scaffolding agent must follow
Structural constraints
Zero-assumption development policy
This is where execution becomes controlled.

















