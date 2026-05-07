# Apply Phase 1B — PowerShell Guide

This patch adds Phase 1B:

- Backend detail endpoints:
  - `GET /api/anime/:id`
  - `GET /api/manga/:id`
- Backend combined search endpoint:
  - `GET /api/search?q=...`
- Frontend detail pages:
  - `/anime/[id]`
  - `/manga/[id]`
- Frontend search page:
  - `/search?q=...`
- Clickable catalog cards
- Header and homepage search boxes
- Updated `CHANGELOG.md` and `PROGRESS.md`

---

## 1. Go to your local repo

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"
```

## 2. Make sure `main` is clean and updated

```powershell
git checkout main
git pull origin main
git status
```

Expected:

```text
nothing to commit, working tree clean
```

## 3. Create Phase 1B branch

```powershell
git checkout -b feature/phase-1b-detail-pages-search
```

## 4. Copy patch files

Extract the ZIP, then copy everything inside the extracted `animemangahub-phase1b` folder into your repo root.

Example if the ZIP is extracted in Downloads:

```powershell
Copy-Item -Path "$HOME\Downloads\animemangahub-phase1b\animemangahub-phase1b\*" -Destination "D:\Coding\Repos\animemangahub\anime-manga-hub" -Recurse -Force
```

## 5. Run local checks

Backend:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\backend"
npm run type-check
```

Frontend:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\frontend"
npm run lint
npm run type-check
```

## 6. Run locally

Backend terminal:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\backend"
npm run dev
```

Frontend terminal:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\frontend"
npm run dev
```

Test:

```text
http://localhost:4000/api/health
http://localhost:4000/api/anime/1
http://localhost:4000/api/manga/1
http://localhost:4000/api/search?q=naruto
http://localhost:3000
http://localhost:3000/search?q=naruto
```

Also click anime/manga cards to test detail pages.

## 7. Commit and push

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub"

git status
git add .
git commit -m "feat: phase 1b detail pages and search"
git push origin feature/phase-1b-detail-pages-search
```

## 8. Open PR

Open the PR link shown by PowerShell.

PR title:

```text
feat: phase 1b detail pages and search
```

PR description:

```markdown
## Summary

Adds Phase 1B detail pages and search.

## Added

- Backend anime detail endpoint: `GET /api/anime/:id`
- Backend manga detail endpoint: `GET /api/manga/:id`
- Backend combined search endpoint: `GET /api/search?q=...`
- Frontend anime detail page: `/anime/[id]`
- Frontend manga detail page: `/manga/[id]`
- Frontend search page: `/search?q=...`
- Reusable search box
- Reusable detail hero
- Clickable catalog cards

## Notes

- Still uses live Jikan API data.
- Database caching remains pending for a later Phase 1C.
- After successful merge and verification, tag `v0.1.0-beta.2`.
```

## 9. After PR merge, tag beta 2

```powershell
git checkout main
git pull origin main

git tag -a v0.1.0-beta.2 -m "Phase 1B beta release"
git push origin v0.1.0-beta.2
```
