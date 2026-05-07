# ROADMAP.md — Feature Backlog

All planned features, prioritized by phase. Items move to `PROGRESS.md` when actively being built.

---

## Vision

AniManga Hub becomes the definitive reference platform for anime and manga — the place every fan opens when they want to discover, track, or discuss. Not just a listing site, but a living community with the depth of MAL, the design of Letterboxd, and the utility of IMDB.

---

## Phase 1 — MVP Catalog

Core value: search anything, find where to watch/read it.

- Anime catalog with metadata from Jikan/AniList
- Manga catalog with metadata from MangaDex/Jikan
- Anime detail pages (synopsis, trailer embed, cast, episodes, score)
- Manga detail pages (synopsis, volumes, chapters, author, score)
- "Where to Watch" links (Crunchyroll, Netflix, Funimation, etc.)
- "Where to Read" links (Viz, MangaDex, etc.)
- Anime ↔ Manga cross-links ("based on the manga by...")
- Search with instant results
- Genre, year, and status filters
- Responsive design (mobile-first)
- Dark mode

---


## Phase 1 Progress Snapshot

Current stable beta: `v0.1.0-beta.9`

Completed within Phase 1:

- Initial MVP catalog skeleton
- Anime and manga listing pages
- Anime and manga detail pages
- Combined search
- Clickable catalog cards
- Local SQLite caching for Jikan responses
- Cache observability endpoints
- Development-only frontend cache debug panel

Remaining Phase 1 priorities:

- Workflow hardening for idempotent cleanup/tagging
- Genre, year, and status filters
- Legal “Where to Watch” links
- Legal “Where to Read” links
- Anime ↔ manga cross-reference display
- Catalog pagination and sorting improvements
- Deployment when hosting budget and secrets are ready

---
## Phase 2 — User Accounts & Community

Core value: make it personal and social.

- Google and Discord login
- User profiles with avatar and bio
- Anime watchlist with statuses (watching / completed / plan to watch / dropped / on hold)
- Manga reading list with statuses + current chapter tracker
- 10-point rating system
- Written reviews (with spoiler toggle)
- Helpful / not helpful votes on reviews
- Discussion threads per title
- Activity feed ("your follows recently rated...")
- Follow other users
- List privacy controls (public / friends / private)

---

## Phase 3 — Monetization

Core value: generate revenue to sustain and grow.

- Ad placements (header, sidebar, between content sections)
- AdSense integration
- Affiliate links to licensed platforms (clearly labeled)
- Premium subscription tier ($3–5/month)
  - Ad-free browsing
  - Advanced filters and sort options
  - Sync across devices
  - Early access to new features
  - Profile badge
- Stripe checkout and subscription management

---

## Phase 4 — Growth & SEO

Core value: acquire users organically and keep them engaged.

- Auto-generated sitemap.xml
- JSON-LD structured data (Google rich results)
- Open Graph + Twitter card meta tags
- Seasonal anime chart (current season at a glance)
- Upcoming releases calendar
- Episode countdown timers
- "You might also like" recommendations (collaborative filtering)
- Top lists (top 100 anime, top 50 manga, by decade, by genre)
- Email newsletter for new season announcements
- React Native mobile app (iOS + Android)
- Push notifications for new episodes
- Import from MyAnimeList (import your existing list)
- Export your list as CSV/JSON

---

## Phase 5 — Licensing & Partnerships

Core value: become a destination, not just a directory.

- Licensed content embedding (video player on-site)
- Studio and publisher partnership portal
- Sponsored "new release" placements
- Premium streaming subscription (for licensed content)
- Creator program (earn revenue for fan reviews/essays)
- Localisation (Japanese, Spanish, French UI)
- API access for third-party developers (paid tier)
- Merchandise affiliate storefront (Right Stuf, CDJapan)

---

## Backlog / Ideas (Unscheduled)

These are good ideas that don't fit current phases yet:

- AI-powered synopsis summaries in plain English
- "Spoiler-free" mode that hides ending info
- Manga reader (would require licensing)
- Anime episode guides with detailed summaries
- Character database with voice actor cross-references
- Studio profiles (every anime by MAPPA, Madhouse, etc.)
- Author/artist profiles
- Community fan lists ("best isekai of the decade")
- Watchparty rooms (watch together with friends)
- OST/soundtrack listings and Spotify links
- Award history (Anime of the Year winners)
- Blu-ray release tracker
- Light novel section (expand beyond manga)
- Visual novel section

---

## Won't Build (Out of Scope)

- Hosting or distributing unlicensed content
- User-submitted piracy links
- Torrent tracking
- Anything that puts the platform at legal risk

