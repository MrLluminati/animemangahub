# DECISIONS.md - Durable Project Decisions

Last updated: 2026-07-18

This file records decisions future agents should preserve unless the project owner explicitly changes direction.

---

## Product Identity

- Public name: AniManga Wire.
- Legacy repo/folder references may still use AniManga Hub.
- Avoid broad renames because they can churn imports, package metadata, docs history, and deployment settings.
- Only branding assets that pass transparency QA may be committed or published.
- Checkerboard preview JPGs are not production transparent assets.

---

## Safety And Compliance

- The platform is non-explicit and legal-discovery-first.
- Indian legal and cyber-law risk matters because the owner is based in India.
- Foreign hosting, foreign incorporation, or India geo-blocking must not be documented as complete legal shields.
- Public launch needs qualified Indian cyber-law review for content policy, moderation policy, terms, privacy, affiliate disclosures, and legal-link policy.
- Prohibited content and monetization categories are defined in `CLAUDE.md`, `AGENTS.md`, and `docs/content-safety-policy.md`.

---

## Website Product Direction

- The website remains a catalog-first anime and manga discovery app.
- Phase 1 has already shipped core catalog, search, filters, legal discovery links, cache observability, and anime/manga cross-references.
- Anime and manga detail pages use the locked presentation order: Detail Hero → Availability → Related Titles.
- The footer exposes the official YouTube and Instagram profiles through central brand configuration.
- Latest tagged website beta: `v0.1.0-beta.15`.
- Website development is fully resumed.
- The next planned website milestone is `v0.1.0-beta.16`, after focused rebrand completion, validation, and manual QA; it is not released or tagged.

---

## Shorts/Reels Track

- Shorts/Reels production in `shorts/` is an active but separate local-only project track.
- Do not version Shorts source, Remotion code, scripts, templates, documentation, generated posters or thumbnails, sample renders, output/work folders, dependencies, caches, per-Short sources, or experimental QA assets.
- The only approved Shorts-path versioning candidate is the reusable main frame at `shorts/assets/frames/amw-shorts-unified-frame-v1.png`.
- Canonical AniManga Wire branding assets outside `shorts/` remain separate candidates after successful asset QA.
- Generated videos and raw media are local artifacts and should not be committed.

---

## Technical Architecture

- Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS.
- Backend: Node.js, Express, TypeScript, REST API on port 4000.
- Database target: PostgreSQL with Prisma.
- Local development cache currently uses SQLite through Prisma.
- External data sources: Jikan, AniList, MangaDex, Kitsu where appropriate.
- Deployment target remains Vercel for frontend and Railway for backend/database, but deployment is deferred.

---

## Git And Release Discipline

- Work from branches when making code changes.
- Use conventional commits.
- Keep `CHANGELOG.md` current before pushing to `main`.
- Tags are rollback anchors; do not retag or delete release tags without explicit approval.
