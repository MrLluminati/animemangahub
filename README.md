# 🎌 AniManga Hub

> A non-explicit anime and manga culture, legal discovery, catalog, review, and fandom platform.

## What is this?

AniManga Hub is a catalog-first and culture-aware platform where users can:
- Search and discover anime and manga in one place
- See cross-links ("this anime is based on this manga")
- Find out exactly where to watch or read legally
- Rate, review, and maintain watchlists/readlists
- Follow seasonal charts and new releases
- Read editorial anime culture articles and non-explicit mature-theme media-literacy commentary


## Safety and Compliance Position

AniManga Hub is not a hentai website, pornographic anime website, piracy website, torrent index, adult-video redirect site, or scraping/indexing platform for explicit anime content.

The project must not host, redirect to, embed, scrape, index, promote, or monetize hentai or pornographic anime content, piracy links, torrent links, illegal readers, explicit thumbnails, adult-site affiliate traffic, NSFW commissions, loli/shota content, sexualized minor-coded content, or any sexualization of minors, real or fictional.

The project owner is based in India, so Indian legal and cyber-law risk must be treated seriously. Foreign hosting, foreign incorporation, or India geo-blocking must not be treated as a complete risk shield. Before public launch, content policy, moderation policy, terms, privacy policy, affiliate disclosures, and legal-link policy should be reviewed by a qualified Indian cyber-law lawyer.

## Current Development Status

Current stable beta: `v0.1.0-beta.13`

Completed through `v0.1.0-beta.13`:

- Working Next.js frontend and Express backend
- Jikan-powered anime and manga catalog
- Detail pages and search
- Local SQLite cache using Prisma
- Cache health, stats, and clear endpoints
- Development-only frontend cache debug panel
- PowerShell 7 workflow automation for validation, cleanup, tagging, and verification
- Genre, year, and status filters for anime and manga catalog pages
- Official-source "Where to watch" and "Where to read" discovery sections
- AniPulse theme foundation with dark/light modes, loaded theme fonts, readable light mode, and responsive mobile drawer

Deployment is intentionally deferred until Vercel/Railway hosting and production secrets are ready.

See `docs/project-summary.md`, `PROGRESS.md`, `ROADMAP.md`, `docs/anipulse-theme-foundation.md`, `docs/content-safety-policy.md`, and `docs/anime-culture-platform-merge-plan.md` for the current build state.

## Live Site

> _Coming soon — will be updated once deployed_

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Auth | NextAuth.js (Google + Discord) |
| Payments | Stripe |
| Deployment | Vercel (frontend) + Railway (backend + DB) |
| CDN / DNS | Cloudflare |

---

## Project Structure

```
anime-manga-hub/
├── frontend/          # Next.js app (UI, pages, components)
├── backend/           # Express API (routes, controllers, middleware)
├── database/          # SQL migrations and seed scripts
├── docs/              # Architecture, API docs, decisions
├── .github/workflows/ # CI/CD pipelines
├── README.md          # You are here
├── CLAUDE.md          # Instructions for AI agents
├── PROGRESS.md        # Current build status
└── ROADMAP.md         # Feature backlog and future plans
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 20+ → https://nodejs.org
- Git → https://git-scm.com
- PostgreSQL 15+ (or use the free Neon.tech cloud DB)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/anime-manga-hub.git
cd anime-manga-hub

# 2. Set up the backend
cd backend
cp ../.env.example .env        # Fill in your values
npm install
npm run migrate                # Run database migrations
npm run seed                   # Optional: seed sample data
npm run dev                    # Starts on http://localhost:4000

# 3. Set up the frontend (new terminal)
cd frontend
cp ../.env.example .env.local  # Fill in your values
npm install
npm run dev                    # Starts on http://localhost:3000
```

Open http://localhost:3000 — the frontend proxies API calls to port 4000 automatically.

---

## Environment Variables

Copy `.env.example` to `.env` (backend) and `.env.local` (frontend) and fill in real values.  
**Never commit `.env` or `.env.local` to git.**

See `.env.example` for all required variables with descriptions.

---

## Data Sources

This platform pulls metadata from free, public APIs:

| API | Data |
|---|---|
| [Jikan API](https://jikan.moe) | Anime + manga metadata from MyAnimeList |
| [AniList GraphQL](https://anilist.co/graphql) | Trending, seasonal, community scores |
| [MangaDex API](https://api.mangadex.org) | Manga covers, chapter counts, genres |
| [Kitsu API](https://kitsu.docs.apiary.io) | Additional anime/manga catalog data |

---

## Deployment

### Frontend → Vercel
1. Connect your GitHub repo at vercel.com
2. Set root directory to `frontend`
3. Add environment variables from `.env.example` in Vercel dashboard
4. Every push to `main` auto-deploys

### Backend + DB → Railway
1. Create a new project at railway.app
2. Add a PostgreSQL database service
3. Deploy the `backend` folder
4. Add environment variables in Railway dashboard

---

## Contributing

This project uses a simple branch workflow:

```bash
git checkout -b feature/your-feature-name
# make changes
git commit -m "feat: describe what you did"
git push origin feature/your-feature-name
# open a Pull Request on GitHub
```

Branch naming: `feature/`, `fix/`, `docs/`, `chore/`

---

## License

MIT — see LICENSE file.
