$ErrorActionPreference = "Stop"

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  THE MAKING OF ABDURRAHMAN - Digital Book UI (5175)     " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan

$WorkspaceRoot = (Get-Item $PSScriptRoot).Parent.FullName
$FrontendDir = Join-Path $WorkspaceRoot "frontend"
Set-Location $FrontendDir

$NodeDir = "C:\Users\abdur\Downloads\NodeJs"
if (Test-Path $NodeDir) {
    $env:PATH = $NodeDir + ";" + $env:PATH
}

$NodeCmd = Get-Command node -ErrorAction SilentlyContinue
if ($NodeCmd) {
    $NodeExe = $NodeCmd.Source
} else {
    $NodeExe = "C:\Users\abdur\Downloads\NodeJs\node.exe"
}

Write-Host "Starting Vite React Digital Book on http://127.0.0.1:5175..." -ForegroundColor Green
& $NodeExe ./node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5175
