export const brand = {
  brandName: "AniManga Wire",
  tagline: "Anime News. Manga Updates. Wired Daily.",
  description:
    "AniManga Wire brings you anime news, manga updates, release dates, hype edits, trailer updates, and otaku culture - wired daily.",
  handle: "@animangawire",
  website: "www.animangawire.com",
  websiteUrl: "https://www.animangawire.com",
  email: "animangawire@gmail.com",
  youtubeUrl: "https://www.youtube.com/channel/UCsTX1pUAeSX8jGErxDMRg7g",
  instagramUrl: "https://www.instagram.com/animangawire/",
  categories: ["Anime News", "Manga Updates", "Release Dates", "Hype Edits"],
  categoryLine: "Anime News • Manga Updates • Release Dates • Hype Edits",
  logo: {
    abbreviated: "/assets/animanga-wire/logo/amw-profile-512.png",
    abbreviatedTransparent: "/assets/animanga-wire/logo/amw-profile-transparent.png",
    full: "/assets/animanga-wire/logo/animanga-wire-full-logo.png",
    fullTransparent: "/assets/animanga-wire/logo/animanga-wire-full-logo-transparent.png"
  },
  banner: {
    youtube: "/assets/animanga-wire/banner/youtube-banner-2560x1440.png",
    youtubePreview: "/assets/animanga-wire/banner/youtube-banner-2048x1152.jpg",
    safeAreaCrop: "/assets/animanga-wire/banner/youtube-safe-area-crop.png"
  },
  watermark: {
    youtube: "/assets/animanga-wire/watermark/youtube-watermark-150.png",
    medium: "/assets/animanga-wire/watermark/watermark-300.png",
    large: "/assets/animanga-wire/watermark/watermark-500.png"
  },
  social: {
    profile: "/assets/animanga-wire/social/amw-profile-1080.png"
  },
  brandSheet: "/assets/animanga-wire/brand/brand-kit-sheet.png",
  codexLayout: "/assets/animanga-wire/codex/codex_layout.json"
} as const;

export type BrandConfig = typeof brand;
