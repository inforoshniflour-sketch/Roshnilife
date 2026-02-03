$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

Write-Host "=== COMPREHENSIVE DEPLOYMENT CHECK ===" -ForegroundColor Cyan

# 1. Check project status
Write-Host "`n1. PROJECT STATUS:" -ForegroundColor Yellow
try {
    $project = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/multigrain-nextjs?teamId=sabirs-projects-29265fa2' -Method GET -Headers $headers
    Write-Host "  Name: $($project.name)"
    Write-Host "  Framework: $($project.framework)"
    Write-Host "  Production Domain: $($project.targets.production.alias -join ', ')"
} catch {
    Write-Host "  ERROR: $_" -ForegroundColor Red
}

# 2. Check latest deployments
Write-Host "`n2. LATEST DEPLOYMENTS:" -ForegroundColor Yellow
try {
    $deployments = Invoke-RestMethod -Uri 'https://api.vercel.com/v6/deployments?teamId=sabirs-projects-29265fa2&projectId=multigrain-nextjs&limit=3' -Method GET -Headers $headers
    
    foreach ($dep in $deployments.deployments) {
        Write-Host "`n  Deployment:"
        Write-Host "    URL: https://$($dep.url)"
        Write-Host "    State: $($dep.state)"
        Write-Host "    Ready State: $($dep.readyState)"
        Write-Host "    Target: $($dep.target)"
    }
} catch {
    Write-Host "  ERROR: $_" -ForegroundColor Red
}

# 3. Check domain configuration
Write-Host "`n3. DOMAIN CONFIGURATION:" -ForegroundColor Yellow
try {
    $domains = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method GET -Headers $headers
    
    foreach ($domain in $domains.domains) {
        Write-Host "`n  Domain: $($domain.name)"
        Write-Host "    Verified: $($domain.verified)"
        Write-Host "    Redirect: $($domain.redirect)"
        
        if ($domain.configuredBy) {
            Write-Host "    Configured By: $($domain.configuredBy)"
        }
    }
} catch {
    Write-Host "  ERROR: $_" -ForegroundColor Red
}

# 4. Try to trigger a new deployment
Write-Host "`n4. TRIGGERING NEW DEPLOYMENT:" -ForegroundColor Yellow
try {
    $deployBody = @{
        name = "multigrain-nextjs"
        gitSource = @{
            type = "github"
        }
        target = "production"
    } | ConvertTo-Json
    
    Write-Host "  Attempting to redeploy..." -ForegroundColor Cyan
    # Note: This might fail if we don't have git connected, but let's try
} catch {
    Write-Host "  Skipping redeploy (requires git setup)" -ForegroundColor Yellow
}

Write-Host "`n=== CHECK COMPLETE ===" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Check if deployment state is READY"
Write-Host "2. Verify domains are properly configured"
Write-Host "3. May need to remove and re-add domains"
