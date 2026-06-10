param(
  [string]$Message = "Update project"
)

$ErrorActionPreference = "Stop"

Write-Host "Checking git repository..."

if (-not (Test-Path ".git")) {
  Write-Host "Error: This folder is not a git repository."
  exit 1
}

Write-Host "Adding changes..."
git add -A
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "No staged changes to commit."
} else {
  Write-Host "Committing changes..."
  git commit -m $Message
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "Fetching remote..."
git fetch origin main
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Rebasing latest remote changes..."
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host "Error: Rebase failed. If there is a conflict, resolve it manually, then run git rebase --continue or git rebase --abort."
  exit $LASTEXITCODE
}

Write-Host "Pushing to GitHub..."
git push origin main
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Done."
