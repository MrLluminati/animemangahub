"use client";

import Link from "next/link";
import { useState } from "react";

import { mainNavigation } from "@/theme/navigation";

import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="anipulse-icon-button"
        aria-label="Open navigation menu"
      >
        <span aria-hidden="true">☰</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-[var(--ap-background)]/95 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <BrandMark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="anipulse-icon-button"
              aria-label="Close navigation menu"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="mt-10 grid gap-3">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="anipulse-surface px-5 py-4 font-display text-xl font-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
