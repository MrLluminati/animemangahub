param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("start", "validate", "postmerge", "tag", "status", "verify")]
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

function Test-LocalBranchExists {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Go-Root
    git show-ref --verify --quiet "refs/heads/$Name"
    return ($LASTEXITCODE -eq 0)
}

function Test-RemoteBranchExists {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Go-Root
    $remoteBranch = git ls-remote --heads origin $Name

    if ($LASTEXITCODE -ne 0) {
        throw "Could not check remote branch: $Name"
    }

    return [bool]$remoteBranch
}

function Test-LocalTagExists {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Go-Root
    git show-ref --tags --verify --quiet "refs/tags/$Name"
    return ($LASTEXITCODE -eq 0)
}

function Get-LocalTagTargetSha {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Go-Root
    $targetSha = git rev-parse "$Name^{}"

    if ($LASTEXITCODE -ne 0) {
        throw "Could not resolve local tag target: $Name"
    }

    return $targetSha.Trim()
}

function Get-RemoteTagTargetSha {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    Go-Root
    $remoteTags = git ls-remote --tags origin $Name

    if ($LASTEXITCODE -ne 0) {
        throw "Could not check remote tag: $Name"
    }

    if (-not $remoteTags) {
        return $null
    }

    $peeledTag = $remoteTags | Where-Object { $_ -match "refs/tags/$([regex]::Escape($Name))\^\{\}$" } | Select-Object -First 1
    if ($peeledTag) {
        return (($peeledTag -split "\s+")[0]).Trim()
    }

    $directTag = $remoteTags | Where-Object { $_ -match "refs/tags/$([regex]::Escape($Name))$" } | Select-Object -First 1
    if (-not $directTag) {
        return $null
    }

    $directSha = (($directTag -split "\s+")[0]).Trim()
    $localObjectType = git cat-file -t $directSha 2>$null

    if ($LASTEXITCODE -eq 0 -and $localObjectType -eq "tag") {
        $resolvedSha = git rev-parse "$directSha^{}"
        if ($LASTEXITCODE -eq 0) {
            return $resolvedSha.Trim()
        }
    }

    return $directSha
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

    if (Test-LocalBranchExists -Name $BranchName) {
        Invoke-CommandStep "Delete local branch $BranchName" { git branch -d $BranchName }
    }
    else {
        Write-Host "Local branch already absent: $BranchName" -ForegroundColor Yellow
    }

    if ($SkipRemoteDelete) {
        Write-Host "Skipping remote branch deletion for: $BranchName" -ForegroundColor Yellow
    }
    elseif (Test-RemoteBranchExists -Name $BranchName) {
        Invoke-CommandStep "Delete remote branch $BranchName" { git push origin --delete $BranchName }
    }
    else {
        Write-Host "Remote branch already absent: $BranchName" -ForegroundColor Yellow
    }

    git fetch origin --prune
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

    $currentMainSha = (git rev-parse HEAD).Trim()
    if ($LASTEXITCODE -ne 0) {
        throw "Could not resolve current main commit."
    }

    $localTagExists = Test-LocalTagExists -Name $TagName
    $remoteTagTargetSha = Get-RemoteTagTargetSha -Name $TagName
    $remoteTagExists = [bool]$remoteTagTargetSha

    if ($localTagExists) {
        $localTagTargetSha = Get-LocalTagTargetSha -Name $TagName

        if ($localTagTargetSha -ne $currentMainSha) {
            throw "Local tag $TagName points to $localTagTargetSha, but current main is $currentMainSha."
        }

        Write-Host "Local tag already exists and points to current main: $TagName" -ForegroundColor Green
    }
    else {
        Invoke-CommandStep "Create tag $TagName" { git tag -a $TagName -m $TagMessage }
    }

    $localTagTargetSha = Get-LocalTagTargetSha -Name $TagName

    if ($remoteTagExists) {
        if ($remoteTagTargetSha -ne $localTagTargetSha) {
            throw "Remote tag $TagName points to $remoteTagTargetSha, but local tag points to $localTagTargetSha."
        }

        Write-Host "Remote tag already exists and matches local tag: $TagName" -ForegroundColor Green
    }
    else {
        Invoke-CommandStep "Push tag $TagName" { git push origin $TagName }
    }

    git status
    git tag
    git ls-remote --tags origin
    Write-Host "Tag is available locally and remotely: $TagName" -ForegroundColor Green
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

function Verify-ProjectState {
    Go-Root

    Write-Host ""
    Write-Host "==> Repository status" -ForegroundColor Cyan
    git status

    Write-Host ""
    Write-Host "==> Current branch" -ForegroundColor Cyan
    git branch --show-current

    Write-Host ""
    Write-Host "==> Local branches" -ForegroundColor Cyan
    git branch

    Write-Host ""
    Write-Host "==> Latest local commit" -ForegroundColor Cyan
    git log -1 --oneline

    Write-Host ""
    Write-Host "==> Local tags" -ForegroundColor Cyan
    git tag

    Write-Host ""
    Write-Host "==> Remote tags" -ForegroundColor Cyan
    git ls-remote --tags origin

    $currentBranch = git branch --show-current

    if ($currentBranch -eq "main") {
        Write-Host ""
        Write-Host "==> main sync check" -ForegroundColor Cyan
        git fetch origin main

        if ($LASTEXITCODE -ne 0) {
            throw "Could not fetch origin/main for sync check."
        }

        $localMain = git rev-parse main
        $remoteMain = git rev-parse origin/main

        if ($localMain -eq $remoteMain) {
            Write-Host "main is synced with origin/main." -ForegroundColor Green
        }
        else {
            Write-Host "main is NOT synced with origin/main." -ForegroundColor Yellow
            Write-Host "local main:  $localMain"
            Write-Host "origin/main: $remoteMain"
        }
    }

    Write-Host ""
    Write-Host "Verification complete." -ForegroundColor Green
}

switch ($Action) {
    "start" { Start-Branch }
    "validate" { Validate-Project }
    "postmerge" { Post-Merge-Cleanup }
    "tag" { Create-BetaTag }
    "status" { Show-ProjectStatus }
    "verify" { Verify-ProjectState }
}
