# Architecture Decisions

This document explains why each technology was chosen. Update it when a major decision changes.

---

## Frontend — Next.js 14 (App Router)

**Why Next.js over plain React?**
- Server-side rendering gives huge SEO benefits — every anime/manga detail page gets indexed by Google
- App Router allows per-page caching strategies (static catalog pages, dynamic user pages)
- Built-in image optimization for cover art thumbnails
- Vercel deployment is near-instant with zero config

**Why App Router over Pages Router?**
- Pages Router is being phased out in favour of App Router
- Server Components reduce JavaScript bundle size significantly
- Better data fetching patterns (fetch in components, not `getServerSideProps`)

---

## Backend — Node.js + Express

**Why a separate backend instead of Next.js API routes?**
- Separation of concerns — frontend and backend can be deployed and scaled independently
- Easier to add a mobile app later (same API, no changes needed)
- More control over middleware, rate limiting, and caching
- Railway can scale the backend independently from the frontend on Vercel

**Why Express over Fastify/Hono?**
- Largest ecosystem, most documentation, easiest for collaborators to pick up
- Sufficient performance for this use case (we're an API-heavy catalog, not real-time)

---

## Database — PostgreSQL

**Why relational over MongoDB?**
- Anime/manga data is highly relational: titles → genres, titles → platforms, users → lists → titles
- Strong consistency matters for user data (watchlists, ratings)
- PostgreSQL has excellent full-text search built in (avoids needing Elasticsearch early on)
- Neon and Railway both offer free PostgreSQL — no cost to start

---

## ORM — Prisma

**Why Prisma over raw SQL or Drizzle?**
- Type-safe queries with auto-generated TypeScript types from schema
- Migration system is clear and version-controlled
- Prisma Studio gives a visual DB browser during development
- Excellent documentation

---

## Auth — NextAuth.js

**Why NextAuth over building custom auth?**
- Auth is a solved problem — no need to roll our own session management
- Social login (Google, Discord) is exactly what our audience uses
- Handles CSRF, JWT, session rotation automatically
- Phase 3 can add email/password if needed

**Why Google + Discord specifically?**
- Discord is dominant in the anime/gaming community — our core audience already has accounts
- Google is universal fallback

---

## Hosting — Vercel + Railway

**Why Vercel for frontend?**
- Native Next.js support (built by the same team)
- Free tier covers early traffic comfortably
- Branch previews for every PR — easy to review changes
- Global CDN with edge network out of the box

**Why Railway for backend + database?**
- Single platform for API server + PostgreSQL
- More generous free tier than Heroku
- Simple environment variable management
- Easy to scale when needed

---

## Data Strategy — Third-Party APIs First

**Why pull from Jikan/AniList instead of building our own catalog?**
- MyAnimeList has 20+ years of data on hundreds of thousands of titles
- Maintaining our own metadata would take years and significant resources
- These APIs are free, public, and well-maintained
- Our value-add is the UX, community features, and "where to watch" layer — not raw catalog data
- As we grow, we can enrich titles with our own data on top of the base metadata

**Caching strategy:**
- Catalog data (titles, covers, descriptions) → cache in PostgreSQL, refresh weekly
- Trending/seasonal data → cache in-memory, refresh daily
- User data (lists, reviews) → never cached, always live from our DB

---

## CSS — Tailwind

**Why Tailwind over CSS Modules / styled-components?**
- Utility-first means no context-switching between files
- No CSS bundle bloat — only used classes are included in production
- Excellent with Next.js and TypeScript
- Consistent spacing/color system out of the box
