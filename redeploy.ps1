$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

$body = @{
    'name' = 'multigrain-nextjs'
    'gitSource' = @{
        'type' = 'github'
        'repoId' = 'multigrain-nextjs'
    }
    'target' = 'production'
} | ConvertTo-Json

Write-Host "Triggering deployment to roshnilife.com..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'https://api.vercel.com/v13/deployments' -Method Post -Headers $headers -Body $body
    Write-Host "✅ Deployment triggered successfully!" -ForegroundColor Green
    Write-Host "Deployment URL: $($response.url)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
}
