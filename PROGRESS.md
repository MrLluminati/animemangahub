# PROGRESS.md — Build Log

A running log of what's been completed, decisions made, and what comes next. Update this every session.

---

## Current Status

**Active Phase:** Phase 0 — Foundation  
**Next Up:** Phase 1 — MVP Catalog

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
- [x] Frontend folder scaffolded (Next.js structure)
- [x] Backend folder scaffolded (Express structure)

### Decisions Made
- **Next.js 14 App Router** chosen over Pages Router for better performance and future-proofing
- **Prisma** chosen as ORM for type-safe DB access and easy migrations
- **Railway** chosen for backend/DB hosting (generous free tier, simple deploys)
- **Vercel** chosen for frontend (native Next.js support, instant deploys from GitHub)
- **Jikan API** as primary data source (no key required, comprehensive MAL data)
- **Tailwind CSS** for styling (utility-first, great with Next.js, no CSS bloat)

---

## Phase 1 — MVP Catalog 🔲

### To Build
- [ ] Next.js app initialised (`npx create-next-app`)
- [ ] Tailwind CSS configured
- [ ] Express backend initialised
- [ ] Prisma schema defined
- [ ] First migration run
- [ ] Homepage with featured/trending anime+manga
- [ ] Anime listing page with filters (genre, status, year)
- [ ] Manga listing page with filters
- [ ] Anime detail page (synopsis, episodes, cast, where to watch)
- [ ] Manga detail page (synopsis, chapters, where to read)
- [ ] Search bar with live results
- [ ] "Where to Watch" link system
- [ ] "Where to Read" link system
- [ ] Anime ↔ Manga cross-reference display
- [ ] Deployed to Vercel + Railway

---

## Phase 2 — User Accounts & Community 🔲

### To Build
- [ ] NextAuth.js setup (Google + Discord)
- [ ] User profile page
- [ ] Watchlist (add anime with status: watching/completed/dropped)
- [ ] Reading list (same for manga)
- [ ] Star ratings (1–10)
- [ ] Written reviews
- [ ] Discussion threads per title
- [ ] User avatar + bio

---

## Phase 3 — Monetization 🔲

### To Build
- [ ] Ad slot placements in layout
- [ ] Google AdSense integration
- [ ] Affiliate links for Crunchyroll, Viz, etc.
- [ ] Stripe subscription setup
- [ ] Free vs Premium tier logic
- [ ] Premium: ad-free experience
- [ ] Premium: advanced filters and sorting
- [ ] Subscription management page

---

## Phase 4 — Growth & SEO 🔲

### To Build
- [ ] Dynamic sitemap generation
- [ ] SEO meta tags on all pages
- [ ] Structured data (JSON-LD) for Google
- [ ] Seasonal anime chart
- [ ] Countdown timers for new episodes
- [ ] Email newsletter (Resend API)
- [ ] Recommendation engine ("you might also like")
- [ ] React Native mobile app
- [ ] Social sharing cards (Open Graph)

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

_Add a row after each work session._
