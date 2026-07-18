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
- Remote commit at runtime-validation start: `9ea030f0d8c7453e052f9beea6c6a7183d8b3546`.
- Local runtime fix commit: `5938bdd` (`fix: prevent mobile layout overflow`).
- Local accessibility fix commit: `169370a` (`fix: improve search suggestion accessibility`).
- State: open draft.
- Dependency status: PR #36 is merged; PR #37 now targets `main` directly.
- CI status: expected to run because the PR now targets `main`.

---

## Current Next Actions

1. Re-run live search when Jikan is healthy; the final bounded retry still returned upstream `504` responses.
2. Consider dedicated Arrow Up/Down suggestion highlighting as an optional future accessibility enhancement.
3. Correct and revalidate the excluded transparent-branding candidates.
4. Complete PR #37 CI and merge-readiness review; at this documentation point the PR remains draft and unmerged.
5. Do not tag `v0.1.0-beta.16` until the complete release matrix passes.

Keep failed branding candidates, manifests, related branding documentation, and frontend public aliases out of PR #37.

---

## Completed Local Website Work

- Anime and manga detail pages render Detail Hero → Availability → Related Titles.
- Footer exposes accessible YouTube and Instagram links from `frontend/src/config/brand.ts`.
- Anime ↔ manga cross-references remain implemented in `v0.1.0-beta.15`.
- Frontend type-check, lint, and production build passed for `1e8f12e`.
- Backend-off production builds can log non-fatal `ECONNREFUSED` fetch messages while still succeeding.

### Runtime validation — 2026-07-18

- Backend started on port `4000`; `GET /api/health` returned `200` with service status `ok`. Frontend started on port `3000` and returned `200`.
- Confirmed records: anime `/anime/21` (One Piece) and manga `/manga/13` (One Piece). Anime relations included the internal manga link `/manga/13`; manga relations returned no groups and correctly omitted the section.
- Browser coverage passed at `1440x900`, `1280x720`, `390x844`, `375x667`, and `360x800` in dark and light themes. Header, footer, social attributes, images, detail ordering, availability destinations, and internal related-title navigation passed without browser-console errors.
- Mobile overflow root cause was the header controls flex item shrinking below its fixed-width children. Commit `5938bdd` adds `shrink-0`; all tested root/body and footer measurements now match their client widths.
- Live query `one piece` remained blocked by upstream Jikan `504` responses. The page rendered the intended zero-result fallback without overflow. Automated Search-button submission worked; automated Enter submission did not navigate and needs a later browser/operator recheck.
- PR #37 remains draft and unmerged. `v0.1.0-beta.16` remains untagged.

### Final search validation — 2026-07-18

- Three bounded `one piece` retries produced no live results. Direct Jikan anime/manga requests returned `504/504` on every attempt; backend anime/manga routes returned `500/500`, and the combined route returned `502`. Attempt durations in milliseconds were: direct `676/539`, backend `545/183`, combined `908`; direct `823/555`, backend `560/189`, combined `918`; direct `620/563`, backend `548/183`, combined `926`.
- Earlier browser-surface automation did not perform native implicit Enter submission. The dedicated WebDriver gate below supersedes that limitation with native W3C key input and confirms the real input and form paths.
- The visible Search button and `requestSubmit()` on the actual form both invoked the real submit handler and navigated once to `/search?q=one%20piece`; whitespace trimmed correctly and an empty query retained its existing redirect-to-home behavior.
- Arrow Down did not highlight a suggestion: focus remained on the input and `aria-activedescendant` remained absent. The current component has no Arrow Up/Down active-suggestion model; whether to add one is an owner enhancement decision, not a regression in the documented full-search Enter flow.
- Because browser request interception was not available in the selected browser surface, controlled rendering used a temporary Jikan-compatible local service boundary outside the repository. It returned two anime and two manga records. All four cards and images rendered at `1440x900`, `390x844`, and `360x800` in dark/light coverage; query refresh persistence, `/anime/21` navigation, focus usability, and zero horizontal overflow/browser-console errors passed. No mock, fixture, log, database, or source artifact is versioned.
- Live upstream success remains an external-service verification gate. PR #37 remains draft and unmerged, and `v0.1.0-beta.16` remains untagged.

### WebDriver accessibility validation — 2026-07-18

- Microsoft Edge `150.0.4078.65`, matching Edge WebDriver `150.0.4078.65`, Selenium `4.46.0`, isolated temporary profile, final session `9544adfd030bc2fc70506d88c4f1ddf0`; the session was closed after validation.
- The initial DOM placed portaled suggestion buttons after the footer. Desktop Tab traversed footer content before suggestions, while mobile scrolling dismissed the overlay before suggestion focus. Commit `169370a` keeps the fixed-position overlay beside its form in DOM order without changing its native form/button semantics, styling, API behavior, dependencies, or empty states.
- At `1440x900` dark, `390x844` light, and `360x800` dark, native W3C Tab order passed: search input → Search button → anime suggestion → manga suggestion → next suggestion → YouTube link. Shift+Tab reversed suggestion order; focus remained visible and all actionable elements retained `tabIndex=0`.
- Native input Enter, Search-button Enter, and Search-button Space each navigated exactly once to `/search?q=one%20piece`. Suggestion Enter navigated to `/anime/21` and `/manga/13`. All checked paths had zero browser-console errors.
- Tab exited the last suggestion without a focus trap. Scrolling then dismissed the overlay, so reverse Tab returned to the Search button rather than reopening or re-entering a closed list. Escape on the native search input cleared the query and closed suggestions; Escape on a focused suggestion left the ordinary-button overlay open, which is valid for this non-modal interaction.
- Semantics remain a native `role=search` form, named `searchbox` input, and ordinary accessible suggestion buttons. There is no false `listbox`/`option` state or active-descendant contract. Arrow Up/Down selection is therefore an optional enhancement, not a release blocker.
- Controlled Jikan-boundary results supplied anime and manga suggestions without adding repository fixtures. The final live retry at `2026-07-18T11:25:31.4565752Z` still returned direct Jikan `504/504`, backend anime/manga `500/500`, and combined `502`; this is an external-service limitation, not a WebDriver failure.
- Root/body horizontal overflow remained zero at all three viewports. Frontend type-check, lint, and production build passed after the fix; build-time API messages from the controlled boundary were non-fatal.
- PR #37 is accessibility-ready at this validation point but remains draft and unmerged until CI and final scope review complete. `v0.1.0-beta.16` remains untagged, and excluded transparent-branding work remains a separate blocker/workstream.

---

## Remaining `v0.1.0-beta.16` Gates

- Correct and revalidate failed transparent branding candidates.
- Validate a successful live search result after the Jikan upstream recovers.
- Consider dedicated Arrow Up/Down suggestion selection as an optional future enhancement; native WebDriver input and button activation are validated.
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
