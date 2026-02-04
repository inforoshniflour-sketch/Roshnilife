$headers = @{
    'Authorization' = 'Bearer mbXaES2p0YkuFfWKV33Xeipf'
    'Content-Type' = 'application/json'
}

Write-Host "Finding correct project..." -ForegroundColor Cyan

try {
    # Get all projects
    $projects = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects' -Headers $headers
    
    # Find multigrain-nextjs project
    $project = $projects.projects | Where-Object { $_.name -eq 'multigrain-nextjs' } | Select-Object -First 1
    
    if ($project) {
        Write-Host "✅ Found project: $($project.name)" -ForegroundColor Green
        Write-Host "Project ID: $($project.id)" -ForegroundColor Yellow
        
        # Check if GitHub is already linked
        if ($project.link) {
            Write-Host "GitHub already linked: $($project.link.org)/$($project.link.repo)" -ForegroundColor Yellow
            Write-Host "`nTriggering new deployment..." -ForegroundColor Cyan
        } else {
            Write-Host "No GitHub link found. Connecting..." -ForegroundColor Yellow
            
            # Link GitHub
            $linkBody = @{
                'type' = 'github'
                'repo' = 'inforoshniflour-sketch/Roshnilife'
                'gitBranch' = 'main'
            } | ConvertTo-Json
            
            $link = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/$($project.id)/link" -Method Post -Headers $headers -Body $linkBody
            Write-Host "✅ GitHub connected!" -ForegroundColor Green
        }
        
        # Trigger deployment
        Write-Host "`nTriggering production deployment..." -ForegroundColor Cyan
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
        
        Write-Host "✅ Deployment started!" -ForegroundColor Green
        Write-Host "Deployment ID: $($deploy.id)" -ForegroundColor Yellow
        Write-Host "URL: https://$($deploy.url)" -ForegroundColor Cyan
        Write-Host "`n🎉 Wait 2-3 minutes, then visit https://roshnilife.com" -ForegroundColor Green
        
    } else {
        Write-Host "❌ Project 'multigrain-nextjs' not found" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}
