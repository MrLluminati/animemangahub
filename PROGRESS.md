# PROGRESS.md â€” Build Log

A running log of what's been completed, decisions made, and what comes next. Update this every session.

---

## Current Status

**Active Phase:** Phase 1 — MVP Catalog
**Next Up:** Workflow hardening, then filters and legal watch/read links

---

## Phase 0 â€” Foundation âœ…

### Completed
- [x] GitHub repo structure created
- [x] `README.md` â€” full project overview and setup guide
- [x] `CLAUDE.md` â€” AI agent instructions and project context
- [x] `PROGRESS.md` â€” this file
- [x] `ROADMAP.md` â€” full feature backlog
- [x] `.env.example` â€” all required environment variables documented
- [x] `.gitignore` â€” comprehensive ignore rules
- [x] `docs/architecture.md` â€” technology decisions explained
- [x] `docs/api.md` â€” external API reference
- [x] `database/migrations/` â€” folder ready for SQL migrations
- [x] `database/seeds/` â€” folder ready for seed scripts
- [x] `.github/workflows/deploy.yml` â€” CI/CD pipeline scaffold
- [x] Frontend folder scaffolded
- [x] Backend folder scaffolded

### Decisions Made
- **Next.js 14 App Router** chosen over Pages Router for better performance and future-proofing
- **Prisma** chosen as ORM for type-safe DB access and easy migrations
- **Railway** chosen for backend/DB hosting
- **Vercel** chosen for frontend
- **Jikan API** as primary data source
- **Tailwind CSS** for styling

---

## Phase 1 â€” MVP Catalog ðŸ”²

### Completed in Phase 1A
- [x] Next.js app initialised manually inside `/frontend`
- [x] Tailwind CSS configured
- [x] Express backend initialised inside `/backend`
- [x] TypeScript configured for frontend and backend
- [x] Backend health route added at `/api/health`
- [x] Jikan API wrapper added with basic rate limiting
- [x] Anime trending route added at `/api/anime/trending`
- [x] Manga top route added at `/api/manga/top`
- [x] Homepage created with anime and manga sections
- [x] Anime listing page created
- [x] Manga listing page created
- [x] Header/footer layout added
- [x] Initial Prisma schema defined

### Completed in Phase 1B
- [x] Anime detail API route added at `/api/anime/:id`
- [x] Manga detail API route added at `/api/manga/:id`
- [x] Combined search API route added at `/api/search?q=...`
- [x] Anime detail page added at `/anime/[id]`
- [x] Manga detail page added at `/manga/[id]`
- [x] Search results page added at `/search?q=...`
- [x] Catalog cards made clickable
- [x] Search box added to header and homepage


### Completed in Phase 1C
- [x] Prisma `ApiCache` model added
- [x] Local SQLite cache added for Jikan API responses
- [x] Cache-first fetching added to anime and manga services
- [x] Local database migration added

### Completed in Phase 1D
- [x] Cache health endpoint added at `/api/cache/health`
- [x] Cache stats endpoint added at `/api/cache/stats`
- [x] Local cache clear endpoints added at `/api/cache` and `/api/cache/clear`
- [x] Cache hit, miss, and stale logs added
- [x] Cache observability documentation added

### Completed in Phase 1E
- [x] Development-only frontend cache debug panel added
- [x] Frontend cache health/stats API helpers added
- [x] Cache response types added
- [x] Local visual cache debug test completed
### To Build Next
- [x] Merge Anime Culture Platform strategy into AniManga Hub as a single-platform direction
- [x] Add content safety policy, editorial policy, moderation policy, and legal watch/read link policy
- [x] Make workflow cleanup and tagging idempotent
- [ ] Genre, year, and status filters
- [ ] "Where to Watch" link system
- [ ] "Where to Read" link system
- [ ] Anime ↔ Manga cross-reference display
- [ ] Catalog pagination and sorting improvements
- [ ] Deployed to Vercel + Railway when hosting budget/secrets are ready

---

## Phase 2 â€” User Accounts & Community ðŸ”²

### To Build
- [ ] NextAuth.js setup (Google + Discord)
- [ ] User profile page
- [ ] Watchlist
- [ ] Reading list
- [ ] Star ratings
- [ ] Written reviews
- [ ] Discussion threads per title
- [ ] User avatar + bio

---

## Phase 3 â€” Monetization ðŸ”²

### To Build
- [ ] Ad slot placements in layout
- [ ] Google AdSense integration
- [ ] Affiliate links
- [ ] Stripe subscription setup
- [ ] Free vs Premium tier logic

---

## Phase 4 â€” Growth & SEO ðŸ”²

### To Build
- [ ] Dynamic sitemap generation
- [ ] SEO meta tags on all pages
- [ ] Structured data (JSON-LD)
- [ ] Seasonal anime chart
- [ ] Countdown timers
- [ ] Email newsletter
- [ ] Recommendation engine
- [ ] React Native mobile app
- [ ] Social sharing cards

---

## Phase 5 â€” Licensing & Partnerships ðŸ”²

### To Build
- [ ] Embedded licensed video player
- [ ] Publisher/studio dashboard
- [ ] Sponsored listing system
- [ ] Premium streaming tier
- [ ] Partner API

---

## Session Log

| Date | What Was Done |
|---|---|
| Phase 0 start | Repo structure, all foundation files created |
| 2026-05-07 | Phase 1A working skeleton prepared: frontend, backend, Jikan routes, Prisma schema, homepage, anime/manga pages |
| 2026-05-07 | Phase 1A merged into `main`; created rollback-safe beta tag `v0.1.0-beta.1`; added documentation plan for beta versioning and rollback workflow |
| 2026-05-07 | Phase 1B prepared: detail pages, clickable cards, combined search, and expanded Jikan metadata mapping |
| 2026-05-07 | Disabled deployment jobs until Vercel/Railway hosting is configured; lint/type-check remains active in GitHub Actions |

| 2026-05-07 | Phase 1C local SQLite caching added with Prisma ApiCache, cache-first Jikan fetching, local migration, and validation workflow |
| 2026-05-07 | Added reusable PowerShell 7 development workflow script and documented mandatory PR, validation, cleanup, and beta-tag process |
| 2026-05-07 | Phase 1D cache observability added: cache health, stats, clear endpoints, cache logs, and documentation |
| 2026-05-07 | Added verify action to reusable PowerShell workflow for one-command repository, branch, commit, and tag verification |
| 2026-05-07 | Phase 1E frontend cache debug visibility added with development-only cache panel, frontend cache API helpers, and documentation |
| 2026-05-07 | Summarized completed work through `v0.1.0-beta.9` and documented remaining Phase 1 priorities |
| 2026-05-17 | Merged Anime Culture Platform strategy into AniManga Hub as a single-platform direction |
| 2026-05-17 | Made workflow cleanup and tagging idempotent for repeated post-merge and beta-tag commands |
