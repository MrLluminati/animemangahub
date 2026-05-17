export type AniPulseMode = "dark" | "light";

export type AniPulseColorTokens = {
  background: string;
  surface: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
};

export type AniPulseThemePreset = {
  mode: AniPulseMode;
  name: string;
  mood: string;
  description: string;
  colors: AniPulseColorTokens;
};
