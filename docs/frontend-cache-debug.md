# Frontend Cache Debug Visibility

Phase 1E adds a development-only frontend cache debug panel.

## Purpose

The backend already exposes local cache observability endpoints. This phase makes those endpoints visible in the frontend during local development.

## Debug panel

The panel appears only when the frontend runs with:

```text
NODE_ENV=development
```

It is hidden in production.

## Data shown

The panel shows:

- Cache health state
- Total cache entries
- Fresh cache entries
- Expired cache entries
- Recent cache keys
- Last health check time

## Backend endpoints used

```text
GET /api/cache/health
GET /api/cache/stats
```

## Local usage

Start the backend and frontend locally.

Backend:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\backend"
npm run dev
```

Frontend:

```powershell
cd "D:\Coding\Repos\animemangahub\anime-manga-hub\frontend"
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Expected behavior

- The cache panel appears in the bottom-right corner during development.
- The panel does not appear in production builds.
- If the backend is unavailable, the panel stays hidden instead of breaking the page.

## Future improvements

- Add a frontend clear-cache button for local development.
- Show per-page cache source metadata.
- Add an admin-only cache dashboard after authentication exists.
