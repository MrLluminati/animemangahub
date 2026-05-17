"use client";

import Link from "next/link";
import { useState } from "react";

import { SearchBox } from "@/components/search/SearchBox";
import { mainNavigation, futureNavigation } from "@/theme/navigation";

import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="anipulse-icon-button"
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <span aria-hidden="true">☰</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-[var(--ap-background)]/96 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
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

          <div className="mt-6">
            <SearchBox compact />
          </div>

          <nav className="mt-6 grid gap-3" aria-label="Mobile navigation">
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

          <div className="mt-6 border-t border-[var(--ap-border)] pt-6">
            <p className="anipulse-label mb-3 text-xs text-[var(--ap-text-muted)]">Coming next</p>
            <div className="grid grid-cols-2 gap-2">
              {futureNavigation.map((item) => (
                <span key={item.href} className="anipulse-badge justify-center text-center">
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
