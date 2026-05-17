"use client";

import { useAniPulseTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { mode, toggleMode } = useAniPulseTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="anipulse-button anipulse-button-secondary inline-flex items-center gap-2 px-4 py-2 text-xs"
      aria-label={`Switch to ${mode === "dark" ? "Vintage Day" : "Tokyo Night"} mode`}
    >
      <span aria-hidden="true">{mode === "dark" ? "☾" : "☀"}</span>
      <span className="hidden sm:inline">{mode === "dark" ? "Tokyo Night" : "Vintage Day"}</span>
    </button>
  );
}
