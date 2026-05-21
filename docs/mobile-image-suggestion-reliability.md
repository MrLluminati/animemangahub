# Mobile Image and Suggestion Reliability

This patch follows the post-beta-14 website QA pass.

## Problems Found

Mobile responsive QA showed:

- Catalog/suggestion images could fail through the Next.js image optimizer with `/_next/image` 500 errors.
- Search suggestions could return `502 Bad Gateway` when both upstream Jikan anime and manga searches failed at the same time.

## Fixes

- External catalog title images now use Next Image with `unoptimized` to avoid the local optimizer proxy path.
- Search suggestion thumbnail images also use `unoptimized`.
- Cache service now supports stale-cache fallback when a refresh fails.
- Search suggestions now fail soft by returning an empty suggestions array instead of a noisy `502`.

## Notes

- Search ranking logic is unchanged.
- Search results endpoint still returns `502` for hard search failures because full search pages should surface backend failure more clearly.
- Suggestions are non-critical UI assistance and should not create red console/API noise during temporary upstream failure.
