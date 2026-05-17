# CHANGELOG

All notable changes to AniManga Hub are logged here.
Every agent or developer MUST add an entry before pushing to `main`.

Format:
```text
## [YYYY-MM-DD] â€” Short title
**Agent/Author:** Name or "Claude Sonnet 4.6" or "Human: username"
**Phase:** Phase number and name
**Commit:** the git commit message used

### Added
- list of new files or features added

### Changed
- list of files modified and what changed

### Removed
- list of anything deleted

### Notes
- Any decisions made, blockers, or context for next agent
```

---

## [2026-05-18] - Short search query handling
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - MVP Catalog
**Commit:** `fix: improve short search query handling`

### Fixed
- Combined search no longer fails the whole response if only anime or manga search fails.
- Jikan API requests are serialized through a rate-limit queue to reduce transient API pacing failures.
- Search frontend fetches now use `cache: "no-store"` to avoid preserving stale empty responses.
- Short but meaningful queries use a higher backend result limit.
- Single-character queries are intentionally ignored with clearer UI feedback.

### Changed
- Updated search page styling to use AniPulse theme surfaces and text variables.
- Added `docs/short-search-query-handling.md`.
- Updated `PROGRESS.md`.

### Notes
- No database schema or content-safety policy changed.
- Verify with `One Piece`, `One`, `Naruto`, `Jo`, and a single-character query.

---## [2026-05-18] - Documentation sync through beta 13
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Documentation
**Commit:** `docs: sync progress through beta 13`

### Changed
- Updated `README.md` current stable beta and completed-feature summary through `v0.1.0-beta.13`.
- Updated `PROGRESS.md` current status, next steps, completed official-source discovery links, and beta 13 session log.
- Updated `ROADMAP.md` Phase 1 snapshot to reflect completed filters, official-source links, workflow hardening, and AniPulse foundation.
- Rewrote `docs/project-summary.md` through `v0.1.0-beta.13`.

### Notes
- This is a documentation-only sync.
- No application code, backend logic, database schema, or content-safety policy changed.
- Next implementation task remains short search query handling.

---
## [2026-05-17] - AniPulse readability drawer and fonts hotfix
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - UI/Product Polish
**Commit:** `fix: improve AniPulse readability drawer and fonts`

### Fixed
- AniPulse now loads Epilogue, Hanken Grotesk, and Space Grotesk through `next/font/google`.
- Theme boot script now uses `beforeInteractive` loading to reduce light-mode refresh flash.
- Mobile navigation now opens as a right-side portal drawer instead of being trapped inside the header.
- Homepage, search, and title cards now use AniPulse theme variables for improved light-mode readability.

### Added
- `docs/anipulse-readability-drawer-fonts.md`.

### Notes
- No backend logic, database schema, or content-safety policy changed.
- This does not complete the full AniPulse page redesign; it stabilizes the shell and readability before the larger visual pass.

---
## [2026-05-17] - AniPulse client interaction repair
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - UI/Product Polish
**Commit:** `fix: repair AniPulse client interactions`

### Fixed
- Theme toggle now updates the DOM and localStorage immediately.
- Mobile navigation drawer is hydrated through the client header shell and has improved overlay behavior.
- SearchBox now has a GET fallback while preserving client-side navigation.
- Theme mode is applied before hydration through `ThemeBootScript`.

### Changed
- Header is now a client component so the app shell hydrates as one interactive unit.
- Footer now has grouped navigation for Explore, Future sections, and Policies.

### Added
- `docs/anipulse-client-interactions.md`.

### Notes
- No backend logic, database schema, or content-safety policy changed.
- If extension-injected hydration warnings remain, test in an incognito window with extensions disabled.

---
## [2026-05-17] - AniPulse live verification hotfix
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - UI/Product Polish
**Commit:** `fix: stabilize AniPulse theme shell`

### Fixed
- Theme preference now avoids overwriting the saved user mode before client-side initialization completes.
- Theme toggle remains visible across mobile, tablet, desktop, and large-screen layouts.
- Mobile navigation includes search and improved viewport behavior.
- Search fields now include `id`, `name`, `type`, `role`, `aria-label`, and hidden label support for browser accessibility checks.
- Added a Next.js app icon to stop `/favicon.ico` style missing-icon requests.

