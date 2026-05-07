# CHANGELOG

All notable changes to AniManga Hub are logged here.
Every agent or developer MUST add an entry before pushing to `main`.

Format:
```
## [YYYY-MM-DD] — Short title
**Agent/Author:** Name or "Claude Sonnet 4.6" or "Human: username"
**Phase:** Phase number and name
**Commit:** the git commit message used

### Added
- list of new files or features added

### Changed
- list of files modified and what changed

### Removed
- list of anything deleted

### Notes
- Any decisions made, blockers, or context for next agent
```

---

## [2026-05-07] — Phase 0: Foundation scaffold
**Agent/Author:** Claude Sonnet 4.6
**Phase:** Phase 0 — Foundation
**Commit:** `chore: phase 0 foundation — repo scaffold, docs, CI/CD`

### Added
- `README.md` — full project overview, tech stack, local setup guide, deployment instructions
- `CLAUDE.md` — AI agent instructions: stack rules, folder conventions, DB schema targets, commands, phase status table
- `PROGRESS.md` — running build log with phase-by-phase checklist
- `ROADMAP.md` — full feature backlog across all 5 phases with vision statement
- `CHANGELOG.md` — this file; sync log for all agents and contributors
- `.env.example` — all environment variables documented with step-by-step instructions for obtaining each value
- `.gitignore` — covers Node.js, Next.js, Prisma, OS files, editor dirs, secrets
- `docs/architecture.md` — documented why each technology was chosen (Next.js App Router, Prisma, Railway, Vercel, etc.)
- `docs/api.md` — quick reference for Jikan, AniList, MangaDex, Kitsu APIs with example responses and rate limit strategy
- `frontend/README.md` — Next.js setup command and expected folder structure for Phase 1
- `backend/README.md` — Express + Prisma setup commands and expected folder structure for Phase 1
- `database/migrations/README.md` — migration naming convention and Prisma workflow
- `database/seeds/README.md` — seed file plan for Phase 1
- `.github/workflows/deploy.yml` — CI/CD pipeline: lint + type-check on PRs, deploy frontend to Vercel and backend to Railway on main push

### Notes
- GitHub direct push from Claude's sandbox is blocked by network allowlist (403). Workflow: Claude generates zip → human unzips into local repo → human pushes with provided commit message.
- Phase 1 (MVP Catalog) is ready to begin. Next session: initialise Next.js app in `/frontend` and Express app in `/backend`, define Prisma schema, build homepage and catalog pages.
- All free-tier services used: Vercel, Railway, Neon (DB), NextAuth, Stripe test mode.
