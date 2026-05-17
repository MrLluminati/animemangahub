# AniPulse Theme Foundation

AniPulse is the reusable visual theme system for AniManga Hub and a future standalone marketplace theme.

## Theme identity

- **Theme name:** AniPulse
- **Dark mode:** Modern Japan Night Life / Tokyo Night
- **Light mode:** Vintage Japan Day Life / Vintage Day
- **Primary use cases:** anime catalog, manga catalog, reviews, guides, culture publication, official-source discovery, and editorial websites.

## Design source

AniPulse is based on the uploaded `DESIGN.md` direction:

- Dark mode uses glassmorphism, cyberpunk minimalism, neon cyan, magenta pulse, amber signal, and midnight surfaces.
- Light mode uses warm paper, indigo ink, sakura red, warm gold, and editorial magazine surfaces.
- The theme should support mobile, tablet, laptop, desktop, and large TV-scale layouts.
- Components must remain modular and reusable, not hardcoded to AniManga Hub.

## Foundation files

- `frontend/src/theme/themeTypes.ts`
- `frontend/src/theme/aniPulse.ts`
- `frontend/src/theme/navigation.ts`
- `frontend/src/components/theme/ThemeProvider.tsx`
- `frontend/src/components/theme/ThemeToggle.tsx`
- `frontend/src/components/theme/GlowBackground.tsx`
- `frontend/src/components/theme/SurfaceCard.tsx`
- `frontend/src/components/theme/SectionHeader.tsx`
- `frontend/src/components/theme/ThemeButton.tsx`
- `frontend/src/components/theme/ThemeBadge.tsx`
- `frontend/src/components/theme/BrandMark.tsx`
- `frontend/src/components/theme/MobileNav.tsx`

## Current implementation scope

This foundation patch:

- Adds dark/light CSS variable tokens.
- Adds the theme provider and persistent mode toggle.
- Adds reusable surface, button, badge, section-header, brand, background, and mobile-nav primitives.
- Updates the global app shell to load AniPulse.
- Updates the header and footer to use AniPulse primitives.

It does not yet redesign all pages. Homepage, catalog, and detail page visual conversions should be separate reviewable PRs.
