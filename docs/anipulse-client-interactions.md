# AniPulse Client Interactions Hotfix

This patch repairs issues observed after the first AniPulse shell hotfix.

## Reported issues

- Theme toggle rendered but did not switch modes.
- Mobile menu drawer rendered but did not open.
- Homepage search appeared to refresh the page.
- Footer needed a more complete app-shell structure.

## Changes

- Added `ThemeBootScript` to apply the saved theme before hydration.
- Updated `ThemeProvider` so `setMode` and `toggleMode` immediately update the DOM and localStorage.
- Marked `Header` as a client component so the shell is hydrated as one interactive unit.
- Improved `MobileNav` overlay behavior, aria state, and menu content.
- Added explicit `action="/search"` and `method="get"` fallback to `SearchBox`, while preserving client-side `router.push`.
- Expanded `Footer` into reusable groups for Explore, Future sections, and Policies.

## Verification checklist

- Toggle changes dark/light mode immediately.
- Refresh preserves selected theme.
- Mobile menu opens and closes.
- Mobile menu links close the drawer.
- Search submits to `/search?q=...`.
- Footer has useful grouped navigation.
- No app-side console errors appear.
