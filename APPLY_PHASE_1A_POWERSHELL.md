# Apply Phase 1A — PowerShell Instructions

Local repo path used in these instructions:

```powershell
D:\Coding\Repos\animemangahub\anime-manga-hub
```

This patch initializes the first runnable version of AniManga Hub:

- Next.js 14 + TypeScript + Tailwind frontend
- Express + TypeScript backend
- Jikan API wrapper with rate limiting
- Initial Prisma schema
- Homepage, anime page, manga page
- `/api/health`, `/api/anime/trending`, `/api/manga/top`
- Updated `PROGRESS.md`
- Updated `CHANGELOG.md`

## Apply

From PowerShell:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"

git checkout main
git pull origin main
git checkout -b feature/phase-1a-working-skeleton

Copy-Item -Path "$HOME\Downloads\animemangahub-phase1a-powershell\animemangahub-phase1a-powershell\*" -Destination "." -Recurse -Force

git status
```

## Install backend

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\backend"
npm install
```

## Install frontend

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\frontend"
npm install
```

## Create env files

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"

Copy-Item ".env.example" "backend\.env" -Force
Copy-Item ".env.example" "frontend\.env.local" -Force
```

## Run backend

Open PowerShell window 1:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\backend"
npm run dev
```

Backend:

```text
http://localhost:4000
http://localhost:4000/api/health
http://localhost:4000/api/anime/trending
http://localhost:4000/api/manga/top
```

## Run frontend

Open PowerShell window 2:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\frontend"
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## Commit

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"

git add .
git commit -m "feat: phase 1a working skeleton"
git push origin feature/phase-1a-working-skeleton
```

Then open a Pull Request on GitHub from:

```text
feature/phase-1a-working-skeleton
```

into:

```text
main
```
