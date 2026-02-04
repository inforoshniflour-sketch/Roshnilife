$headers = @{
    'Authorization' = 'Bearer mbXaES2p0YkuFfWKV33Xeipf'
    'Content-Type' = 'application/json'
}

$projectId = 'prj_Sg5BR1pIDw8C6zYIKsReBW24fkCL'

Write-Host "Creating deployment hook..." -ForegroundColor Cyan

try {
    # Create a deploy hook
    $hookBody = @{
        'name' = 'github-deploy'
        'ref' = 'main'
    } | ConvertTo-Json
    
    $hook = Invoke-RestMethod -Uri "https://api.vercel.com/v1/integrations/deploy/$projectId" -Method Post -Headers $headers -Body $hookBody
    
    Write-Host "✅ Deploy hook created!" -ForegroundColor Green
    Write-Host "Hook URL: $($hook.url)" -ForegroundColor Yellow
    
    # Trigger the hook
    Write-Host "`nTriggering deployment..." -ForegroundColor Cyan
    $trigger = Invoke-WebRequest -Uri $hook.url -Method Post
    
    Write-Host "✅ Deployment triggered!" -ForegroundColor Green
    Write-Host "`n🎉 Wait 2-3 minutes, then visit https://roshnilife.com" -ForegroundColor Green
    Write-Host "The checkout system will be live!" -ForegroundColor Yellow
    
} catch {
    Write-Host "Hook creation failed, trying direct redeploy..." -ForegroundColor Yellow
    
    try {
        # Get latest deployment
        $deployments = Invoke-RestMethod -Uri "https://api.vercel.com/v6/deployments?projectId=$projectId&limit=1" -Headers $headers
        $latestDeployment = $deployments.deployments[0]
        
        Write-Host "Latest deployment: $($latestDeployment.id)" -ForegroundColor Yellow
        
        # Redeploy it
        $redeploy = Invoke-RestMethod -Uri "https://api.vercel.com/v13/deployments/$($latestDeployment.id)/redeploy" -Method Post -Headers $headers
        
        Write-Host "✅ Redeployment triggered!" -ForegroundColor Green
        Write-Host "New deployment: $($redeploy.id)" -ForegroundColor Yellow
        Write-Host "`n🎉 Wait 2-3 minutes, then visit https://roshnilife.com" -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
}
