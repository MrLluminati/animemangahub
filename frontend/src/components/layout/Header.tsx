import Link from "next/link";

import { SearchBox } from "@/components/search/SearchBox";
import { BrandMark } from "@/components/theme/BrandMark";
import { MobileNav } from "@/components/theme/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mainNavigation } from "@/theme/navigation";

export function Header() {
  return (
    <header className="sticky top-2 z-40 mx-auto w-[calc(100%-1rem)] max-w-[1800px] border border-[var(--ap-border)] bg-[var(--ap-surface-glass)] px-3 py-3 shadow-[var(--ap-shadow-soft)] backdrop-blur-xl sm:top-3 sm:w-[calc(100%-2rem)] sm:px-4 lg:top-4 lg:px-5">
      <div className="flex items-center justify-between gap-3">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="anipulse-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden xl:block">
            <SearchBox compact />
          </div>

          <ThemeToggle />

          <MobileNav />
        </div>
      </div>

      <div className="mt-3 xl:hidden">
        <SearchBox compact />
      </div>
    </header>
  );
}
