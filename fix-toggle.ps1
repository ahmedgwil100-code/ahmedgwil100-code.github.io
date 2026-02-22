$files = @('age-calculator', 'bmi-calculator', 'percentage-calculator', 'loan-calculator', 'word-counter', 'password-generator', 'unit-converter', 'gpa-calculator', 'random-number-generator', 'qr-code-generator')
foreach ($f in $files) {
    $path = "c:\tool-website\tools\$f.html"
    $content = Get-Content $path -Raw
    
    # Check if themeToggle is already present
    if ($content -match 'themeToggle') {
        Write-Host "Skipping (already has toggle): $f"
        continue
    }
    
    # Replace the closing </div> after Contact link with theme toggle + </div>
    $content = $content -replace '(Contact</a>)(</div>)', '$1<button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">🌙</button>$2'
    
    Set-Content $path $content -NoNewline
    Write-Host "Updated: $f"
}
