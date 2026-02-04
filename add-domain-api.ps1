$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

$body = @{
    'name' = 'roshnilife.com'
} | ConvertTo-Json

Write-Host "Adding roshnilife.com to Vercel project..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri 'https://api.vercel.com/v10/projects/prj_akHidFlOtuv01oS0GfbQOUFnIqWC/domains' -Method Post -Headers $headers -Body $body
    Write-Host "✅ Domain added successfully!" -ForegroundColor Green
    Write-Host "Domain: roshnilife.com" -ForegroundColor Yellow
    Write-Host "Status: $($response.verified)" -ForegroundColor Yellow
    Write-Host "`nWait 2-3 minutes for DNS propagation, then visit https://roshnilife.com" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    
    # Try the other project
    Write-Host "`nTrying alternative project..." -ForegroundColor Yellow
    try {
        # Get the correct project ID from the working deployment
        $projects = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects' -Headers $headers
        $targetProject = $projects.projects | Where-Object { $_.name -eq 'multigrain-nextjs' } | Select-Object -First 1
        
        if ($targetProject) {
            Write-Host "Found project: $($targetProject.id)" -ForegroundColor Green
            $response = Invoke-RestMethod -Uri "https://api.vercel.com/v10/projects/$($targetProject.id)/domains" -Method Post -Headers $headers -Body $body
            Write-Host "✅ Domain added successfully!" -ForegroundColor Green
            Write-Host "Domain: roshnilife.com" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ Also failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}
