# AI_HANDOFF.md - Current Agent Context

Last updated: 2026-07-19

This file is the operational handoff for the next AniManga Wire development session. Durable owner decisions belong in [DECISIONS.md](DECISIONS.md); machine-local setup belongs in [SETUP_NOTES.md](SETUP_NOTES.md).

---

## Read Order

1. `AGENTS.md` and `CLAUDE.md` for repository operating rules.
2. `docs/AI_HANDOFF.md` for the current release and branch state.
3. `PROGRESS.md` for build progress.
4. `ROADMAP.md` for product direction.
5. `CHANGELOG.md` and `docs/releases/` for change and release history.
6. `docs/DECISIONS.md` and `docs/SETUP_NOTES.md` for durable decisions and local setup.

---

## Current Repository State

- Public product name: AniManga Wire.
- Repository: `MrLluminati/animemangahub`.
- Website development: fully resumed.
- Deployment: intentionally disabled until hosting and production secrets are configured.
- Previous stable tag: `v0.1.0-beta.15` at `5b0c52b5ac2284348c684360cff8a4d10e705488`.
- Verified pre-release `main`: `708e2d4186096ba61df080dd5f0e5b094e20d384`.
- Release-preparation branch: `release/v0.1.0-beta.16`.
- Planned tag: `v0.1.0-beta.16`.
- The tag did not exist when release preparation began.
- No open pull requests remained when release preparation began.

---

## Merged Milestones

### PR #36 - Shorts workspace boundary

- Title: `chore: keep Shorts workspace local-only`.
- Merge commit: `c3780f8f5db18b5036d2652eb2b4531a8ea0a9e6`.
- The Shorts/Reels production workspace remains local-only.
- The sole versioned Shorts exception is `shorts/assets/frames/amw-shorts-unified-frame-v1.png`.

### PR #37 - Website rebrand completion

- Title: `fix: complete AniManga Wire website rebrand`.
- Merge commit: `83d1d8bf027ab6483f8e58309e15393e72b65251`.
- Completed the AniManga Wire public rebrand without replacing the catalog-first website.
- Added Hero → Availability → Related Titles ordering and official footer social links.
- Fixed mobile header shrink behavior and page-wide horizontal overflow.
- Improved search-suggestion DOM order and native keyboard accessibility.

### PR #38 - Corrected transparent branding

- Title: `fix: integrate corrected transparent branding assets`.
- Merge commit: `708e2d4186096ba61df080dd5f0e5b094e20d384`.
- Added validated light-, dark-, and brand-red-surface masters.
- Added deterministic profile and watermark derivatives.
- Synchronized canonical, Codex-ready, and frontend aliases.
- Added theme-aware logo selection through the existing theme context.
- PR scope contained 45 expected branding and frontend paths.

---

## Release Validation

The `v0.1.0-beta.16` candidate has passed the following gates:

- PR #37 CI passed.
- PR #38 CI passed.
- Frontend type-check passed.
- Frontend lint passed with zero new warnings or errors.
- Frontend production build passed.
- Backend type-check passed in GitHub Actions.
- Browser QA passed at `1440×900`, `1280×720`, `390×844`, `375×667`, and `360×800` in light and dark themes.
- Mobile navigation, theme persistence, accessible names, aspect ratios, logo visibility, and horizontal overflow passed.
- Search input, Search button, native Enter/Space activation, suggestion activation, and keyboard traversal passed.
- Corrected PNGs passed Pillow and Windows System.Drawing decoding.
- Alpha-zero hidden RGB and outer-border alpha are zero for production transparent assets.
- Declared aliases are byte-identical to their canonical sources.
- `main` was verified as identical to PR #38 merge commit before release preparation.
- `v0.1.0-beta.16` was verified absent before release preparation.

### Jikan external-service status

- Repeated direct Jikan requests returned `504` during the July 18 live-search retries.
- The full search UI and navigation flow passed against a temporary Jikan-compatible service boundary outside the repository.
- On July 19, Jikan v4 anime and top-anime endpoints again returned populated JSON responses.
- Temporary upstream availability is treated as an external-service condition, not an application regression.

---

## Branding Source Position

- Approved profile master: `1254×1254` transparent raster family.
- Approved full-logo master: `1916×821` transparent raster family.
- Surface variants: light, dark, and brand red.
- Generic compatibility aliases map to the approved light-surface masters.
- A genuine vector or layered editable source is not currently available.
- Do not fabricate an SVG by embedding or tracing the raster masters and call it an editable source.

---

## Local Safety Worktree

The owner has an intentionally dirty local safety worktree:

- Branch: `chore/review-local-amw-updates`.
- It contains excluded failed branding candidates and local-only narrative material.
- It must not be reset, cleaned, overwritten, pushed, or copied into release work.
- Remote GitHub operations must not be represented as proof of its current local fingerprint unless the owner re-verifies it locally.

---

## Release Action

The release-preparation branch adds `docs/releases/v0.1.0-beta.16.md` and updates current-state documentation.

After its pull request is merged and CI passes:

```powershell
git checkout main
git pull origin main
pwsh .\scripts\dev-workflow.ps1 -Action tag -TagName "v0.1.0-beta.16" -TagMessage "AniManga Wire rebrand completion and corrected transparent branding"
```

The annotated tag must point to the final release-preparation merge commit. Do not force-move an existing tag.

---

## Next Product Work After beta.16

- Catalog pagination and sorting improvements.
- Continued catalog and detail-page visual polish.
- Optional Arrow Up/Down active-suggestion highlighting.
- Hosting and production-secret setup when deployment is intentionally enabled.
- Future creation of a genuine editable/vector branding source.

---

## Safety Position

AniManga Wire remains non-explicit, legal-discovery-first, and India-compliance-aware. Preserve the content, moderation, copyright, privacy, and legal-review requirements in the repository policies.