### Added
- `docs/anipulse-live-verification.md`.

### Notes
- Browser extension-injected attributes may still cause a non-app hydration warning in Chrome/Edge. Verify in incognito with extensions disabled if needed.
- No backend logic, database schema, or content-safety policy changed.

---
## [2026-05-17] - AniPulse reusable theme foundation
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - UI/Product Polish
**Commit:** `style: add AniPulse theme foundation`

### Added
- AniPulse theme tokens for Tokyo Night dark mode and Vintage Day light mode.
- `ThemeProvider` with persisted dark/light mode preference.
- `ThemeToggle` for switching between AniPulse modes.
- `GlowBackground`, `SurfaceCard`, `SectionHeader`, `ThemeButton`, `ThemeBadge`, `BrandMark`, and `MobileNav` primitives.
- `docs/anipulse-theme-foundation.md`.

### Changed
- Updated global CSS with AniPulse design variables, responsive background layers, buttons, badges, cards, and navigation utilities.
- Updated app layout to wrap the application in the AniPulse theme provider.
- Updated header and footer to use the AniPulse foundation.

### Notes
- This is a theme foundation and app-shell styling pass.
- Homepage, catalog pages, and detail pages will be converted in separate reviewable PRs.
- No backend logic, database schema, API behavior, or content-safety policy changed.

---
## [2026-05-17] - Legal watch and read discovery links
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - MVP Catalog and Legal Discovery
**Commit:** `feat: add legal watch and read links`

### Added
- `frontend/src/components/catalog/LegalAvailabilityLinks.tsx` for official-platform legal discovery links.
- Legal anime watch discovery links on anime detail pages.
- Legal manga read discovery links on manga detail pages.

### Changed
- Replaced Phase 1B legal availability placeholders with official-platform discovery sections.
- Updated `PROGRESS.md`.

### Notes
- Links are discovery shortcuts to official/lawful platforms and do not claim title-specific licensing or region availability.
- No piracy links, torrent links, unofficial readers, hentai platforms, adult redirects, or explicit-content discovery features were added.
- Region-aware verified availability remains a future database-backed enhancement.

---
## [2026-05-17] - Catalog genre year and status filters
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - MVP Catalog and Legal Discovery
**Commit:** `feat: add catalog filters`

### Added
- `GET /api/anime/filter` for anime genre, year, and status filtering.
- `GET /api/manga/filter` for manga genre, year, and status filtering.
- `frontend/src/components/catalog/CatalogFilters.tsx` shared catalog filter form.

### Changed
- Updated anime and manga services with cache-backed filtered Jikan requests.
- Updated anime and manga controllers with safe filter parsing and validation.
- Updated anime and manga pages to show genre/year/status controls and filtered result counts.
- Updated frontend API helpers for catalog filter requests.
- Updated `PROGRESS.md`.

### Notes
- Filters use safe catalog metadata only.
- No piracy, explicit content, adult redirects, or prohibited mature-content discovery features were added.
- Legal watch/read links remain the next Phase 1 product priority.

---
## [2026-05-17] - Workflow cleanup and tagging idempotency
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Project Operations
**Commit:** `chore: make workflow cleanup and tagging idempotent`

### Changed
- Updated `scripts/dev-workflow.ps1` so `postmerge` treats missing local/remote branches as warnings instead of fatal errors.
- Updated `scripts/dev-workflow.ps1` so `tag` accepts already-existing matching local/remote tags and only creates or pushes missing tags.
- Updated `docs/workflow.md` with idempotent cleanup and tagging behavior.
- Updated `docs/versioning.md` with the current beta tag table through `v0.1.0-beta.9`.
- Updated `PROGRESS.md` to mark workflow cleanup/tagging idempotency complete.

### Notes
- Existing tags pointing to a different commit still fail deliberately.
- This is workflow tooling hardening and may be tagged as `v0.1.0-beta.10` after merge if local verification passes.

---
## [2026-05-17] - Agent instruction sync
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Project Documentation
**Commit:** `docs: update agent instructions`

### Added
- `AGENTS.md` as a general AI-agent instruction file aligned with the current AniManga Hub direction.

