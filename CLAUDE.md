# CLAUDE.md — AI Agent Instructions

This file tells AI agents (Claude, Cursor, Copilot, etc.) everything needed to contribute to this project effectively. Read this before touching any code.

---

## Project Overview

**AniManga Hub** — A non-explicit anime and manga culture, legal discovery, catalog, review, and fandom platform.

Users can search titles, see where to watch/read them legally, rate and review, maintain lists, and follow new releases. Future phases include subscriptions and licensed streaming.

**Current stable beta:** `v0.1.0-beta.9`

**Current phase:** Phase 1 — MVP Catalog and Legal Discovery

---

## Stack

| Layer | Tech | Notes |
|---|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS | App Router only — no Pages Router |
| Backend | Node.js, Express, TypeScript | REST API on port 4000 |
| Database | PostgreSQL | Migrations in `/database/migrations/` |
| ORM | Prisma | Schema at `/backend/prisma/schema.prisma` |
| Auth | NextAuth.js | Google + Discord providers |
| Payments | Stripe | Subscription billing only |
| Search | Meilisearch (Phase 4) | Full-text title search |
| Deployment | Vercel (FE) + Railway (BE + DB) | |

---

## The #1 Rule — CHANGELOG

**Every agent and every contributor MUST add a `CHANGELOG.md` entry before pushing to `main`.**

The changelog is how all agents stay in sync. An agent reading this repo cold should be able to open `CHANGELOG.md` and know exactly what was built last session, what decisions were made, and what to do next. Never skip this step.

---

## Content Safety and Compliance Rules

The project owner is based in India. Treat Indian legal/compliance risk seriously. Do not suggest that foreign hosting, foreign incorporation, or India geo-blocking alone removes Indian legal exposure.

Before public launch, the content policy, moderation policy, terms, privacy policy, affiliate disclosures, and legal-link policy should be reviewed by a qualified Indian cyber-law lawyer.

Do not suggest, implement, document as acceptable, monetize, index, link to, scrape, or promote hentai or pornographic anime content, hentai videos, adult anime video redirects, explicit anime thumbnails/screenshots, piracy links, torrent links, illegal manga/anime reader links, adult-site affiliate traffic, adult ad networks, NSFW creator commissions, loli/shota content, schoolgirl/schoolboy sexualized content, teen-coded sexual content, childlike or ambiguous-age characters in sexual contexts, incest, rape, coercion, non-consensual sexual themes, bestiality, abuse-themed sexual content, AI-generated sexual content involving youthful-looking characters, or any sexualization of minors, real or fictional.

Safe mature-theme commentary may discuss age ratings, censorship, themes, viewer discretion, fan-service as a trope, consent in storytelling, cultural context, platform classification, and Indian legal/cultural context. It must remain non-explicit and non-erotic.

## Absolute Rules

- **TypeScript everywhere** — no `.js` files in `frontend/` or `backend/src/`
- **Never commit secrets** — all keys go in `.env` (gitignored)
- **App Router only** — use `app/` directory in Next.js, not `pages/`
- **Server Components by default** — only add `"use client"` when you need interactivity
- **Prisma for all DB access** — no raw SQL queries except in migrations
- **API routes live in backend** — don't use Next.js API routes for data logic
- **Tailwind for styling** — no CSS modules, no styled-components
- **Conventional commits** — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`

---

## Folder Conventions

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Public pages (home, about)
│   ├── anime/              # Anime catalog + detail pages
│   ├── manga/              # Manga catalog + detail pages
│   ├── user/               # User profile, lists, settings
│   └── api/                # Next.js route handlers (auth only)
├── components/
│   ├── ui/                 # Generic reusable (Button, Card, Badge)
│   ├── anime/              # Anime-specific components
│   ├── manga/              # Manga-specific components
│   └── layout/             # Header, Footer, Sidebar
├── lib/                    # Utilities, API clients, helpers
├── types/                  # Shared TypeScript types
└── public/                 # Static assets

backend/
├── src/
│   ├── routes/             # Express route definitions
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── middleware/         # Auth, validation, rate limiting
│   ├── lib/                # External API clients (Jikan, AniList)
│   └── index.ts            # Entry point
└── prisma/
    └── schema.prisma       # Database schema
```

---

## External APIs Used

### Jikan (MyAnimeList)
- Base URL: `https://api.jikan.moe/v4`
- No API key required
- Rate limit: 3 requests/second, 60/minute
- Key endpoints: `/anime/{id}`, `/manga/{id}`, `/seasons/now`, `/top/anime`

### AniList (GraphQL)
- Endpoint: `https://graphql.anilist.co`
- No API key required
- Use for: trending, popular, seasonal charts

### MangaDex
- Base URL: `https://api.mangadex.org`
- No API key for public data
- Use for: manga covers, chapter counts

---

## Environment Variables

All required vars are in `.env.example`. Key ones:

```
DATABASE_URL          # PostgreSQL connection string
NEXTAUTH_SECRET       # Random 32-char string for session encryption
GOOGLE_CLIENT_ID      # From Google Cloud Console
GOOGLE_CLIENT_SECRET
DISCORD_CLIENT_ID     # From Discord Developer Portal
DISCORD_CLIENT_SECRET
STRIPE_SECRET_KEY     # From Stripe dashboard
STRIPE_WEBHOOK_SECRET # From Stripe webhook settings
NEXT_PUBLIC_API_URL   # Backend URL (http://localhost:4000 in dev)
```

---

## Database Schema (Target)

Core tables — expand as needed:

- `users` — id, email, username, avatar, created_at
- `anime` — id, mal_id, title, synopsis, cover_image, genres[], score, episodes, status
- `manga` — id, mal_id, title, synopsis, cover_image, genres[], score, chapters, status
- `watch_links` — anime_id, platform_name, url, is_free, region
- `read_links` — manga_id, platform_name, url, is_free, region
- `user_anime_list` — user_id, anime_id, status (watching/completed/dropped), rating, notes
- `user_manga_list` — user_id, manga_id, status, current_chapter, rating
- `reviews` — id, user_id, anime_id OR manga_id, body, rating, created_at
- `anime_manga_links` — anime_id, manga_id (cross-reference table)

---

## Current Progress

See `PROGRESS.md` for the running log of what's done and what's next.

---

## Commands

```bash
# Frontend
cd frontend && npm run dev        # Dev server on :3000
cd frontend && npm run build      # Production build
cd frontend && npm run lint       # ESLint check

# Backend
cd backend && npm run dev         # Dev server on :4000 (nodemon)
cd backend && npm run build       # Compile TypeScript
cd backend && npm run migrate     # Run Prisma migrations
cd backend && npm run seed        # Seed database with sample data
cd backend && npm run generate    # Regenerate Prisma client after schema changes
```

---

## Phase Status

| Phase | Name | Status |
|---|---|---|
| 0 | Foundation | ✅ Complete |
| 1 | MVP Catalog and Legal Discovery | 🔲 In progress |
| 2 | User Accounts & Community | 🔲 Not started |
| 3 | Monetization | 🔲 Not started |
| 4 | Growth & SEO | 🔲 Not started |
| 5 | Licensing & Partnerships | 🔲 Not started |

Update this table as phases complete.
