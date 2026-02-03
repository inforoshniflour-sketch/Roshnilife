$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

# Add root domain
$body1 = '{"name":"roshnilife.com"}'
try {
    $response1 = Invoke-RestMethod -Uri 'https://api.vercel.com/v10/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method POST -Headers $headers -Body $body1
    Write-Host "✅ Added roshnilife.com successfully"
    $response1 | ConvertTo-Json
} catch {
    Write-Host "❌ Error adding roshnilife.com: $_"
}

# Add www subdomain
$body2 = '{"name":"www.roshnilife.com"}'
try {
    $response2 = Invoke-RestMethod -Uri 'https://api.vercel.com/v10/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method POST -Headers $headers -Body $body2
    Write-Host "✅ Added www.roshnilife.com successfully"
    $response2 | ConvertTo-Json
} catch {
    Write-Host "❌ Error adding www.roshnilife.com: $_"
}
