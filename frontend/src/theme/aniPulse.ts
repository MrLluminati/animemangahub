import type { AniPulseThemePreset } from "./themeTypes";

export const aniPulseDark: AniPulseThemePreset = {
  mode: "dark",
  name: "Ink",
  mood: "Black ink manga page",
  description: "Black, white, and limited red surfaces with paper texture, halftone, and ink-panel edges.",
  colors: {
    background: "#070707",
    surface: "#101010",
    surfaceDim: "#070707",
    surfaceBright: "#1d1d1d",
    surfaceContainerLowest: "#070707",
    surfaceContainerLow: "#101010",
    surfaceContainer: "#171717",
    surfaceContainerHigh: "#222222",
    surfaceContainerHighest: "#2f2f2f",
    onSurface: "#fbfaf4",
    onSurfaceVariant: "#d2ccc0",
    outline: "#fbfaf4",
    outlineVariant: "#47423c",
    primary: "#de1c22",
    onPrimary: "#ffffff",
    primaryContainer: "#4b090c",
    onPrimaryContainer: "#ffffff",
    secondary: "#fbfaf4",
    onSecondary: "#070707",
    secondaryContainer: "#222222",
    tertiary: "#fbfaf4",
    tertiaryContainer: "#de1c22"
  }
};

export const aniPulseLight: AniPulseThemePreset = {
  mode: "light",
  name: "Paper",
  mood: "White manga page",
  description: "White paper, black ink, limited red accents, halftone texture, and clean editorial contrast.",
  colors: {
    background: "#f8f7f2",
    surface: "#ffffff",
    surfaceDim: "#f1efe8",
    surfaceBright: "#ffffff",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f8f7f2",
    surfaceContainer: "#ffffff",
    surfaceContainerHigh: "#f1efe8",
    surfaceContainerHighest: "#e5e0d5",
    onSurface: "#090909",
    onSurfaceVariant: "#49443e",
    outline: "#090909",
    outlineVariant: "#d7d2c8",
    primary: "#de1c22",
    onPrimary: "#ffffff",
    primaryContainer: "#f6d7d8",
    onPrimaryContainer: "#090909",
    secondary: "#090909",
    onSecondary: "#ffffff",
    secondaryContainer: "#f1efe8",
    tertiary: "#090909",
    tertiaryContainer: "#de1c22"
  }
};

export const aniPulsePresets = {
  dark: aniPulseDark,
  light: aniPulseLight
} as const;

export const aniPulseBreakpoints = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
  tv: "1920px"
} as const;

export const aniPulseSpacing = {
  base: "4px",
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2.5rem",
  xl: "4rem",
  mobileMargin: "16px",
  desktopMargin: "48px",
  tvMargin: "80px"
} as const;
