cd "D:\Coding\Repos\animemangahub\anime-manga-hub"

$settingsPath = ".\.claude\settings.local.json"

if (!(Test-Path $settingsPath)) {
    Write-Host "Missing .claude/settings.local.json" -ForegroundColor Red
    exit 1
}

$settings = Get-Content $settingsPath -Raw | ConvertFrom-Json

foreach ($property in $settings.env.PSObject.Properties) {
    [Environment]::SetEnvironmentVariable($property.Name, [string]$property.Value, "Process")
}

$env:ANTHROPIC_API_KEY = ""

claude