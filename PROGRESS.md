# PROGRESS.md — Build Log

A running log of what's been completed, decisions made, and what comes next. Update this every session.

---

## Current Status

**Active Phase:** Phase 1 — MVP Catalog and UI/Product Polish
**Current stable beta:** `v0.1.0-beta.14`
**Latest maintenance:** PR #33 — CTA button spacing polish
**Next Up:** Complete cross-reference light-theme readability QA, then tag v0.1.0-beta.15

---

## Phase 0 — Foundation ✅

### Completed
- [x] GitHub repo structure created
- [x] `README.md` — full project overview and setup guide
- [x] `CLAUDE.md` — AI agent instructions and project context
- [x] `PROGRESS.md` — this file
- [x] `ROADMAP.md` — full feature backlog
- [x] `.env.example` — all required environment variables documented
- [x] `.gitignore` — comprehensive ignore rules
- [x] `docs/architecture.md` — technology decisions explained
- [x] `docs/api.md` — external API reference
- [x] `database/migrations/` — folder ready for SQL migrations
- [x] `database/seeds/` — folder ready for seed scripts
- [x] `.github/workflows/deploy.yml` — CI/CD pipeline scaffold
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

## Phase 1 — MVP Catalog 🔲

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

### Completed in Phase 1F
- [x] Merge Anime Culture Platform strategy into AniManga Hub as a single-platform direction
- [x] Add content safety policy, editorial policy, moderation policy, and legal watch/read link policy
- [x] Make workflow cleanup and tagging idempotent
- [x] Genre, year, and status filters
- [x] "Where to Watch" official-source discovery links
- [x] "Where to Read" official-source discovery links
- [x] AniPulse reusable theme foundation
- [x] Ranked search suggestions
- [x] Search sort modes: relevance, popularity, score, and year
- [x] Search UI polish for portal suggestions, dropdown width, scroll behavior, and sort dropdown
- [x] Dev-console cleanup for favicon and LCP image priority warnings

### To Build Next
- [x] Anime ↔ Manga cross-reference display
- [ ] Catalog pagination and sorting improvements
- [ ] Continue AniPulse visual polish across catalog and detail pages
- [ ] Deployed to Vercel + Railway when hosting budget/secrets are ready

---

## Phase 2 — User Accounts & Community 🔲

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

## Phase 3 — Monetization 🔲

### To Build
- [ ] Ad slot placements in layout
- [ ] Google AdSense integration
- [ ] Affiliate links
- [ ] Stripe subscription setup
- [ ] Free vs Premium tier logic

---

## Phase 4 — Growth & SEO 🔲

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

## Phase 5 — Licensing & Partnerships 🔲

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
| 2026-05-17 | Added genre, year, and status filters for anime and manga catalog pages |
| 2026-05-17 | Added official-platform legal watch/read discovery links to anime and manga detail pages |
| 2026-05-17 | Added AniPulse reusable theme foundation with dark/light mode support |
| 2026-05-17 | Stabilized AniPulse live verification issues for theme persistence, header responsiveness, mobile navigation, search accessibility, and app icon support |
| 2026-05-17 | Repaired AniPulse client interactions for theme toggle, mobile drawer, search fallback, and footer completeness |
| 2026-05-17 | Improved AniPulse fonts, light-mode readability, pre-hydration theme loading, and mobile drawer behavior |
| 2026-05-17 | Live-verified and tagged AniPulse theme foundation as `v0.1.0-beta.13` |
| 2026-05-18 | Synchronized documentation through `v0.1.0-beta.13`; next issue is short search query handling |
| 2026-05-18 | Improved short search query handling with resilient combined search, serialized Jikan requests, no-store frontend search fetches, and clearer single-character query behavior |
| 2026-05-18 | Added ranked search results, search sort modes, and top-three autocomplete suggestions |
| 2026-05-18 | Fixed search suggestion layout and replaced separate sort buttons with a dropdown |
| 2026-05-18 | Moved search suggestions into a portal overlay so dropdowns no longer expand the navbar and match input width only |
| 2026-05-18 | Strengthened search suggestion portal visibility, z-index, viewport clamping, and pointer handling |
| 2026-05-18 | Updated search suggestions to close on page scroll so portal dropdowns do not float above the navbar |
| 2026-05-18 | Tagged `v0.1.0-beta.14` for ranked search suggestions and began cleanup of non-blocking dev console warnings |
| 2026-05-21 | Merged PR #30 dev-console cleanup: favicon route, metadata icon declarations, and LCP image priority support |
| 2026-05-21 | Synchronized documentation after `v0.1.0-beta.14` and PR #30 maintenance |
| 2026-05-22 | Mobile QA found image optimizer 500s and suggestion 502s; added reliability fixes for external images, stale-cache fallback, and soft-failing suggestions |
| 2026-05-22 | Tight homepage CTA button padding found during visual QA; increased reusable ThemeButton padding, minimum height, and CTA pair spacing |
| 2026-06-24 | Added anime ↔ manga cross-reference display with cached relation endpoints and reusable related-title UI |
| 2026-06-24 | Improved light-theme readability for related-title cross-reference cards after live QA |
