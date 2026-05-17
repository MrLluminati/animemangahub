import Link from "next/link";

import { SearchBox } from "@/components/search/SearchBox";
import { BrandMark } from "@/components/theme/BrandMark";
import { MobileNav } from "@/components/theme/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mainNavigation } from "@/theme/navigation";

export function Header() {
  return (
    <header className="sticky top-3 z-40 mx-auto w-[calc(100%-2rem)] max-w-[1800px] border border-[var(--ap-border)] bg-[var(--ap-surface-glass)] px-4 py-3 shadow-[var(--ap-shadow-soft)] backdrop-blur-xl md:top-4 md:w-[calc(100%-3rem)] lg:px-5">
      <div className="flex items-center justify-between gap-4">
        <BrandMark />

        <nav className="hidden items-center gap-2 md:flex">
          {mainNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="anipulse-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SearchBox compact />
          <ThemeToggle />
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
