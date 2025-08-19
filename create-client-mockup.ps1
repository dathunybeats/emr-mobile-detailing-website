# Client Mockup Creator Script
# Usage: .\create-client-mockup.ps1 "client-name" "Client Display Name" "client-email@example.com" "Location" "description"

param(
    [Parameter(Mandatory=$true)]
    [string]$ClientName,
    
    [Parameter(Mandatory=$true)]
    [string]$DisplayName,
    
    [Parameter(Mandatory=$true)]
    [string]$Email,
    
    [Parameter(Mandatory=$true)]
    [string]$Location,
    
    [Parameter(Mandatory=$true)]
    [string]$Description
)

$RepoName = "$ClientName-website"

Write-Host "🚀 Creating mockup for $DisplayName..." -ForegroundColor Cyan

# Step 1: Create new branch from main
Write-Host "📦 Creating branch..." -ForegroundColor Yellow
git checkout main
git pull origin main
git checkout -b "$ClientName-mockup"

# Step 2: Create new GitHub repository
Write-Host "📁 Creating GitHub repository..." -ForegroundColor Yellow
gh repo create $RepoName --public --description "Custom website mockup for $DisplayName - $Description"

# Step 3: Add remote and push
Write-Host "🔗 Setting up repository..." -ForegroundColor Yellow
git remote add "$ClientName-origin" "https://github.com/dathunybeats/$RepoName.git"
git push "$ClientName-origin" "$ClientName-mockup:main"

# Step 4: Clone and deploy
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
Set-Location ..
git clone "https://github.com/dathunybeats/$RepoName.git"
Set-Location $RepoName
vercel --prod

Write-Host "`n✅ SUCCESS! Your client mockup is ready!" -ForegroundColor Green
Write-Host "📧 Repository: https://github.com/dathunybeats/$RepoName" -ForegroundColor Cyan
Write-Host "🌐 Live URL: https://$RepoName.vercel.app" -ForegroundColor Cyan
Write-Host "`n📝 Next steps:" -ForegroundColor White
Write-Host "1. Customize the website for $DisplayName" -ForegroundColor White
Write-Host "2. Update branding, colors, and content" -ForegroundColor White
Write-Host "3. Share the live URL with your client" -ForegroundColor White

# Clean up - return to main template
Set-Location ..\websitefordetailers
git checkout main
