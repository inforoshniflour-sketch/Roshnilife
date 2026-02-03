$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

Write-Host "=== FIXING DOMAIN CONFIGURATION ===" -ForegroundColor Cyan

# Step 1: Remove existing domains
Write-Host "`n1. Removing existing domains..." -ForegroundColor Yellow

$domainsToRemove = @('roshnilife.com', 'www.roshnilife.com')

foreach ($domain in $domainsToRemove) {
    Write-Host "  Removing: $domain"
    try {
        Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/multigrain-nextjs/domains/$domain`?teamId=sabirs-projects-29265fa2" -Method DELETE -Headers $headers | Out-Null
        Write-Host "    Removed successfully" -ForegroundColor Green
    } catch {
        Write-Host "    Error or already removed: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Step 2: Wait a moment
Write-Host "`n2. Waiting 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Step 3: Re-add domains
Write-Host "`n3. Re-adding domains..." -ForegroundColor Yellow

# Add root domain
Write-Host "  Adding: roshnilife.com"
try {
    $body1 = '{"name":"roshnilife.com"}' 
    $result1 = Invoke-RestMethod -Uri 'https://api.vercel.com/v10/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method POST -Headers $headers -Body $body1
    Write-Host "    Added successfully" -ForegroundColor Green
    Write-Host "    Verified: $($result1.verified)"
} catch {
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Add www subdomain
Write-Host "  Adding: www.roshnilife.com"
try {
    $body2 = '{"name":"www.roshnilife.com"}'
    $result2 = Invoke-RestMethod -Uri 'https://api.vercel.com/v10/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method POST -Headers $headers -Body $body2
    Write-Host "    Added successfully" -ForegroundColor Green
    Write-Host "    Verified: $($result2.verified)"
} catch {
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 4: Check final status
Write-Host "`n4. Checking final domain status..." -ForegroundColor Yellow
try {
    $domains = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method GET -Headers $headers
    
    foreach ($domain in $domains.domains) {
        Write-Host "`n  Domain: $($domain.name)"
        Write-Host "    Verified: $($domain.verified)"
        Write-Host "    Created: $($domain.createdAt)"
    }
} catch {
    Write-Host "  Error: $_" -ForegroundColor Red
}

Write-Host "`n=== DONE ===" -ForegroundColor Green
Write-Host "Domains have been reset. Wait 2-3 minutes and try accessing:" -ForegroundColor Cyan
Write-Host "  https://roshnilife.com"
Write-Host "  https://www.roshnilife.com"
