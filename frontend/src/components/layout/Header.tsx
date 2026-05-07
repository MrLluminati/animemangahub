import Link from "next/link";

import { SearchBox } from "@/components/search/SearchBox";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/manga", label: "Manga" }
];

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500 font-black text-white">AM</span>
          <span>
            <span className="block text-base font-black tracking-tight">AniManga Hub</span>
            <span className="block text-xs text-slate-400">Discover · Track · Review</span>
          </span>
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchBox compact />
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
