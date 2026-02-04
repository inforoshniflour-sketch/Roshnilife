# Quick Deployment Script for roshnilife.com

Write-Host "🚀 Deploying Checkout System to roshnilife.com" -ForegroundColor Green
Write-Host ""

# Step 1: Check if we're in the right directory
$currentDir = Get-Location
if ($currentDir.Path -notlike "*multigrain-nextjs*") {
    Write-Host "❌ Please run this script from d:\multigrain\multigrain-nextjs" -ForegroundColor Red
    exit 1
}

Write-Host "✅ In correct directory" -ForegroundColor Green

# Step 2: Check git status
Write-Host ""
Write-Host "📋 Checking Git status..." -ForegroundColor Cyan
git status

# Step 3: Ask for GitHub repository URL
Write-Host ""
Write-Host "🔗 Please provide your GitHub repository URL" -ForegroundColor Yellow
Write-Host "   (Go to https://vercel.com/sabirs-projects-29265fa2/multigrain-nextjs/settings/git to find it)" -ForegroundColor Gray
Write-Host ""
$repoUrl = Read-Host "Enter GitHub repository URL (e.g., https://github.com/username/multigrain-nextjs.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ No repository URL provided" -ForegroundColor Red
    exit 1
}

# Step 4: Check if remote exists
Write-Host ""
Write-Host "🔍 Checking Git remote..." -ForegroundColor Cyan
$remotes = git remote -v

if ($remotes -match "origin") {
    Write-Host "⚠️  Remote 'origin' already exists. Removing it..." -ForegroundColor Yellow
    git remote remove origin
}

# Step 5: Add new remote
Write-Host ""
Write-Host "➕ Adding GitHub remote..." -ForegroundColor Cyan
git remote add origin $repoUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote added successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to add remote" -ForegroundColor Red
    exit 1
}

# Step 6: Push to GitHub
Write-Host ""
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Cyan
Write-Host "   This will trigger automatic deployment on Vercel" -ForegroundColor Gray
Write-Host ""

git push -u origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Code pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Deployment Started!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to https://vercel.com/sabirs-projects-29265fa2/multigrain-nextjs" -ForegroundColor White
    Write-Host "   2. Click 'Deployments' tab" -ForegroundColor White
    Write-Host "   3. Wait 2-3 minutes for build to complete" -ForegroundColor White
    Write-Host "   4. Go to https://roshnilife.com" -ForegroundColor White
    Write-Host "   5. Clear cache (Ctrl + Shift + R)" -ForegroundColor White
    Write-Host "   6. Test the checkout system!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Push failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Possible solutions:" -ForegroundColor Yellow
    Write-Host "   - Check if the repository URL is correct" -ForegroundColor White
    Write-Host "   - Make sure you have access to the repository" -ForegroundColor White
    Write-Host "   - Try: git push -u origin main (if main branch)" -ForegroundColor White
    Write-Host ""
}
