$headers = @{
    'Authorization' = 'Bearer PTyh2OqwNv5TBCKd5J604Sxz'
    'Content-Type' = 'application/json'
}

Write-Host "=== Checking SSL Certificate Status ===" -ForegroundColor Cyan

# Check domain certificates
try {
    $domains = Invoke-RestMethod -Uri 'https://api.vercel.com/v9/projects/multigrain-nextjs/domains?teamId=sabirs-projects-29265fa2' -Method GET -Headers $headers
    
    foreach ($domain in $domains.domains) {
        Write-Host "`n========================================" -ForegroundColor Yellow
        Write-Host "Domain: $($domain.name)" -ForegroundColor Green
        Write-Host "Verified: $($domain.verified)" -ForegroundColor $(if($domain.verified){'Green'}else{'Red'})
        
        # Check if there's certificate info
        if ($domain.cns) {
            Write-Host "Certificate Names: $($domain.cns -join ', ')" -ForegroundColor Cyan
        }
        
        # Check verification status
        if ($domain.verification) {
            Write-Host "`nVerification Records:" -ForegroundColor Yellow
            foreach ($record in $domain.verification) {
                Write-Host "  Type: $($record.type)"
                Write-Host "  Domain: $($record.domain)"
                Write-Host "  Value: $($record.value)"
                if ($record.reason) {
                    Write-Host "  Reason: $($record.reason)" -ForegroundColor Red
                }
            }
        } else {
            Write-Host "No pending verification - Domain is ready!" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host "`n=== Testing HTTPS Connection ===" -ForegroundColor Cyan

# Test HTTPS connection
$testUrls = @(
    'https://roshnilife.com',
    'https://www.roshnilife.com',
    'https://multigrain-nextjs-zeta.vercel.app'
)

foreach ($url in $testUrls) {
    Write-Host "`nTesting: $url" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri $url -Method HEAD -UseBasicParsing -TimeoutSec 10
        Write-Host "  Status: $($response.StatusCode) - SUCCESS!" -ForegroundColor Green
    } catch {
        Write-Host "  Status: FAILED - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Check complete!" -ForegroundColor Green
