# AniManga Hub Project Summary

Current stable beta: `v0.1.0-beta.13`

This document summarizes the work completed so far and the next planned tasks for AniManga Hub.

---

## Completed So Far

### Phase 0 — Foundation

- Repository structure created.
- Core documentation added: `README.md`, `CLAUDE.md`, `PROGRESS.md`, `ROADMAP.md`.
- Frontend and backend folders scaffolded.
- CI/CD workflow scaffolded.
- Initial environment and ignore files documented.

### Phase 1A — Working Skeleton

- Next.js frontend created.
- Express backend created.
- TypeScript configured for frontend and backend.
- Jikan API wrapper added.
- Anime trending and manga top routes added.
- Homepage, anime listing page, and manga listing page added.
- Header/footer layout added.
- Initial Prisma schema defined.
- Rollback tag: `v0.1.0-beta.1`.

### Phase 1B — Detail Pages and Search

- Anime detail API and page added.
- Manga detail API and page added.
- Combined search API and search page added.
- Catalog cards made clickable.
- Search box added to header and homepage.
- Next.js image host configuration fixed for MyAnimeList image URLs.
- Rollback tags: `v0.1.0-beta.2` through `v0.1.0-beta.4`.

### Phase 1C — Local SQLite Database Caching

- Prisma `ApiCache` model added.
- Local SQLite caching added for Jikan API responses.
- Cache-first fetching added to anime and manga services.
- Local database migration added.
- Rollback tag: `v0.1.0-beta.5`.

### Phase 1D — Cache Observability

- Cache health endpoint added: `GET /api/cache/health`.
- Cache stats endpoint added: `GET /api/cache/stats`.
- Local cache clear endpoints added: `DELETE /api/cache` and `POST /api/cache/clear`.
- Cache hit, miss, and stale logs added.
- Cache observability documentation added.
- Rollback tag: `v0.1.0-beta.7`.

### Phase 1E — Frontend Cache Debug Visibility

- Development-only cache debug panel added to the frontend.
- Frontend cache health/stats API helpers added.
- Cache response types added.
- Local visual test confirmed the panel shows cache totals, fresh entries, expired entries, and recent cache keys.
- Rollback tag: `v0.1.0-beta.9`.

### Phase 1F — Workflow Hardening

- Reusable PowerShell workflow made safer for repeated cleanup and tagging.
- Post-merge cleanup handles already-deleted branches.
- Tagging handles existing local/remote tags idempotently.
- Rollback tag: `v0.1.0-beta.10`.

### Phase 1G — Catalog Filters

- Genre, year, and status filters added to anime and manga catalog pages.
- Frontend catalog pages support query-string filter state.
- Backend filter routes added for anime and manga.
- Rollback tag: `v0.1.0-beta.11`.

### Phase 1H — Official-Source Discovery Links

- Anime detail pages include "Where to watch" official-source discovery links.
- Manga detail pages include "Where to read" official-source discovery links.
- UI wording was softened to avoid heavy compliance language while preserving safe-link direction.
- Rollback tag: `v0.1.0-beta.12`.

### Phase 1I — AniPulse Theme Foundation

- AniPulse theme direction selected as the reusable commercial theme system.
- Dark mode: Tokyo Night / Modern Japan Night Life.
- Light mode: Vintage Day / Vintage Japan Day Life.
- Theme provider, theme toggle, app shell, responsive header, mobile drawer, footer, global tokens, and theme primitives added.
- Epilogue, Hanken Grotesk, and Space Grotesk loaded through `next/font/google`.
- Light-mode readability improved for the homepage, search box, and catalog title cards.
- Live testing confirmed toggle behavior, persisted mode, right-side mobile drawer, readable light mode, and no `_next/static/chunks` client-hydration errors after a clean dev restart.
- Rollback tag: `v0.1.0-beta.13`.

### Project Operations

- PowerShell 7 workflow script added at `scripts/dev-workflow.ps1`.
- Workflow actions added for branch start, validation, post-merge cleanup, beta tagging, status, and verification.
- Mandatory PR title and PR description rule documented.
- Deployment intentionally deferred until Vercel/Railway hosting and secrets are ready.

---

## Current Stable State

`main` is stable through the AniPulse theme foundation.

The current rollback-safe beta tag is:

```text
v0.1.0-beta.13
```

Current local development status:

- Backend runs on `http://localhost:4000`.
- Frontend runs on `http://localhost:3000`.
- SQLite cache is active for local development.
- Development-only cache debug panel appears in frontend development mode.
- AniPulse dark/light mode is active in the app shell.
- Theme preference persists across refresh.
- Mobile navigation opens as a right-side drawer.
- Homepage and catalog title cards are readable in light mode.

---

## Remaining Phase 1 Work

Recommended next tasks:

1. Improve short search query handling.
2. Continue AniPulse visual polish across catalog and detail pages.
3. Add anime-to-manga cross-reference display.
4. Improve catalog pagination and sorting.
5. Keep deployment deferred until hosting budget and secrets are ready.

---

## Known Issues

### Short search query handling

Current verified behavior:

- Search for `One Piece` returns results.
- Search for `One` may return no results.

This should be investigated as a separate backend/frontend search-handling task.

---

## Future Deployment Notes

Deployment should remain disabled until the project is ready for hosting costs and production secrets.

Future deployment targets remain:

- Frontend: Vercel
- Backend: Railway
- Production database: hosted PostgreSQL

Required future secrets:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
RAILWAY_TOKEN
```
