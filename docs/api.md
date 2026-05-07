# External API Reference

Quick reference for all third-party APIs used in AniManga Hub.

---

## Jikan API (MyAnimeList)

**Base URL:** `https://api.jikan.moe/v4`  
**Auth required:** No  
**Rate limits:** 3 requests/second, 60/minute  
**Docs:** https://docs.api.jikan.moe

### Key Endpoints

```
GET /anime/{id}                  # Anime detail by MAL ID
GET /anime/{id}/characters       # Cast and characters
GET /anime/{id}/recommendations  # Similar anime
GET /anime/{id}/relations        # Related manga, sequels, prequels

GET /manga/{id}                  # Manga detail by MAL ID
GET /manga/{id}/characters
GET /manga/{id}/recommendations

GET /seasons/now                 # Currently airing anime
GET /seasons/{year}/{season}     # Specific season (spring/summer/fall/winter)
GET /seasons/upcoming            # Next season

GET /top/anime?filter=airing     # Top airing anime
GET /top/manga                   # Top manga

GET /anime?q={query}&limit=10    # Search anime
GET /manga?q={query}&limit=10    # Search manga
```

### Example Response (GET /anime/1)

```json
{
  "data": {
    "mal_id": 1,
    "title": "Cowboy Bebop",
    "title_english": "Cowboy Bebop",
    "synopsis": "...",
    "score": 8.75,
    "episodes": 26,
    "status": "Finished Airing",
    "year": 1998,
    "season": "spring",
    "genres": [{ "mal_id": 1, "name": "Action" }],
    "images": {
      "jpg": { "image_url": "https://...", "large_image_url": "https://..." }
    }
  }
}
```

---

## AniList API (GraphQL)

**Endpoint:** `https://graphql.anilist.co`  
**Auth required:** No (for public data)  
**Rate limits:** 90 requests/minute  
**Docs:** https://anilist.gitbook.io/anilist-apiv2-docs

### Key Queries

```graphql
# Trending anime
query {
  Page(page: 1, perPage: 20) {
    media(sort: TRENDING_DESC, type: ANIME) {
      id
      title { romaji english }
      coverImage { large }
      averageScore
      episodes
    }
  }
}

# Current season
query {
  Page {
    media(season: SPRING, seasonYear: 2025, type: ANIME, sort: POPULARITY_DESC) {
      id
      title { romaji english }
      coverImage { large }
      nextAiringEpisode { episode airingAt }
    }
  }
}

# Search
query ($search: String) {
  Page {
    media(search: $search, type: ANIME) {
      id
      title { romaji english }
    }
  }
}
```

---

## MangaDex API

**Base URL:** `https://api.mangadex.org`  
**Auth required:** No (for public data)  
**Rate limits:** See docs — generally lenient  
**Docs:** https://api.mangadex.org/docs

### Key Endpoints

```
GET /manga?title={query}           # Search manga
GET /manga/{id}                    # Manga detail
GET /manga/{id}/aggregate          # Chapter/volume list
GET /cover?manga[]={id}            # Cover art

GET /manga/{id}/feed               # Chapter list
GET /chapter/{id}                  # Chapter details
```

### Getting Cover Art

```
# Cover art is constructed as:
https://uploads.mangadex.org/covers/{manga_id}/{cover_filename}

# Get the filename from:
GET /manga/{id}?includes[]=cover_art
# → relationships[].type === "cover_art" → attributes.fileName
```

---

## Kitsu API

**Base URL:** `https://kitsu.io/api/edge`  
**Auth required:** No (for public data)  
**Docs:** https://kitsu.docs.apiary.io

### Key Endpoints

```
GET /anime?filter[text]={query}       # Search anime
GET /anime/{id}                       # Anime detail
GET /manga?filter[text]={query}       # Search manga
GET /trending/anime                   # Trending
```

---

## Rate Limiting Strategy

Since we cache everything in our own database, we only hit these APIs:
1. When a title doesn't exist in our DB yet (first search/visit)
2. On a weekly refresh job to update scores, episode counts, etc.

We should never hit rate limits in production with this approach.

```typescript
// Recommended wrapper in backend/src/lib/jikan.ts
const RATE_LIMIT_MS = 350; // ~3 req/sec with buffer
let lastRequest = 0;

async function jikanFetch(path: string) {
  const now = Date.now();
  const wait = Math.max(0, RATE_LIMIT_MS - (now - lastRequest));
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  lastRequest = Date.now();
  return fetch(`https://api.jikan.moe/v4${path}`).then(r => r.json());
}
```
