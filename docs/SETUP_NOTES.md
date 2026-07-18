# SETUP_NOTES.md - Local Setup Notes

Last updated: 2026-07-18

This file keeps setup context concise for humans and AI agents.

---

## Environment

- OS/workspace observed: Windows, PowerShell.
- Repo path: `D:\Coding\Repos\animemangahub\anime-manga-hub`.
- Remote: `https://github.com/MrLluminati/animemangahub.git`.
- Do not commit `.env`, `.env.local`, local SQLite files, raw media, generated videos, logs, or tool caches.

---

## Website Requirements

- Node.js 20+.
- npm.
- PowerShell 7 for project workflow scripts.
- Backend dev server: `cd backend && npm run dev`.
- Frontend dev server: `cd frontend && npm run dev`.
- Frontend URL: `http://localhost:3000`.
- Backend URL: `http://localhost:4000`.

Use `.env.example` as the reference for required variables. Add real values only to ignored local env files.

Frontend production builds can complete successfully while logging non-fatal `ECONNREFUSED` fetch messages when the backend is not running. Start the backend for live detail-page smoke testing.

---

## Database Notes

- Production target: PostgreSQL.
- Local cache/development currently uses Prisma with SQLite files under `backend/prisma/`.
- SQLite database files are ignored by Git.
- Run Prisma commands from `backend/` unless a script says otherwise.

---

## Git Ignore Expectations

These stay local:

- `.env*` secrets.
- `.claude/`, `.codex/`, and local tool settings.
- `backend/prisma/*.db*`.
- All of `shorts/**`, including scripts, templates, Remotion source, documentation, generated assets, outputs, work files, exports, logs, raw media, dependencies, caches, per-Short sources, and QA artifacts.

The sole Shorts-path exception eligible for tracking is the approved reusable main frame:

```text
shorts/assets/frames/amw-shorts-unified-frame-v1.png
```

Canonical AniManga Wire branding assets outside `shorts/` remain separate candidates after successful asset QA.

Detailed Shorts production setup and implementation notes stay in the ignored local workspace, not in versioned project documentation.

---

## Quick Verification Commands

```powershell
git status --short --branch
git log --oneline --decorate -5
git tag --sort=-creatordate | Select-Object -First 10
```

For website work, use the existing scripts in `package.json` files and `scripts/dev-workflow.ps1` rather than inventing new workflow commands.