### Changed
- Synced agent instructions with the merged Anime Culture Platform strategy, content safety rules, Indian compliance caution, and current Phase 1 state.

### Notes
- The old stashed `AGENTS.md` was not restored because it was outdated and still described the project as Phase 0/Foundation.
- `.codex/config.toml` remains local and is intentionally not included in this documentation PR.

---
## [2026-05-17] - Anime Culture Platform strategy merge
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Product Strategy and Documentation
**Commit:** `docs: merge anime culture platform strategy`

### Added
- `docs/content-safety-policy.md`.
- `docs/editorial-policy.md`.
- `docs/moderation-policy.md`.
- `docs/legal-watch-read-link-policy.md`.
- `docs/anime-culture-platform-merge-plan.md`.

### Changed
- Updated `README.md` to position AniManga Hub as a catalog, legal discovery, review, and anime culture publication platform.
- Updated `ROADMAP.md` with content/culture, moderation, legal watch/read, and safe marketplace direction.
- Updated `CLAUDE.md` with strict content safety and Indian compliance instructions.
- Updated `PROGRESS.md` with the merged single-platform strategy direction.

### Notes
- AniManga Hub remains one unified platform.
- The project must remain legal, non-explicit, non-piracy, and safety-first.
- Public comments, marketplace features, and mature-theme community features must not launch before moderation and policy controls exist.
- Before launch, policies and public legal pages should be reviewed by a qualified Indian cyber-law lawyer.

---
## [2026-05-07] - Documentation summary through beta 9
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Project Documentation
**Commit:** `docs: summarize progress through beta 9`

### Added
- `docs/project-summary.md` summarizing work completed through `v0.1.0-beta.9`.

### Changed
- Updated `README.md` with current stable beta and local development status.
- Updated `PROGRESS.md` with completed Phase 1C, Phase 1D, and Phase 1E work.
- Updated `ROADMAP.md` with Phase 1 progress snapshot and remaining priorities.

### Notes
- Current stable beta is `v0.1.0-beta.9`.
- Next recommended maintenance task is workflow idempotency for cleanup and tagging.

---


## [2026-05-07] - Phase 1E: Frontend cache debug visibility
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1E - Frontend Cache Debug Visibility
**Commit:** `feat: add phase 1e frontend cache debug visibility`

### Added
- Development-only frontend cache debug panel.
- Frontend cache health and stats API helpers.
- Cache health/stat response types.
- `docs/frontend-cache-debug.md`.

### Changed
- Root layout now renders the cache debug panel during local development only.

### Notes
- Debug UI is hidden outside `NODE_ENV=development`.
- This helps inspect SQLite cache behavior without exposing debug controls to normal users.

---


## [2026-05-07] - Workflow verify action
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add verification action to dev workflow`

### Added
- `verify` action in `scripts/dev-workflow.ps1`.
- Documentation for one-command local and remote repository verification.

### Notes
- This reduces repeated manual verification commands after cleanup and beta tagging.

---


## [2026-05-07] - Phase 1D: Cache observability
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1D - Cache Observability
**Commit:** `feat: add phase 1d cache observability`

### Added
- `GET /api/cache/health` cache health endpoint.
- `GET /api/cache/stats` cache stats endpoint.
- `DELETE /api/cache` and `POST /api/cache/clear` local cache clear endpoints.
- `docs/cache-observability.md` with local cache debugging instructions.

### Changed
- Backend health endpoint now reports Phase 1D.
- Cache service now logs cache hit, miss, and stale events.
- Cache service now exposes health, stats, and clear helpers.

### Notes
- Cache clearing is blocked when `NODE_ENV=production`.
- This phase improves local developer observability before adding admin UI.

---


## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---
## [2026-05-07] - Phase 1C: Local SQLite database caching
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - MVP Catalog
**Commit:** `feat: add phase 1c database caching`

### Added
- Local SQLite datasource for Prisma development.
- `ApiCache` model for cache-first Jikan responses.
- Prisma migration for local cache storage.
- `backend/src/services/cacheService.ts` cache helper.
- Cache-first anime and manga service methods.

### Changed
- Anime, manga, detail, and search service calls now use cache-first fetching.
- `.env.example` now documents local SQLite development.
- `.gitignore` now excludes local SQLite database files.
- `PROGRESS.md` updated for Phase 1C.

### Notes
- This keeps development free and local.
- Hosted PostgreSQL remains a future deployment step.
- After merge and local verification, tag this build as `v0.1.0-beta.5`.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] - Deployment jobs disabled until hosting setup
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `fix: disable deployment jobs until hosting is configured`

### Changed
- `.github/workflows/deploy.yml` - kept lint/type-check active while disabling Vercel and Railway deployment jobs.

### Notes
- Deployment is deferred until Vercel/Railway hosting is intentionally configured.
- Future required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RAILWAY_TOKEN`.
- Local development and GitHub quality checks continue normally.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] â€” Phase 1B: Detail pages and search
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati  
**Phase:** Phase 1 â€” MVP Catalog  
**Commit:** `feat: phase 1b detail pages and search`

