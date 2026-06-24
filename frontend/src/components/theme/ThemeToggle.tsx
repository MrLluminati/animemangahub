"use client";

import { useAniPulseTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { mode, toggleMode } = useAniPulseTheme();
  const nextModeLabel = mode === "dark" ? "Paper" : "Ink";

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="anipulse-button anipulse-button-secondary inline-flex min-h-11 items-center gap-2 px-3 py-2 text-xs sm:px-4"
      aria-label={`Switch to ${nextModeLabel} mode`}
      title={`Switch to ${nextModeLabel} mode`}
    >
      <span aria-hidden="true">{mode === "dark" ? "Ink" : "Paper"}</span>
    </button>
  );
}
