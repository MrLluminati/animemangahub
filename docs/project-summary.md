# AniManga Hub Project Summary

Current stable beta: `v0.1.0-beta.9`

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

### Project Operations

- PowerShell 7 workflow script added at `scripts/dev-workflow.ps1`.
- Workflow actions added for branch start, validation, post-merge cleanup, beta tagging, status, and verification.
- Mandatory PR title and PR description rule documented.
- Deployment intentionally deferred until Vercel/Railway hosting and secrets are ready.

---

## Current Stable State

`main` is stable through Phase 1E.

The current rollback-safe beta tag is:

```text
v0.1.0-beta.9
```

Current local development status:

- Backend runs on `http://localhost:4000`.
- Frontend runs on `http://localhost:3000`.
- SQLite cache is active for local development.
- Development-only cache debug panel appears in frontend development mode.

---

## Remaining Phase 1 Work

Recommended next tasks:

1. Make workflow cleanup and tagging idempotent.
2. Add genre, year, and status filters.
3. Add legal “Where to Watch” links.
4. Add legal “Where to Read” links.
5. Add anime-to-manga cross-reference display.
6. Improve catalog pagination and sorting.
7. Keep deployment deferred until hosting budget and secrets are ready.

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
