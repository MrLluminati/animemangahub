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



