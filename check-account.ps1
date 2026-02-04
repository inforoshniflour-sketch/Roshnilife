$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
}

Write-Host "Checking account information..." -ForegroundColor Cyan

try {
    # Get user info
    $user = Invoke-RestMethod -Uri 'https://api.vercel.com/v2/user' -Headers $headers
    Write-Host "`n✅ Token belongs to:" -ForegroundColor Green
    Write-Host "Email: $($user.email)" -ForegroundColor Yellow
    Write-Host "Username: $($user.username)" -ForegroundColor Yellow
    Write-Host "Name: $($user.name)" -ForegroundColor Yellow
    
    # Get teams
    Write-Host "`nChecking teams..." -ForegroundColor Cyan
    $teams = Invoke-RestMethod -Uri 'https://api.vercel.com/v2/teams' -Headers $headers
    
    Write-Host "`nAvailable teams:" -ForegroundColor Green
    foreach ($team in $teams.teams) {
        Write-Host "- Team: $($team.name) (ID: $($team.id))" -ForegroundColor Yellow
    }
    
    # Get projects
    Write-Host "`nChecking projects..." -ForegroundColor Cyan
    $projects = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects' -Headers $headers
    
    Write-Host "`nYour projects:" -ForegroundColor Green
    foreach ($project in $projects.projects) {
        Write-Host "- $($project.name) (ID: $($project.id))" -ForegroundColor Yellow
        if ($project.link) {
            Write-Host "  GitHub: $($project.link.org)/$($project.link.repo)" -ForegroundColor Gray
        }
    }
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
