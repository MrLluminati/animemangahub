# AI_HANDOFF.md - Current Agent Context

Last updated: 2026-07-19

This file is the operational handoff for the next AniManga Wire development session. Durable decisions belong in `docs/DECISIONS.md`; machine-local setup belongs in `docs/SETUP_NOTES.md`.

---

## Current Repository State

- Product: AniManga Wire.
- Repository: `MrLluminati/animemangahub`.
- Website development: fully resumed.
- Deployment: disabled until hosting and production secrets are configured.
- Previous stable tag: `v0.1.0-beta.15` at `5b0c52b5ac2284348c684360cff8a4d10e705488`.
- Release documentation merged through PR #39 at `b4acf0af1f7166c4301f888f2d108253f7d01e49`.
- Planned tag: `v0.1.0-beta.16`.
- Remaining release action: create and push the annotated tag from updated `main` after the final status-sync pull request passes CI and merges.
- The beta.16 tag did not exist when release preparation began.

---

## Merged Milestones

### PR #36 - Shorts workspace boundary

- Merge commit: `c3780f8f5db18b5036d2652eb2b4531a8ea0a9e6`.
- The Shorts/Reels production workspace remains local-only.
- The sole versioned Shorts exception is `shorts/assets/frames/amw-shorts-unified-frame-v1.png`.

### PR #37 - Website rebrand completion

- Merge commit: `83d1d8bf027ab6483f8e58309e15393e72b65251`.
- Completed the public AniManga Wire rebrand while preserving the catalog-first website.
- Added Hero → Availability → Related Titles ordering and official footer social links.
- Fixed mobile header shrink behavior, horizontal overflow, and search-suggestion keyboard order.

### PR #38 - Corrected transparent branding

- Merge commit: `708e2d4186096ba61df080dd5f0e5b094e20d384`.
- Added validated light-, dark-, and brand-red-surface masters.
- Added deterministic profile and watermark derivatives.
- Synchronized canonical, Codex-ready, and frontend aliases.
- Added theme-aware logo selection through the existing theme context.

### PR #39 - beta.16 release documentation

- Merge commit: `b4acf0af1f7166c4301f888f2d108253f7d01e49`.
- Added the beta.16 release record.
- Refreshed operational handoff, preserved build history, and documented tag and rollback procedures.
- Documentation-only scope passed frontend lint and frontend/backend type-check CI.

---

## Release Validation

The beta.16 candidate passed:

- PR #37, PR #38, and PR #39 CI.
- Frontend type-check and lint.
- Frontend production build.
- Backend type-check.
- Browser QA at `1440×900`, `1280×720`, `390×844`, `375×667`, and `360×800` in light and dark themes.
- Mobile navigation, theme persistence, accessible names, logo visibility, and horizontal-overflow checks.
- Search input, Search button, native keyboard activation, suggestion activation, and keyboard traversal.
- Pillow and Windows System.Drawing decoding for corrected PNGs.
- Zero hidden RGB beneath alpha zero and zero outer-border alpha for production transparent assets.
- Byte-identical alias verification against declared canonical sources.

### Jikan status

- Direct Jikan requests returned repeated `504` responses during July 18 live-search retries.
- The complete search UI and navigation flow passed against a temporary Jikan-compatible service boundary outside the repository.
- On July 19, Jikan v4 anime endpoints returned populated JSON responses again.
- Temporary upstream availability is treated as an external-service condition rather than an application regression.

---

## Branding Source Position

- Approved profile master: `1254×1254` transparent raster family.
- Approved full-logo master: `1916×821` transparent raster family.
- Surface variants: light, dark, and brand red.
- Generic compatibility aliases map to approved light-surface masters.
- A genuine vector or layered editable source is not currently available.

---

## Local Worktree Boundary

The owner has an intentionally dirty local worktree on `chore/review-local-amw-updates`.

- Do not reset, clean, overwrite, push, or copy it into release work.
- Remote GitHub operations are not proof of its current local fingerprint.

---

## Release Action

After the final status-sync pull request is merged and CI passes, run from the clean local repository:

```powershell
git checkout main
git pull origin main
pwsh .\scripts\dev-workflow.ps1 -Action tag -TagName "v0.1.0-beta.16" -TagMessage "AniManga Wire rebrand completion and corrected transparent branding"
```

The annotated tag must point to updated `main`. Do not move a tag that already exists at a different commit.

---

## Next Product Work After beta.16

- Catalog pagination and sorting improvements.
- Continued catalog and detail-page visual polish.
- Optional Arrow Up/Down active-suggestion highlighting.
- Hosting and production-secret setup when deployment is intentionally enabled.
- Future creation of a genuine editable/vector branding source.
