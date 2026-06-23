# Anime ↔ Manga Cross-Reference Display

This feature adds public catalog relationship display to anime and manga detail pages.

## What changed

- Added backend relation fetching through Jikan `/anime/{id}/relations` and `/manga/{id}/relations`.
- Added cached backend endpoints:
  - `GET /api/anime/:id/relations`
  - `GET /api/manga/:id/relations`
- Added frontend API helpers:
  - `getAnimeRelations(id)`
  - `getMangaRelations(id)`
- Added a reusable `RelatedTitles` component.
- Added related-title sections to anime and manga detail pages.

## Behavior

The related-title section displays connected anime/manga entries such as:

- Adaptation
- Sequel
- Prequel
- Side story
- Spin-off
- Alternative version

Only anime and manga relation entries are shown. Other public Jikan relation entry types are ignored for now.

## Reliability

Relations are treated as non-critical metadata. If the upstream relation request fails, the backend returns an empty array instead of breaking the detail page.

## Notes

- No database schema changed.
- No content-safety policy changed.
- Relation entries are linked to local AniManga Hub detail routes where possible.
- Relation entries currently use compact text cards because the Jikan relation endpoint does not provide poster images in the relation payload.
