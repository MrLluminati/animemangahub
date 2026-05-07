# CHANGELOG

All notable changes to AniManga Hub are logged here.
Every agent or developer MUST add an entry before pushing to `main`.

Format:
```text
## [YYYY-MM-DD] — Short title
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

## [2026-05-07] — Phase 1B: Detail pages and search
**Agent/Author:** GPT-5.5 Thinking + Human: MrLluminati  
**Phase:** Phase 1 — MVP Catalog  
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

## [2026-05-07] — Versioning and rollback workflow
**Agent/Author:** ChatGPT + Human: MrLluminati  
**Phase:** Phase 1 — MVP Catalog / Project Operations  
**Commit:** `docs: add beta versioning and rollback workflow`

### Added
- `docs/versioning.md` — beta release tag policy, rollback workflow, PowerShell Git commands, and safe recovery rules.

### Changed
- `PROGRESS.md` — noted Phase 1A merge and `v0.1.0-beta.1` rollback tag.

### Notes
- `v0.1.0-beta.1` is the first rollback-safe beta release.
- Project workflow is PowerShell-first for Windows local development.
- Future milestones should be merged through PRs and tagged after stable verification.

---

## [2026-05-07] — Phase 1A: Working skeleton
**Agent/Author:** GPT-5.5 Thinking
**Phase:** Phase 1 — MVP Catalog
**Commit:** `feat: phase 1a working skeleton`

### Added
- `frontend/package.json` — Next.js 14, React, TypeScript, Tailwind scripts and dependencies
- `frontend/src/app/layout.tsx` — root app shell
- `frontend/src/app/page.tsx` — homepage with anime and manga sections
- `frontend/src/app/anime/page.tsx` — anime catalog surface
- `frontend/src/app/manga/page.tsx` — manga catalog surface
- `frontend/src/app/globals.css` — Tailwind global styling
- `frontend/src/components/layout/Header.tsx` — navigation header
- `frontend/src/components/layout/Footer.tsx` — footer with legal-positioning note
- `frontend/src/components/ui/TitleCard.tsx` — reusable catalog card
- `frontend/src/lib/api.ts` — frontend API client
- `frontend/src/types/catalog.ts` — shared catalog title type
- `backend/package.json` — Express, TypeScript, Prisma scripts and dependencies
- `backend/src/index.ts` — Express entry point with Helmet, CORS, JSON middleware, and health route
- `backend/src/routes/anime.ts` — anime routes
- `backend/src/routes/manga.ts` — manga routes
- `backend/src/controllers/animeController.ts` — anime request controller
- `backend/src/controllers/mangaController.ts` — manga request controller
- `backend/src/services/animeService.ts` — anime service using Jikan
- `backend/src/services/mangaService.ts` — manga service using Jikan
- `backend/src/lib/jikan.ts` — Jikan API wrapper with basic rate limiting
- `backend/src/lib/prisma.ts` — Prisma singleton
- `backend/prisma/schema.prisma` — initial schema for anime, manga, legal links, and cross-links
- `backend/prisma/seed.ts` — placeholder seed script
- `APPLY_PHASE_1A_POWERSHELL.md` — Windows PowerShell application guide

### Changed
- `PROGRESS.md` — moved active phase to Phase 1 and marked Phase 1A skeleton items complete

### Removed
- Nothing

### Notes
- The GitHub integration had read access but write attempts failed with `403 Resource not accessible by integration`, so the change was prepared as a ZIP patch for manual application.
- Phase 1B should add detail pages, search, filters, and database caching.

---

## [2026-05-07] — Phase 0: Foundation scaffold
**Agent/Author:** Claude Sonnet 4.6
**Phase:** Phase 0 — Foundation
**Commit:** `chore: phase 0 foundation — repo scaffold, docs, CI/CD`

### Added
- `README.md` — full project overview, tech stack, local setup guide, deployment instructions
- `CLAUDE.md` — AI agent instructions: stack rules, folder conventions, DB schema targets, commands, phase status table
- `PROGRESS.md` — running build log with phase-by-phase checklist
- `ROADMAP.md` — full feature backlog across all 5 phases with vision statement
- `CHANGELOG.md` — this file; sync log for all agents and contributors
- `.env.example` — all environment variables documented with step-by-step instructions for obtaining each value
- `.gitignore` — covers Node.js, Next.js, Prisma, OS files, editor dirs, secrets
- `docs/architecture.md` — documented why each technology was chosen
- `docs/api.md` — quick reference for Jikan, AniList, MangaDex, Kitsu APIs
- `frontend/README.md` — Next.js setup command and expected folder structure for Phase 1
- `backend/README.md` — Express + Prisma setup commands and expected folder structure for Phase 1
- `database/migrations/README.md` — migration naming convention and Prisma workflow
- `database/seeds/README.md` — seed file plan for Phase 1
- `.github/workflows/deploy.yml` — CI/CD pipeline scaffold

### Notes
- Phase 1 (MVP Catalog) is ready to begin.
