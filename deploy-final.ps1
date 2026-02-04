$headers = @{
    'Authorization' = 'Bearer mbXaES2p0YkuFfWKV33Xeipf'
    'Content-Type' = 'application/json'
}

Write-Host "Connecting GitHub repository to Vercel project..." -ForegroundColor Cyan

# Connect GitHub repository
$linkBody = @{
    'type' = 'github'
    'repo' = 'inforoshniflour-sketch/Roshnilife'
    'gitBranch' = 'main'
} | ConvertTo-Json

try {
    Write-Host "Linking GitHub repository..." -ForegroundColor Yellow
    $link = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/prj_akHidFlOtuv01oS0GfbQOUFnIqWC/link' -Method Post -Headers $headers -Body $linkBody
    Write-Host "✅ GitHub repository connected!" -ForegroundColor Green
    
    # Trigger deployment
    Write-Host "`nTriggering production deployment..." -ForegroundColor Yellow
    $deployBody = @{
        'name' = 'multigrain-nextjs'
        'gitSource' = @{
            'type' = 'github'
            'repoId' = 'inforoshniflour-sketch/Roshnilife'
            'ref' = 'main'
        }
        'target' = 'production'
    } | ConvertTo-Json -Depth 10
    
    $deploy = Invoke-RestMethod -Uri 'https://api.vercel.com/v13/deployments' -Method Post -Headers $headers -Body $deployBody
    
    Write-Host "✅ Deployment triggered!" -ForegroundColor Green
    Write-Host "Deployment URL: https://$($deploy.url)" -ForegroundColor Cyan
    Write-Host "`nWait 2-3 minutes, then visit: https://roshnilife.com" -ForegroundColor Yellow
    Write-Host "The checkout system will be live!" -ForegroundColor Green
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.ErrorDetails.Message)" -ForegroundColor Red
}
