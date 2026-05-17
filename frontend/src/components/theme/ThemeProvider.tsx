"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { aniPulsePresets } from "@/theme/aniPulse";
import type { AniPulseMode, AniPulseThemePreset } from "@/theme/themeTypes";

type ThemeContextValue = {
  mode: AniPulseMode;
  theme: AniPulseThemePreset;
  setMode: (mode: AniPulseMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "anipulse-theme-mode";

function getStoredMode(): AniPulseMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedMode = window.localStorage.getItem(STORAGE_KEY);
  if (savedMode === "dark" || savedMode === "light") {
    return savedMode;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyMode(mode: AniPulseMode) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<AniPulseMode>("dark");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialMode = getStoredMode();
    setModeState(initialMode);
    applyMode(initialMode);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    applyMode(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, isReady]);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      theme: aniPulsePresets[mode],
      setMode: setModeState,
      toggleMode: () => setModeState((currentMode) => (currentMode === "dark" ? "light" : "dark"))
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAniPulseTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useAniPulseTheme must be used within ThemeProvider");
  }

  return value;
}
