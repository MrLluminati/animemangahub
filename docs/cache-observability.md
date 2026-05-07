# Cache Observability

Phase 1D adds developer-facing cache observability for local development.

## Endpoints

### Backend health

```text
GET /api/health
```

Confirms the backend is running.

### Cache health

```text
GET /api/cache/health
```

Confirms the Prisma/SQLite cache layer is reachable.

### Cache stats

```text
GET /api/cache/stats
```

Returns total cache entries, fresh entries, expired entries, and recent cache keys.

### Clear cache

```text
DELETE /api/cache
POST /api/cache/clear
```

Clears all cache entries in local development.

To clear only one namespace:

```text
DELETE /api/cache?prefix=anime:
POST /api/cache/clear?prefix=manga:
```

Cache clearing is blocked when `NODE_ENV=production`.

## Cache logs

The backend logs cache events to the terminal:

```text
[cache:hit] anime:trending
[cache:miss] anime:detail:1
[cache:stale] manga:search:naruto:12
```

## Current cache strategy

- List cache TTL: 6 hours
- Detail cache TTL: 24 hours
- Search cache TTL: 1 hour

## Future improvements

- Admin UI for cache stats
- Per-source cache controls
- Manual refresh endpoint
- PostgreSQL-compatible deployment cache
