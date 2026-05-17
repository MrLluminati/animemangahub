# AniPulse Live Verification Hotfix

This hotfix stabilizes the first AniPulse app-shell foundation after browser testing.

## Issues observed

- Theme toggle was not visible at all viewport widths.
- Theme mode was not preserved after refresh.
- Mobile navigation opened, but needed better search/navigation behavior.
- Browser accessibility checks warned that search fields had no `id` or `name`.
- The browser requested `/favicon.ico` and returned 404.

## Fixes

- Updated `ThemeProvider` to avoid overwriting saved theme mode before initial client-side mode detection completes.
- Made `ThemeToggle` visible in the header at every viewport size.
- Updated `MobileNav` to behave as the mobile/tablet navigation shell and include search.
- Added `id`, `name`, `type`, `role`, `aria-label`, and hidden label support to `SearchBox`.
- Added `frontend/src/app/icon.svg` for Next.js app icon support.

## Notes

The browser warning for extra attributes such as `data-new-gr-c-s-check-loaded` and `data-gr-ext-installed` is commonly caused by browser extensions injecting attributes into the page, not by AniManga Hub application code. Verify again in an incognito window with extensions disabled if that warning remains.
