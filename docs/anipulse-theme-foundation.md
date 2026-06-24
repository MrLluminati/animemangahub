# AniManga Wire Visual Foundation

The current visual foundation uses the locked AniManga Wire brand direction. The older internal theme file names still use `aniPulse` for compatibility, but the public product direction is AniManga Wire.

## Theme Identity

- **Brand:** AniManga Wire
- **Dark mode:** Ink
- **Light mode:** Paper
- **Visual direction:** black, white, and limited red with manga sketch, ink, halftone, and paper texture cues.
- **Avoid:** cyberpunk, gaming HUD, neon tech panels, futuristic UI, and multicolor palettes.

## Design Source

The source of truth is the extracted locked brand kit in `Assets/`, copied into:

```text
frontend/public/assets/animanga-wire/
```

Use exported logo, banner, watermark, social, brand sheet, and Codex layout files from that public asset tree. Do not crop from a brand sheet while standalone exports exist.

## Foundation Files

- `frontend/src/config/brand.ts`
- `frontend/src/theme/themeTypes.ts`
- `frontend/src/theme/aniPulse.ts`
- `frontend/src/theme/navigation.ts`
- `frontend/src/components/brand/BrandLogo.tsx`
- `frontend/src/components/theme/ThemeProvider.tsx`
- `frontend/src/components/theme/ThemeToggle.tsx`
- `frontend/src/components/theme/GlowBackground.tsx`
- `frontend/src/components/theme/SurfaceCard.tsx`
- `frontend/src/components/theme/SectionHeader.tsx`
- `frontend/src/components/theme/ThemeButton.tsx`
- `frontend/src/components/theme/ThemeBadge.tsx`
- `frontend/src/components/theme/BrandMark.tsx`
- `frontend/src/components/theme/MobileNav.tsx`

## Current Implementation Scope

- Central brand constants live in `frontend/src/config/brand.ts`.
- Public metadata and social preview images use AniManga Wire values.
- Header, footer, homepage hero, content pillars, social links, and catalog/detail surfaces use the ink-paper AMW visual direction.
- The theme toggle remains dark/light, but visible labels are `Ink` and `Paper`.
