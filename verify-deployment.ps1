$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

Write-Host "=== Checking Vercel Deployment Status ===" -ForegroundColor Cyan

# Check deployment status
try {
    $deployments = Invoke-RestMethod -Uri 'https://api.vercel.com/v6/deployments?teamId=sabirs-projects-29265fa2&projectId=multigrain-nextjs&limit=1' -Method GET -Headers $headers
    
    $latest = $deployments.deployments[0]
    Write-Host "`nLatest Deployment:" -ForegroundColor Green
    Write-Host "  State: $($latest.state)"
    Write-Host "  URL: $($latest.url)"
    Write-Host "  Created: $(Get-Date -UnixTimeSeconds ($latest.created/1000) -Format 'yyyy-MM-dd HH:mm:ss')"
} catch {
    Write-Host "Error checking deployments: $_" -ForegroundColor Red
}

Write-Host "`n=== Checking Domain Configuration ===" -ForegroundColor Cyan

# Check domains
try {
    $domains = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method GET -Headers $headers
    
    foreach ($domain in $domains.domains) {
        Write-Host "`nDomain: $($domain.name)" -ForegroundColor Yellow
        Write-Host "  Verified: $($domain.verified)"
        
        if ($domain.verification) {
            Write-Host "  Verification:" -ForegroundColor Cyan
            foreach ($record in $domain.verification) {
                Write-Host "    Type: $($record.type)"
                Write-Host "    Domain: $($record.domain)"
                Write-Host "    Value: $($record.value)"
                Write-Host "    Reason: $($record.reason)"
            }
        }
    }
} catch {
    Write-Host "Error checking domains: $_" -ForegroundColor Red
}

Write-Host "`n=== Testing Connection ===" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri 'https://multigrain-nextjs-zeta.vercel.app' -Method HEAD -UseBasicParsing
    Write-Host "Vercel URL Status: $($response.StatusCode) OK" -ForegroundColor Green
} catch {
    Write-Host "Vercel URL Error: $_" -ForegroundColor Red
}
