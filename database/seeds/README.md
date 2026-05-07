# Database Seeds

Sample data scripts for development and testing.

## Files (to be created in Phase 1)

- `01_anime.ts` — 20 popular anime titles from Jikan API
- `02_manga.ts` — 20 popular manga titles
- `03_watch_links.ts` — Sample "where to watch" links
- `04_read_links.ts` — Sample "where to read" links

## Running seeds

```bash
cd backend
npm run seed
```

Seeds are safe to run multiple times — they use `upsert` to avoid duplicates.
