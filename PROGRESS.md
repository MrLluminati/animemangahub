# PROGRESS.md — Build Log

A running summary of completed work, current release state, and next priorities.

---

## Current Status

**Active phase:** Phase 1 — MVP Catalog and UI/Product Polish  
**Previous stable website beta:** `v0.1.0-beta.15`  
**Release candidate:** `v0.1.0-beta.16`  
**Verified pre-release main commit:** `708e2d4186096ba61df080dd5f0e5b094e20d384`  
**Release-preparation branch:** `release/v0.1.0-beta.16`  
**Website status:** Fully resumed  
**Shorts status:** Separate local-only production workstream  
**Deployment status:** Disabled until hosting and production secrets are configured

### beta.16 release gate — 2026-07-19

- [x] PR #36 merged: Shorts/Reels production workspace excluded from Git except the approved unified frame.
- [x] PR #37 merged: AniManga Wire website rebrand completed and accessibility/mobile fixes integrated.
- [x] PR #38 merged: corrected transparent branding masters, derivatives, aliases, and theme-aware surface selection integrated.
- [x] Frontend type-check passed.
- [x] Frontend lint passed with zero new warnings or errors.
- [x] Frontend production build passed.
- [x] Backend type-check passed in GitHub Actions.
- [x] Desktop and mobile browser QA passed in light and dark themes.
- [x] Search input, button, suggestion activation, native keyboard navigation, theme persistence, and overflow checks passed.
- [x] Corrected PNG decoder, alpha, border, geometry, and alias-integrity gates passed.
- [x] `main` verified identical to merge commit `708e2d4186096ba61df080dd5f0e5b094e20d384` before release preparation.
- [x] No open pull request remained when release preparation began.
- [x] `v0.1.0-beta.16` verified absent before release preparation.
- [x] Jikan public v4 anime endpoints returned populated JSON again on July 19 after the July 18 upstream failures.
- [ ] Merge the release-preparation pull request after CI and scope review.
- [ ] Create the annotated `v0.1.0-beta.16` tag at the release-preparation merge commit.

---

## Phase 0 — Foundation ✅

- [x] Repository structure and core documentation.
- [x] Next.js frontend and Express backend scaffolds.
- [x] Prisma schema and local migration structure.
- [x] GitHub Actions lint/type-check workflow.
- [x] Environment template, ignore rules, architecture, API, and workflow documentation.

---

## Phase 1 — MVP Catalog and UI/Product Polish

### Completed

- [x] Trending anime and top manga catalog routes and pages.
- [x] Anime and manga detail routes and pages.
- [x] Combined search and search results page.
- [x] Local SQLite Jikan response caching.
- [x] Cache health, statistics, clear endpoints, and development debug panel.
- [x] Genre, year, and status catalog filters.
- [x] Official-source legal watch/read discovery links.
- [x] Anime ↔ manga relation endpoints and related-title UI.
- [x] Ranked search suggestions and search sort modes.
- [x] Search suggestion layout, visibility, scrolling, and keyboard-accessibility fixes.
- [x] AniManga Wire public rebrand and metadata integration.
- [x] Hero → Availability → Related Titles detail ordering.
- [x] Official YouTube and Instagram footer links.
- [x] Mobile header shrink and horizontal-overflow fixes.
- [x] Corrected transparent profile and full-logo masters for light, dark, and brand-red surfaces.
- [x] Deterministic profile and watermark derivatives.
- [x] Theme-aware logo selection and synchronized public/Codex-ready aliases.
- [x] Shorts/Reels workspace boundary enforced as local-only.

### Next after beta.16

- [ ] Catalog pagination improvements.
- [ ] Catalog sorting improvements beyond search-result sorting.
- [ ] Continued visual polish across catalog and detail pages.
- [ ] Optional Arrow Up/Down active-suggestion highlighting.
- [ ] Genuine editable/vector branding source.
- [ ] Vercel and Railway deployment when hosting and production secrets are intentionally configured.

---

## Phase 2 — User Accounts and Community

- [ ] Authentication foundation.
- [ ] User profile page.
- [ ] Watchlist and reading list.
- [ ] User ratings and reviews.
- [ ] Title discussion threads.
- [ ] User avatar and biography.

---

## Phase 3 — Monetization

- [ ] Advertising placement strategy.
- [ ] Affiliate-link system.
- [ ] Subscription and premium-tier design.
- [ ] Payment integration only after legal, privacy, and operational review.

---

## Phase 4 — Growth and SEO

- [ ] Dynamic sitemap.
- [ ] Expanded SEO metadata and structured data.
- [ ] Seasonal anime chart and countdowns.
- [ ] Newsletter.
- [ ] Recommendation engine.
- [ ] Social sharing cards.
- [ ] Mobile application evaluation.

---

## Phase 5 — Licensing and Partnerships

- [ ] Licensed-video partnership model.
- [ ] Publisher/studio dashboard.
- [ ] Sponsored listings.
- [ ] Premium streaming tier only with valid licences.
- [ ] Partner API.

---

## Recent Milestones

| Date | Milestone |
|---|---|
| 2026-05-07 | Phase 1 foundation merged and first rollback-safe beta tags established. |
| 2026-05-17 | Filters, official-source discovery links, theme foundation, and workflow idempotency completed. |
| 2026-05-18 | Ranked search suggestions and `v0.1.0-beta.14` completed. |
| 2026-05-22 | Mobile image/suggestion reliability and CTA spacing fixes completed. |
| 2026-06-24 | Anime ↔ manga cross-references and `v0.1.0-beta.15` completed. |
| 2026-06-24 | AniManga Wire branding integrated and Shorts workspace created. |
| 2026-07-18 | Website development resumed; PR #36 and PR #37 merged. |
| 2026-07-19 | PR #38 merged and beta.16 release verification completed. |

---

## Operational Boundaries

- The local safety branch `chore/review-local-amw-updates` is intentionally dirty and must not be reset, cleaned, overwritten, or pushed.
- Shorts/Reels production files remain local-only; only `shorts/assets/frames/amw-shorts-unified-frame-v1.png` is versioned from that workspace.
- The current approved branding source is validated transparent raster artwork. A genuine vector/layered source is still unavailable.
- AniManga Wire remains non-explicit, legal-discovery-first, and subject to the repository's copyright, moderation, privacy, and India-compliance requirements.
