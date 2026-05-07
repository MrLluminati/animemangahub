param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("start", "validate", "postmerge", "tag", "status")]
    [string]$Action,

    [string]$BranchName,
    [string]$TagName,
    [string]$TagMessage,
    [switch]$SkipRemoteDelete
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

function Go-Root {
    Set-Location $RepoRoot
}

function Invoke-CommandStep {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Label,

        [Parameter(Mandatory = $true)]
        [scriptblock]$Command
    )

    Write-Host ""
    Write-Host "==> $Label" -ForegroundColor Cyan
    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "Step failed: $Label"
    }
}

function Assert-GitAvailable {
    Invoke-CommandStep "Check Git" { git --version }
}

function Assert-CleanTree {
    Go-Root
    $status = git status --porcelain
    if ($status) {
        Write-Host "Working tree is not clean:" -ForegroundColor Red
        git status
        throw "Refusing to continue with uncommitted changes."
    }
}

function Assert-CleanMain {
    Go-Root
    Assert-GitAvailable
    Invoke-CommandStep "Switch to main" { git checkout main }
    Invoke-CommandStep "Pull latest main" { git pull origin main }
    Assert-CleanTree
    Write-Host "main is clean and up to date." -ForegroundColor Green
}

function Ensure-BackendEnvForLocalSqlite {
    $backendDir = Join-Path $RepoRoot "backend"
    $envPath = Join-Path $backendDir ".env"

    if (!(Test-Path $envPath)) {
        Write-Host "Creating backend/.env for local SQLite development." -ForegroundColor Yellow
        Set-Content -Path $envPath -Value 'DATABASE_URL="file:./dev.db"' -Encoding UTF8
        return
    }

    $envContent = Get-Content $envPath -Raw

    if ($envContent -notmatch "DATABASE_URL=") {
        $envContent = "DATABASE_URL=`"file:./dev.db`"`r`n" + $envContent
        Set-Content -Path $envPath -Value $envContent -Encoding UTF8
        Write-Host "Added SQLite DATABASE_URL to backend/.env." -ForegroundColor Yellow
        return
    }

    if ($envContent -notmatch 'DATABASE_URL="?file:') {
        Write-Host "backend/.env DATABASE_URL is not SQLite. Updating it for local validation." -ForegroundColor Yellow
        $envContent = $envContent -replace 'DATABASE_URL=.*', 'DATABASE_URL="file:./dev.db"'
        Set-Content -Path $envPath -Value $envContent -Encoding UTF8
    }
}

function Start-Branch {
    if (-not $BranchName) {
        throw "BranchName is required for start action."
    }

    Assert-CleanMain
    Invoke-CommandStep "Create branch $BranchName" { git checkout -b $BranchName }
    git status
    Write-Host "Started branch: $BranchName" -ForegroundColor Green
}

function Validate-Project {
    Go-Root
    Ensure-BackendEnvForLocalSqlite

    Invoke-CommandStep "Prisma validate" {
        Set-Location (Join-Path $RepoRoot "backend")
        npx prisma validate
    }

    Invoke-CommandStep "Prisma generate" {
        Set-Location (Join-Path $RepoRoot "backend")
        npx prisma generate
    }

    Invoke-CommandStep "Prisma migrate deploy" {
        Set-Location (Join-Path $RepoRoot "backend")
        npx prisma migrate deploy
    }

    Invoke-CommandStep "Backend type-check" {
        Set-Location (Join-Path $RepoRoot "backend")
        npm run type-check
    }

    Invoke-CommandStep "Frontend lint" {
        Set-Location (Join-Path $RepoRoot "frontend")
        npm run lint
    }

    Invoke-CommandStep "Frontend type-check" {
        Set-Location (Join-Path $RepoRoot "frontend")
        npm run type-check
    }

    Go-Root
    git status
    git diff --stat
    Write-Host "Validation passed." -ForegroundColor Green
}

function Post-Merge-Cleanup {
    if (-not $BranchName) {
        throw "BranchName is required for postmerge action."
    }

    Go-Root
    Invoke-CommandStep "Switch to main" { git checkout main }
    Invoke-CommandStep "Pull latest main" { git pull origin main }

    $localBranches = git branch --format "%(refname:short)"
    if ($localBranches -contains $BranchName) {
        Invoke-CommandStep "Delete local branch $BranchName" { git branch -d $BranchName }
    }
    else {
        Write-Host "Local branch not found: $BranchName" -ForegroundColor Yellow
    }

    if (-not $SkipRemoteDelete) {
        Invoke-CommandStep "Delete remote branch $BranchName" { git push origin --delete $BranchName }
    }

    git status
    Write-Host "Post-merge cleanup completed." -ForegroundColor Green
}

function Create-BetaTag {
    if (-not $TagName) {
        throw "TagName is required for tag action."
    }

    if (-not $TagMessage) {
        throw "TagMessage is required for tag action."
    }

    Assert-CleanMain

    $existingTags = git tag
    if ($existingTags -contains $TagName) {
        throw "Tag already exists locally: $TagName"
    }

    Invoke-CommandStep "Create tag $TagName" { git tag -a $TagName -m $TagMessage }
    Invoke-CommandStep "Push tag $TagName" { git push origin $TagName }

    git status
    git tag
    git ls-remote --tags origin
    Write-Host "Created and pushed tag: $TagName" -ForegroundColor Green
}

function Show-ProjectStatus {
    Go-Root
    git status
    Write-Host ""
    Write-Host "Branches:" -ForegroundColor Cyan
    git branch
    Write-Host ""
    Write-Host "Tags:" -ForegroundColor Cyan
    git tag
}

switch ($Action) {
    "start" { Start-Branch }
    "validate" { Validate-Project }
    "postmerge" { Post-Merge-Cleanup }
    "tag" { Create-BetaTag }
    "status" { Show-ProjectStatus }
}
