# Development Workflow

AniManga Hub uses a PowerShell-first, branch-based workflow.

Use PowerShell 7 through Windows Terminal for this project. Do not use old Windows PowerShell 5.1 for patch scripts.

---

## Mandatory Rules

1. Work on a feature or fix branch.
2. Do not develop directly on `main`.
3. Validate before committing.
4. Provide a pull request title and description every time.
5. Wait for GitHub Actions to pass before merging.
6. After merge, update local `main` and delete the merged branch.
7. After every stable beta milestone, create an annotated rollback tag.

---

## Helper Script

The reusable workflow helper is located at:

```text
scripts/dev-workflow.ps1
```

Run commands from the repository root:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"
```

---

## Check Project Status

```powershell
pwsh .\scripts\dev-workflow.ps1 -Action status
```

---

## Start a New Branch

```powershell
pwsh .\scripts\dev-workflow.ps1 -Action start -BranchName "feature/example-branch"
```

Examples:

```text
feature/phase-1d-cache-observability
fix/example-bug
chore/example-maintenance
```

---

## Validate Before Commit

```powershell
pwsh .\scripts\dev-workflow.ps1 -Action validate
```

This runs:

```text
Prisma validate
Prisma generate
Prisma migrate deploy
Backend type-check
Frontend lint
Frontend type-check
```

The script ensures `backend/.env` has a local SQLite `DATABASE_URL` for Phase 1C local validation.

---

## Commit and Push

After validation passes:

```powershell
git status
git add .
git commit -m "type: concise commit message"
git push origin <branch-name>
```

Use conventional commit prefixes where practical:

```text
feat:
fix:
docs:
chore:
refactor:
```

---

## Pull Request Template

Always provide a title and description.

### Title

```text
type: concise description
```

### Description

```markdown
## Summary

Explain what this PR does.

## Added

- List new files/features.

## Changed

- List modified behavior/files.

## Validation

Local validation passed:

- Prisma validate passed
- Prisma generate passed
- Prisma migrate deploy passed
- Backend type-check passed
- Frontend lint passed
- Frontend type-check passed

## Notes

- Mention rollback, deployment, or future work notes.
```

---

## Post-Merge Cleanup

After the PR is merged:

```powershell
pwsh .\scripts\dev-workflow.ps1 -Action postmerge -BranchName "feature/example-branch"
```

If the remote branch was already deleted on GitHub, use:

```powershell
pwsh .\scripts\dev-workflow.ps1 -Action postmerge -BranchName "feature/example-branch" -SkipRemoteDelete
```

---

## Create a Rollback Beta Tag

After a stable merge and local verification:

```powershell
pwsh .\scripts\dev-workflow.ps1 -Action tag -TagName "v0.1.0-beta.6" -TagMessage "Phase 1D beta release"
```

Use annotated beta tags for rollback points.

---

## Current Tag Sequence

```text
v0.1.0-beta.1 = Phase 1A working skeleton
v0.1.0-beta.2 = Phase 1B initial build
v0.1.0-beta.3 = Phase 1B image-host hotfix
v0.1.0-beta.4 = Phase 1B CI-safe local-development build
v0.1.0-beta.5 = Phase 1C database caching build
```

---

## Future Deployment

Deployment is intentionally deferred until hosting is configured.

Future required GitHub secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
RAILWAY_TOKEN
```

Until then, GitHub Actions should keep quality checks active and deployment jobs disabled.

---

## Mandatory PR Rule

Every pull request in this project MUST include both:

- PR Title
- PR Description

The PR description must include:

- Summary
- Added or Changed items
- Validation steps
- Notes or rollback information where relevant

No feature, fix, chore, or documentation branch should be merged without a clear PR title and PR description.
