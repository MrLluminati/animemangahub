"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

function isAniPulseMode(value: string | null): value is AniPulseMode {
  return value === "dark" || value === "light";
}

function getPreferredMode(): AniPulseMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedMode = window.localStorage.getItem(STORAGE_KEY);
  if (isAniPulseMode(savedMode)) {
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

  const setMode = useCallback((nextMode: AniPulseMode) => {
    setModeState(nextMode);

    if (typeof window !== "undefined") {
      applyMode(nextMode);
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((currentMode) => {
      const nextMode = currentMode === "dark" ? "light" : "dark";

      if (typeof window !== "undefined") {
        applyMode(nextMode);
        window.localStorage.setItem(STORAGE_KEY, nextMode);
      }

      return nextMode;
    });
  }, []);

  useEffect(() => {
    setMode(getPreferredMode());
  }, [setMode]);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      theme: aniPulsePresets[mode],
      setMode,
      toggleMode
    };
  }, [mode, setMode, toggleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAniPulseTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useAniPulseTheme must be used within ThemeProvider");
  }

  return value;
}
