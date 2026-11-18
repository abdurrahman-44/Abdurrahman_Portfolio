$ErrorActionPreference = "Stop"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  THE MAKING OF ABDURRAHMAN - Backend API Server (8005)  " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

$WorkspaceRoot = (Get-Item $PSScriptRoot).Parent.FullName
Set-Location $WorkspaceRoot

# Check local venv first, then shared AUREVON venv
$LocalVenv = Join-Path $WorkspaceRoot "backend\.venv\Scripts\python.exe"
$AurevonVenv = "C:\Users\abdur\OneDrive\Desktop\AUREVON-AI\backend\.venv\Scripts\python.exe"

if (Test-Path $LocalVenv) {
    $PythonExe = $LocalVenv
} elseif (Test-Path $AurevonVenv) {
    $PythonExe = $AurevonVenv
} else {
    $PythonExe = "C:\Users\abdur\.local\bin\python3.14.exe"
}

$env:PYTHONPATH = $WorkspaceRoot
Write-Host "Starting FastAPI backend on http://127.0.0.1:8005..." -ForegroundColor Green
& $PythonExe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8005 --reload
