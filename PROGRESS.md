# PROGRESS.md — Build Log

A running log of what's been completed, decisions made, and what comes next. Update this every session.

---

## Current Status

**Active Phase:** Phase 1 — MVP Catalog and UI/Product Polish  
**Previous stable website beta:** `v0.1.0-beta.15`  
**Release candidate:** `v0.1.0-beta.16`  
**Release documentation merge:** PR #39 at `b4acf0af1f7166c4301f888f2d108253f7d01e49`  
**Website Status:** Fully resumed  
**Shorts Status:** Separate local-only production workstream excluded from GitHub  
**Deployment Status:** Disabled until hosting and production secrets are configured  
**Next Up:** Create the annotated `v0.1.0-beta.16` tag from updated `main` after the final status-sync pull request passes CI and merges.

### beta.16 Release Review — 2026-07-19

- [x] PR #36 merged: Shorts/Reels production workspace excluded from Git except the approved unified frame.
- [x] PR #37 merged: AniManga Wire website rebrand completion, detail ordering, social links, mobile overflow fix, and search accessibility fixes.
- [x] PR #38 merged: validated transparent branding masters, derivatives, aliases, and theme-aware surface selection.
- [x] PR #39 merged: beta.16 release record, operational handoff, preserved build log, and versioning instructions integrated.
- [x] Anime ↔ manga cross-references remain implemented from `v0.1.0-beta.15`.
- [x] Frontend type-check, lint, and production build passed.
- [x] Backend type-check passed in GitHub Actions.
- [x] Desktop/mobile browser QA passed in light and dark themes.
- [x] Search input, Search button, native keyboard activation, suggestion navigation, theme persistence, and zero-overflow checks passed.
- [x] Corrected PNG decoding, alpha, border, geometry, and alias-integrity gates passed.
- [x] `main` verified identical to `708e2d4186096ba61df080dd5f0e5b094e20d384` before release preparation.
- [x] `v0.1.0-beta.16` verified absent before release preparation.
- [x] Jikan public v4 anime endpoints returned populated JSON again on July 19 after the July 18 upstream failures.
- [ ] Create the annotated `v0.1.0-beta.16` tag at the final status-sync merge commit.

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
- [x] Anime listing page added
- [x] Manga listing page added
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
- [x] AniManga Wire ink-paper brand shell
- [x] Ranked search suggestions
- [x] Search sort modes: relevance, popularity, score, and year
- [x] Search UI polish for dropdown width, scroll behavior, DOM order, and sort controls
- [x] Dev-console cleanup for favicon and LCP image priority warnings
- [x] Anime ↔ manga cross-reference display
- [x] Reorder anime and manga detail sections to Hero → Availability → Related Titles
- [x] Add accessible footer links for official YouTube and Instagram profiles
- [x] Complete website rebrand maintenance for the `v0.1.0-beta.16` candidate
- [x] Run backend-supported anime and manga detail-page smoke tests
- [x] Complete dark-theme, light-theme, mobile, search, image, availability-link, and related-title-link validation
- [x] Resolve mobile page-wide horizontal overflow
- [x] Replace contaminated transparent branding assets with validated light/dark/red masters and deterministic derivatives
- [x] Integrate theme-aware branding aliases and public assets
- [x] Verify a clean remote release scope through PR #38 and post-merge checks
- [x] Integrate beta.16 release documentation through PR #39

### To Build Next
- [ ] Create the annotated `v0.1.0-beta.16` tag from updated `main`
- [ ] Catalog pagination improvements
- [ ] Catalog sorting improvements beyond search-result sorting
- [ ] Continue AniManga Wire visual polish across catalog and detail pages
- [ ] Consider dedicated Arrow Up/Down active-suggestion highlighting
- [ ] Create a genuine editable/vector branding source
- [ ] Deploy to Vercel + Railway when hosting budget and production secrets are ready

> Website development is fully resumed. Shorts/Reels remains a separate local-only workstream; only `shorts/assets/frames/amw-shorts-unified-frame-v1.png` is versioned from inside `shorts/`.

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
| 2026-06-24 | Integrated locked AniManga Wire branding, public assets, metadata, and logo assets into the existing catalog app |
| 2026-06-24 | Put website development on hold and created the Shorts/Reels workspace with first AMW sample render |
| 2026-07-18 | Ended the historical website hold and fully resumed Phase 1 website work toward `v0.1.0-beta.16` |
| 2026-07-18 | Merged PR #36 to keep Shorts production local-only while retaining the approved unified frame |
| 2026-07-18 | Merged PR #37 to complete the website rebrand, detail ordering, social links, responsive fixes, and search accessibility |
| 2026-07-19 | Merged PR #38 with corrected transparent branding masters, derivatives, aliases, and theme-aware logo selection |
| 2026-07-19 | Merged PR #39 with beta.16 release notes, handoff, progress, and versioning documentation |
