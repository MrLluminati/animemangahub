"use client";

import { useAniPulseTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { mode, toggleMode } = useAniPulseTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="anipulse-button anipulse-button-secondary inline-flex min-h-11 items-center gap-2 px-3 py-2 text-xs sm:px-4"
      aria-label={`Switch to ${mode === "dark" ? "Vintage Day" : "Tokyo Night"} mode`}
    >
      <span aria-hidden="true">{mode === "dark" ? "☾" : "☀"}</span>
      <span className="hidden sm:inline">{mode === "dark" ? "Tokyo Night" : "Vintage Day"}</span>
    </button>
  );
}
