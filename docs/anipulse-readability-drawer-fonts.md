# AniPulse Readability Drawer and Fonts Hotfix

This hotfix addresses the remaining live verification problems after the client interactions repair.

## Issues

- Theme mode worked, but light mode briefly appeared to load after dark mode.
- Mobile menu appeared trapped inside the header instead of opening as a proper side drawer.
- Light mode readability was weak because older page/card styles still hardcoded dark-only Tailwind colors.
- The AniPulse font families were declared in CSS but not actually loaded through Next.js.

## Fixes

- `ThemeBootScript` now uses Next.js `beforeInteractive` script loading.
- App layout now loads Epilogue, Hanken Grotesk, and Space Grotesk through `next/font/google`.
- CSS font variables now use the loaded Next font variables.
- `MobileNav` now renders through a React portal to `document.body` and opens as a right-side drawer.
- Drawer opening locks body scroll until closed.
- `SearchBox`, `TitleCard`, and the homepage now use AniPulse theme variables instead of dark-only color classes.
- Footer and navigation remain unchanged from the client interaction repair.

## Verification checklist

- Toggle changes mode immediately.
- Refresh preserves light mode with minimal or no flash.
- Mobile menu opens as a right-side drawer and is readable.
- Homepage remains readable in light mode.
- Catalog cards remain readable in light mode.
- Search still routes to `/search?q=...`.
- Console has no app-side interaction errors.
