$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

Write-Host "=== Checking Domain Status ===" -ForegroundColor Cyan

# Get all domains for the project
try {
    $domains = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method GET -Headers $headers
    
    Write-Host "`n✅ Current Domains:" -ForegroundColor Green
    foreach ($domain in $domains.domains) {
        Write-Host "`nDomain: $($domain.name)" -ForegroundColor Yellow
        Write-Host "  Verified: $($domain.verified)"
        
        if ($domain.verified) {
            Write-Host "  Status: ACTIVE" -ForegroundColor Green
        } else {
            Write-Host "  Status: PENDING DNS" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "Error fetching domains: $_" -ForegroundColor Red
}

Write-Host "`n=== Adding www subdomain ===" -ForegroundColor Cyan

# Try to add www subdomain
$body = '{"name":"www.roshnilife.com"}'
try {
    $response = Invoke-RestMethod -Uri 'https://api.vercel.com/v10/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method POST -Headers $headers -Body $body
    Write-Host "Added www.roshnilife.com successfully" -ForegroundColor Green
} catch {
    Write-Host "www.roshnilife.com status: Already exists or error" -ForegroundColor Yellow
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Your website: https://roshnilife.com" -ForegroundColor Green
Write-Host "Dashboard: https://vercel.com/sabirs-projects-29265fa2/multigrain-nextjs" -ForegroundColor Cyan
