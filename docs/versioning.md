# Versioning and Rollback Workflow

AniManga Hub uses beta release tags to preserve safe rollback points after stable milestones.

This project is developed in small, reviewable phases. Each working milestone should be merged through a pull request, verified by GitHub Actions, and then optionally tagged as a beta release.

---

## Current Release Tags

| Tag | Meaning |
|---|---|
| `v0.1.0-beta.1` | Phase 1A working skeleton: Next.js frontend, Express backend, Jikan API wrapper, Prisma schema, and initial catalog UI |
| `v0.1.0-beta.2` | Phase 1B initial detail pages and search build |
| `v0.1.0-beta.3` | Phase 1B image-host handling hotfix |
| `v0.1.0-beta.4` | Phase 1B CI-safe local-development build |
| `v0.1.0-beta.5` | Phase 1C local SQLite database caching |
| `v0.1.0-beta.6` | Reusable PowerShell workflow tooling |
| `v0.1.0-beta.7` | Phase 1D cache observability |
| `v0.1.0-beta.8` | Workflow verification tooling |
| `v0.1.0-beta.9` | Phase 1E frontend cache debug visibility |

---

## Version Format

Use semantic beta versioning:

```text
vMAJOR.MINOR.PATCH-beta.NUMBER
```

Examples:

```text
v0.1.0-beta.1
v0.1.0-beta.2
v0.1.0-beta.3
v0.2.0-beta.1
v1.0.0
```

Recommended meaning:

- `v0.1.0-beta.x` — early MVP catalog builds
- `v0.2.0-beta.x` — larger feature milestone, such as account/auth foundation
- `v1.0.0` — first stable public release

---

## Branching Rules

Use `main` only for stable, reviewed code.

Feature or documentation work should happen on a separate branch:

```text
feature/phase-1b-search-and-layout
fix/frontend-type-errors
docs/versioning-rollback-workflow
```

Do not develop directly on `main`.

---

## Pull Request Rules

Before merging into `main`:

1. Push the feature branch.
2. Open a pull request into `main`.
3. Wait for GitHub Actions to pass.
4. Review the changed files.
5. Use Squash and merge.
6. Pull the updated `main` locally.

---

## Creating a Beta Tag

After a stable milestone is merged into `main`, create an annotated tag:

```powershell
git checkout main
git pull origin main

pwsh .\scripts\dev-workflow.ps1 -Action tag -TagName "v0.1.0-beta.10" -TagMessage "Workflow idempotency beta release"
```

Annotated tags are preferred because they preserve a message and release context.

The workflow tag command is safe to re-run. If the local and remote tags already exist and point to the current `main`, the command reports success instead of failing. If either tag points to a different commit, the command fails to avoid silently moving rollback points.

---

## Viewing a Rollback Point

To inspect a previous beta build:

```powershell
git checkout v0.1.0-beta.1
```

This puts Git into detached HEAD mode. That is normal when checking out a tag.

Return to active development:

```powershell
git checkout main
```

---

## Creating a Rollback Branch

If a future build breaks badly and we need to recover from a known-good beta:

```powershell
git checkout -b rollback/v0.1.0-beta.1 v0.1.0-beta.1
git push origin rollback/v0.1.0-beta.1
```

This creates a branch from the safe beta tag.

---

## Reverting a Bad Merge

Avoid hard-resetting shared `main`.

If a bad pull request was merged, prefer:

```powershell
git checkout main
git pull origin main
git revert <bad-commit-sha>
git push origin main
```

This preserves history and creates a new commit that undoes the bad change.

---

## Local PowerShell Workflow

This project uses PowerShell-first instructions for local development on Windows.

Common commands:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"

git status
git checkout main
git pull origin main
git checkout -b feature/example-branch
git add .
git commit -m "feat: example change"
git push origin feature/example-branch
```

---

## Current Development Principle

Work should be:

- Small
- Reviewable
- Recoverable
- Verified locally
- Verified by GitHub Actions
- Documented in `CHANGELOG.md` and `PROGRESS.md`

Every important working build should have a rollback path.