### Added
- Backend anime detail route: `GET /api/anime/:id`
- Backend manga detail route: `GET /api/manga/:id`
- Backend search route: `GET /api/search?q=...`
- Frontend anime detail page: `/anime/[id]`
- Frontend manga detail page: `/manga/[id]`
- Frontend search page: `/search?q=...`
- Reusable `SearchBox` component
- Reusable `DetailHero` component

### Changed
- Catalog cards are now clickable and route to detail pages.
- Header and homepage include search entry points.
- Jikan mapper now supports detail metadata such as genres, themes, demographics, rating, source, episodes, chapters, and volumes.
- Backend health endpoint now reports Phase `1B`.

### Notes
- This phase still uses live Jikan public API data.
- Local database caching remains pending for a later Phase 1B/1C iteration.
- After merge and verification, create `v0.1.0-beta.2` as the next rollback-safe beta tag.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] - Deployment jobs disabled until hosting setup
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `fix: disable deployment jobs until hosting is configured`

### Changed
- `.github/workflows/deploy.yml` - kept lint/type-check active while disabling Vercel and Railway deployment jobs.

### Notes
- Deployment is deferred until Vercel/Railway hosting is intentionally configured.
- Future required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RAILWAY_TOKEN`.
- Local development and GitHub quality checks continue normally.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] â€” Versioning and rollback workflow
**Agent/Author:** ChatGPT + Human: MrLluminati  
**Phase:** Phase 1 â€” MVP Catalog / Project Operations  
**Commit:** `docs: add beta versioning and rollback workflow`

### Added
- `docs/versioning.md` â€” beta release tag policy, rollback workflow, PowerShell Git commands, and safe recovery rules.

### Changed
- `PROGRESS.md` â€” noted Phase 1A merge and `v0.1.0-beta.1` rollback tag.

### Notes
- `v0.1.0-beta.1` is the first rollback-safe beta release.
- Project workflow is PowerShell-first for Windows local development.
- Future milestones should be merged through PRs and tagged after stable verification.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] - Deployment jobs disabled until hosting setup
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `fix: disable deployment jobs until hosting is configured`

### Changed
- `.github/workflows/deploy.yml` - kept lint/type-check active while disabling Vercel and Railway deployment jobs.

### Notes
- Deployment is deferred until Vercel/Railway hosting is intentionally configured.
- Future required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RAILWAY_TOKEN`.
- Local development and GitHub quality checks continue normally.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] â€” Phase 1A: Working skeleton
**Agent/Author:** GPT-5.5 Thinking
**Phase:** Phase 1 â€” MVP Catalog
**Commit:** `feat: phase 1a working skeleton`

