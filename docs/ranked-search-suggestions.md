# Ranked Search and Suggestions

This document records the first ranked search and autocomplete implementation.

## Product intent

Search should accept any word or phrase:

- `One Piece` should show the main anime/manga first, then related entries.
- `One` should show titles containing or starting with "One".
- Broad queries should still return relevant catalog entries if Jikan has matching results.
- The search box should show top suggestions before the user submits the full search.

## Backend behavior

- `GET /api/search?q=...&sort=relevance`
- `GET /api/search/suggestions?q=...`

Ranking prioritizes:

1. Exact title matches.
2. Titles starting with the query.
3. Title word matches.
4. Titles containing the query.
5. Synopsis/genre/theme/demographic matches.
6. Score, member count, favorites, and rank boosts.

Supported full-search sort modes:

- `relevance`
- `popularity`
- `score`
- `year`

## Frontend behavior

- SearchBox fetches suggestions after a 300ms debounce.
- Suggestions appear after at least two characters.
- Dropdown shows the top three ranked suggestions.
- Clicking a suggestion opens the relevant anime/manga detail page.
- Submitting the form opens `/search?q=...`.
- Full search page allows sorting by relevance, popularity, score, and year.

## Current limitations

- Search still depends on Jikan's public API result set.
- True full-text indexing, typo tolerance, synonyms, and local popularity analytics require a future local search index.
- Results may still vary based on Jikan availability and rate limiting.
