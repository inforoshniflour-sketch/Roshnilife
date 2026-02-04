$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
}

try {
    $project = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/prj_akHidFlOtuv01oS0GfbQOUFnIqWC' -Headers $headers
    
    if ($project.link) {
        Write-Host "GitHub Repository: $($project.link.type) - $($project.link.repo)" -ForegroundColor Green
        
        $repoUrl = "https://github.com/$($project.link.org)/$($project.link.repo).git"
        Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
        
        # Push code
        Write-Host "`nPushing code to GitHub..." -ForegroundColor Yellow
        git remote remove origin 2>$null
        git remote add origin $repoUrl
        git push -u origin master --force
        
        Write-Host "`n✅ Code pushed! Vercel will auto-deploy to roshnilife.com" -ForegroundColor Green
    } else {
        Write-Host "No GitHub repository connected to this project" -ForegroundColor Red
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