### Added
- `frontend/package.json` â€” Next.js 14, React, TypeScript, Tailwind scripts and dependencies
- `frontend/src/app/layout.tsx` â€” root app shell
- `frontend/src/app/page.tsx` â€” homepage with anime and manga sections
- `frontend/src/app/anime/page.tsx` â€” anime catalog surface
- `frontend/src/app/manga/page.tsx` â€” manga catalog surface
- `frontend/src/app/globals.css` â€” Tailwind global styling
- `frontend/src/components/layout/Header.tsx` â€” navigation header
- `frontend/src/components/layout/Footer.tsx` â€” footer with legal-positioning note
- `frontend/src/components/ui/TitleCard.tsx` â€” reusable catalog card
- `frontend/src/lib/api.ts` â€” frontend API client
- `frontend/src/types/catalog.ts` â€” shared catalog title type
- `backend/package.json` â€” Express, TypeScript, Prisma scripts and dependencies
- `backend/src/index.ts` â€” Express entry point with Helmet, CORS, JSON middleware, and health route
- `backend/src/routes/anime.ts` â€” anime routes
- `backend/src/routes/manga.ts` â€” manga routes
- `backend/src/controllers/animeController.ts` â€” anime request controller
- `backend/src/controllers/mangaController.ts` â€” manga request controller
- `backend/src/services/animeService.ts` â€” anime service using Jikan
- `backend/src/services/mangaService.ts` â€” manga service using Jikan
- `backend/src/lib/jikan.ts` â€” Jikan API wrapper with basic rate limiting
- `backend/src/lib/prisma.ts` â€” Prisma singleton
- `backend/prisma/schema.prisma` â€” initial schema for anime, manga, legal links, and cross-links
- `backend/prisma/seed.ts` â€” placeholder seed script
- `APPLY_PHASE_1A_POWERSHELL.md` â€” Windows PowerShell application guide

### Changed
- `PROGRESS.md` â€” moved active phase to Phase 1 and marked Phase 1A skeleton items complete

### Removed
- Nothing

### Notes
- The GitHub integration had read access but write attempts failed with `403 Resource not accessible by integration`, so the change was prepared as a ZIP patch for manual application.
- Phase 1B should add detail pages, search, filters, and database caching.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] - Deployment jobs disabled until hosting setup
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `fix: disable deployment jobs until hosting is configured`

### Changed
- `.github/workflows/deploy.yml` - kept lint/type-check active while disabling Vercel and Railway deployment jobs.

### Notes
- Deployment is deferred until Vercel/Railway hosting is intentionally configured.
- Future required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RAILWAY_TOKEN`.
- Local development and GitHub quality checks continue normally.

---

## [2026-05-07] - Reusable PowerShell development workflow
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati
**Phase:** Phase 1 - Project Operations
**Commit:** `chore: add reusable PowerShell development workflow`

### Added
- `scripts/dev-workflow.ps1` - reusable PowerShell 7 helper for branch start, validation, post-merge cleanup, tagging, and status checks.
- `docs/workflow.md` - documented mandatory branch, PR, validation, cleanup, and beta-tag workflow.

### Notes
- PR title and PR description are mandatory for future project work.
- PowerShell 7 is the required shell for local patch and workflow scripts.
- The helper script reduces repeated manual Git and validation commands.

---

## [2026-05-07] â€” Phase 0: Foundation scaffold
**Agent/Author:** Claude Sonnet 4.6
**Phase:** Phase 0 â€” Foundation
**Commit:** `chore: phase 0 foundation â€” repo scaffold, docs, CI/CD`

### Added
- `README.md` â€” full project overview, tech stack, local setup guide, deployment instructions
- `CLAUDE.md` â€” AI agent instructions: stack rules, folder conventions, DB schema targets, commands, phase status table
- `PROGRESS.md` â€” running build log with phase-by-phase checklist
- `ROADMAP.md` â€” full feature backlog across all 5 phases with vision statement
- `CHANGELOG.md` â€” this file; sync log for all agents and contributors
- `.env.example` â€” all environment variables documented with step-by-step instructions for obtaining each value
- `.gitignore` â€” covers Node.js, Next.js, Prisma, OS files, editor dirs, secrets
- `docs/architecture.md` â€” documented why each technology was chosen
- `docs/api.md` â€” quick reference for Jikan, AniList, MangaDex, Kitsu APIs
- `frontend/README.md` â€” Next.js setup command and expected folder structure for Phase 1
- `backend/README.md` â€” Express + Prisma setup commands and expected folder structure for Phase 1
- `database/migrations/README.md` â€” migration naming convention and Prisma workflow
- `database/seeds/README.md` â€” seed file plan for Phase 1
- `.github/workflows/deploy.yml` â€” CI/CD pipeline scaffold

### Notes
- Phase 1 (MVP Catalog) is ready to begin.
