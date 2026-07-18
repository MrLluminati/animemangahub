# AI_HANDOFF.md - Current Agent Context

Last updated: 2026-07-18

This file is the quick-start operational handoff for the next AI/Codex session. Durable owner decisions belong in [DECISIONS.md](DECISIONS.md); reproducible commands and machine-local setup belong in [SETUP_NOTES.md](SETUP_NOTES.md).

---

## Read Order

1. `CLAUDE.md` and `AGENTS.md` for operating rules.
2. `docs/AI_HANDOFF.md` for current branch state, blockers, and next gates.
3. `PROGRESS.md` for completed work and the build log.
4. `ROADMAP.md` for phase direction and pending priorities.
5. `CHANGELOG.md` for public change history.
6. `docs/DECISIONS.md` and `docs/SETUP_NOTES.md` for durable decisions and local setup.

---

## Current Repository State

- Public product name: AniManga Wire.
- Historical public name: AniManga Hub.
- Repository: `MrLluminati/animemangahub`.
- Local folder and other technical legacy identifiers remain unchanged.
- Local safety branch: `chore/review-local-amw-updates`.
- Stable website tag: `v0.1.0-beta.15`.
- Next milestone: `v0.1.0-beta.16`; not released or tagged.
- Website development: fully resumed.
- Deployment: deferred until hosting and production secrets are intentionally configured.
- Working tree: intentionally dirty with failed transparent-branding work and local-only detailed `PROGRESS.md` narrative.

---

## Local Safety Branch

- Branch: `chore/review-local-amw-updates`.
- State: checked out and intentionally dirty.
- Contains failed branding candidates, related manifests/public aliases, and local-only detailed `PROGRESS.md` narrative.
- Must not be pushed.

---

## Merged PR 1 - Local Shorts Exclusion

- PR: [#36](https://github.com/MrLluminati/animemangahub/pull/36).
- Title: `chore: keep Shorts workspace local-only`.
- Base: `main`.
- Head: `chore/exclude-local-shorts-workspace`.
- Remote commit: `1bdf9f715aa3ae51248c00d8c01e294f12fa25f6`.
- State: merged on 2026-07-18 at 08:02:03 UTC.
- Merge commit: `c3780f8f5db18b5036d2652eb2b4531a8ea0a9e6`.

---

## Draft PR 2 - Website Rebrand Completion

- PR: [#37](https://github.com/MrLluminati/animemangahub/pull/37).
- Title: `fix: complete AniManga Wire website rebrand`.
- Base: `main`.
- Head: `fix/complete-animanga-wire-website-rebrand`.
- Remote commit before this handoff update: `84f007f5704d2644cb73718e6eb89e7b7055a02a`.
- State: open draft.
- Dependency status: PR #36 is merged; PR #37 now targets `main` directly.
- CI status: expected to run because the PR now targets `main`.

---

## Current Next Actions

1. Wait for and review PR #37 CI.
2. Perform backend-running anime and manga detail smoke testing.
3. Investigate the pre-existing mobile horizontal overflow.
4. Complete dark, light, mobile, search, image, availability-link, and related-title validation.
5. Merge PR #37 only after all required checks and release gates pass.
6. Do not tag `v0.1.0-beta.16` until the complete release matrix passes.

Keep failed branding candidates, manifests, related branding documentation, and frontend public aliases out of PR #37.

---

## Completed Local Website Work

- Anime and manga detail pages render Detail Hero → Availability → Related Titles.
- Footer exposes accessible YouTube and Instagram links from `frontend/src/config/brand.ts`.
- Anime ↔ manga cross-references remain implemented in `v0.1.0-beta.15`.
- Frontend type-check, lint, and production build passed for `1e8f12e`.
- Backend-off production builds can log non-fatal `ECONNREFUSED` fetch messages while still succeeding.

---

## Remaining `v0.1.0-beta.16` Gates

- Correct and revalidate failed transparent branding candidates.
- Run anime and manga detail-page smoke tests with the backend running.
- Complete final dark-theme and light-theme release passes.
- Complete final mobile layout pass.
- Investigate pre-existing mobile page-wide horizontal overflow.
- Validate search behavior and results.
- Validate images.
- Validate availability links.
- Validate related-title links.
- Verify a clean release repository.
- Tag `v0.1.0-beta.16` only after all gates pass.

---

## Shorts/Reels Boundary

- Shorts/Reels remains a separate local-only workstream under `shorts/`.
- Source, scripts, Remotion code, templates, documentation, media, outputs, work files, dependencies, caches, and QA artifacts stay out of Git.
- Sole versioned Shorts asset: `shorts/assets/frames/amw-shorts-unified-frame-v1.png`.
- Preserve all local Shorts files and uncommitted sample-v2 work.
- Detailed Shorts production implementation stays in ignored local documentation.

---

## Branding Blocker

- Pending transparent PNG replacements failed dark/colored-background QA because pale/grey rectangular texture remains visible.
- Do not commit or publish those binaries, asset manifests, asset READMEs, or frontend public aliases until corrected and revalidated.
- Checkerboard JPG previews are not production assets.

---

## Safety Position

AniManga Wire is non-explicit, legal-discovery-first, and India-compliance-aware. Preserve the prohibitions and legal-review requirements in `AGENTS.md`, `CLAUDE.md`, and `docs/DECISIONS.md`.

---

## Handoff Checklist

- Run `git status --short --branch` before edits.
- Preserve unrelated local work; never reset, clean, delete, or overwrite it without approval.
- Keep secrets, raw media, generated videos, and local caches out of Git.
- Stage by explicit path and verify cached scope before committing.
- Update current-state docs when status changes.
- Do not push unless explicitly authorized.
