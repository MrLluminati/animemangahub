# Dev Console Warnings Cleanup

This patch follows `v0.1.0-beta.14`.

## Purpose

Reduce non-blocking development console noise after the ranked search suggestions milestone.

## Changes

- Added a concrete `favicon.ico` file to satisfy browser `/favicon.ico` requests.
- Updated metadata icon declarations to include `/favicon.ico`.
- Added an optional `priority` prop to `TitleCard`.
- Marked the first above-the-fold card image on the homepage and search page as priority.

## Notes

- This does not change search behavior.
- This does not change backend ranking logic.
- This does not change database schema or content-safety policy.
- React DevTools / browser extension instrumentation warnings may still appear in development and should not be treated as app-side errors unless they reproduce in a clean browser profile without extensions.
