import type { AniPulseThemePreset } from "./themeTypes";

export const aniPulseDark: AniPulseThemePreset = {
  mode: "dark",
  name: "Tokyo Night",
  mood: "Modern Japan Night Life",
  description: "Glassmorphism, cyberpunk minimalism, neon glow, and wet-asphalt midnight surfaces.",
  colors: {
    background: "#131315",
    surface: "#131315",
    surfaceDim: "#131315",
    surfaceBright: "#39393b",
    surfaceContainerLowest: "#0e0e10",
    surfaceContainerLow: "#1c1b1d",
    surfaceContainer: "#201f21",
    surfaceContainerHigh: "#2a2a2c",
    surfaceContainerHighest: "#353437",
    onSurface: "#e5e1e4",
    onSurfaceVariant: "#b9cacb",
    outline: "#849495",
    outlineVariant: "#3b494b",
    primary: "#dbfcff",
    onPrimary: "#00363a",
    primaryContainer: "#00f0ff",
    onPrimaryContainer: "#006970",
    secondary: "#fface8",
    onSecondary: "#5e0053",
    secondaryContainer: "#ff24e4",
    tertiary: "#fff4e8",
    tertiaryContainer: "#ffd386"
  }
};

export const aniPulseLight: AniPulseThemePreset = {
  mode: "light",
  name: "Vintage Day",
  mood: "Vintage Japan Day Life",
  description: "Warm washi paper, muted ink, sakura red, indigo structure, and editorial magazine surfaces.",
  colors: {
    background: "#f9f6f0",
    surface: "#fffdf7",
    surfaceDim: "#f8f1e3",
    surfaceBright: "#ffffff",
    surfaceContainerLowest: "#fffdf7",
    surfaceContainerLow: "#fff7ea",
    surfaceContainer: "#ffffff",
    surfaceContainerHigh: "#f2eadc",
    surfaceContainerHighest: "#e7d8c4",
    onSurface: "#2d3e50",
    onSurfaceVariant: "#667085",
    outline: "#2d3e50",
    outlineVariant: "#e7d8c4",
    primary: "#bc243c",
    onPrimary: "#fffdf7",
    primaryContainer: "#f5d7da",
    onPrimaryContainer: "#5f111d",
    secondary: "#2d3e50",
    onSecondary: "#fffdf7",
    secondaryContainer: "#d7e0eb",
    tertiary: "#7a5800",
    tertiaryContainer: "#d4af37"
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
