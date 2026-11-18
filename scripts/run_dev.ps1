$ErrorActionPreference = "Stop"

$BackendScript = Join-Path $PSScriptRoot "run_backend.ps1"
$FrontendScript = Join-Path $PSScriptRoot "run_frontend.ps1"

Write-Host "Launching THE MAKING OF ABDURRAHMAN (Backend + Digital Book Frontend)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", $BackendScript
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-File", $FrontendScript
Write-Host "Both servers launched! Open http://127.0.0.1:5175 in your browser." -ForegroundColor Green
