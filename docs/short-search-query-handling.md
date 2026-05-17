# Short Search Query Handling

This note documents the short-query search fix added after `v0.1.0-beta.13`.

## Problem

Live testing showed:

- `One Piece` returned results.
- `One` returned no results.

The search route combined anime and manga searches in parallel. A transient Jikan failure from either source could fail the whole combined search. The frontend also used revalidated fetch caching for search responses, which could preserve a transient empty response.

## Fix

- Jikan requests now use a serialized rate-limit queue to avoid parallel requests violating API pacing.
- Combined search now uses `Promise.allSettled`, so an anime or manga failure does not automatically fail the entire search response.
- Short but meaningful queries use a higher result limit.
- Search requests now use `cache: "no-store"` on the frontend to avoid stale empty search results.
- Single-character queries return no results intentionally.
- Search page copy now explains the minimum query behavior.

## Verification targets

Test the following after applying the fix:

- Search `One Piece`
- Search `One`
- Search `Naruto`
- Search `Jo`
- Search single character `A`
- Confirm no backend crash or frontend stale empty response appears.
