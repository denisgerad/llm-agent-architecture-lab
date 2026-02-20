# ====================================================
# Start Ollama + HTTP Server for LLM Demo
# ====================================================
# Run this script to start both servers needed for the demo

Write-Host "`n Starting Demo Servers..." -ForegroundColor Cyan
Write-Host "====================================================`n" -ForegroundColor Gray

# 1. Check if Ollama is installed
if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Ollama not found!" -ForegroundColor Red
    Write-Host "   Install from: https://ollama.ai" -ForegroundColor Yellow
    exit 1
}

# 2. Check if OLLAMA_ORIGINS is set permanently
$permanentOrigins = [System.Environment]::GetEnvironmentVariable("OLLAMA_ORIGINS", "Machine")
if ($permanentOrigins) {
    Write-Host "OLLAMA_ORIGINS is set permanently: $permanentOrigins" -ForegroundColor Green
} else {
    Write-Host "WARNING: OLLAMA_ORIGINS not set permanently (temporary session only)" -ForegroundColor Yellow
    Write-Host "  Setting for this session: OLLAMA_ORIGINS=*" -ForegroundColor Cyan
    $env:OLLAMA_ORIGINS = "*"
}

# 3. Kill any existing Ollama processes
Get-Process ollama -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# 4. Start Ollama in a new window
Write-Host "`n[1] Starting Ollama server..." -ForegroundColor White
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:OLLAMA_ORIGINS='*'; ollama serve" -WindowStyle Normal
Start-Sleep -Seconds 4

# 5. Test Ollama connection
Write-Host "[2] Testing Ollama connection..." -ForegroundColor White
try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:11434/api/tags" -Method Get -TimeoutSec 5
    $models = $response.models.name -join ", "
    Write-Host "    Ollama is running" -ForegroundColor Green
    Write-Host "    Available models: $models" -ForegroundColor Cyan
} catch {
    Write-Host "    Ollama connection failed: $_" -ForegroundColor Red
    Write-Host "    Check the Ollama window that just opened" -ForegroundColor Yellow
}

# 6. Start HTTP server
Write-Host "`n[3] Starting HTTP server..." -ForegroundColor White
$currentDir = Get-Location

if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "    Using Python http.server on port 8000" -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentDir'; Write-Host '=======================================' -ForegroundColor Cyan; Write-Host '  Python HTTP Server Running' -ForegroundColor Green; Write-Host '=======================================' -ForegroundColor Cyan; Write-Host '`nServing: $currentDir' -ForegroundColor White; Write-Host 'URL: http://localhost:8000' -ForegroundColor Cyan; Write-Host '`nPress Ctrl+C to stop' -ForegroundColor Yellow; Write-Host '=======================================`n' -ForegroundColor Cyan; python -m http.server 8000"
} elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "    Using Node.js serve on port 8000" -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentDir'; npx serve -p 8000"
} else {
    Write-Host "    ERROR: Neither Python nor Node.js found" -ForegroundColor Red
    Write-Host "    Install Python (python.org) or Node.js (nodejs.org)" -ForegroundColor Yellow
    exit 1
}

Start-Sleep -Seconds 2

# 7. Open browser
Write-Host "`n[4] Opening browser..." -ForegroundColor White
Start-Sleep -Seconds 1
Start-Process "http://localhost:8000"

# 8. Summary
Write-Host "`n====================================================" -ForegroundColor Green
Write-Host "  All servers started successfully!" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
Write-Host "`nServers Running:" -ForegroundColor Cyan
Write-Host "  * Ollama: http://localhost:11434" -ForegroundColor White
Write-Host "  * HTTP Server: http://localhost:8000" -ForegroundColor White
Write-Host "`nStage URLs (open via HTTP server, not file://):" -ForegroundColor Cyan
Write-Host "  * Stage 1:   http://localhost:8000/stage1-llm-vs-agent-design-demo.html" -ForegroundColor Yellow
Write-Host "  * Stage 2:   http://localhost:8000/stage2-planning-eslint.html" -ForegroundColor Yellow
Write-Host "  * Stage 2.5: http://localhost:8000/stage25-blueprint.html" -ForegroundColor Yellow
Write-Host "`nUsage:" -ForegroundColor Cyan
Write-Host "  1. Select model in the browser" -ForegroundColor White
Write-Host "  2. Click 'Run Demo'" -ForegroundColor White
Write-Host "  3. Look for Ollama Mistral badge in output" -ForegroundColor White
Write-Host "`nTo stop servers: Close the PowerShell windows" -ForegroundColor Yellow
Write-Host "To make CORS permanent: See instructions below`n" -ForegroundColor Yellow

Write-Host "====================================================" -ForegroundColor Gray
Write-Host "  To Make OLLAMA_ORIGINS Permanent (Optional)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Gray
Write-Host "`nRun as Administrator, then execute:" -ForegroundColor White
Write-Host '[System.Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "Machine")' -ForegroundColor Cyan
Write-Host "`nOr use GUI: Win+R, type sysdm.cpl, then Advanced, then Environment Variables" -ForegroundColor White
Write-Host "Add System variable: OLLAMA_ORIGINS = *`n" -ForegroundColor Cyan

Read-Host "Press Enter to close this window"
