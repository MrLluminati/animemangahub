import Link from "next/link";

import { brand } from "@/config/brand";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { href: "/anime", label: "Anime" },
      { href: "/manga", label: "Manga" },
      { href: "/search", label: "Search" }
    ]
  },
  {
    title: "Future sections",
    links: [
      { href: "/reviews", label: "Reviews" },
      { href: "/guides", label: "Guides" },
      { href: "/culture", label: "Culture" }
    ]
  },
  {
    title: "Policies",
    links: [
      { href: "/about", label: "About" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/content-safety-policy", label: "Content Safety" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--ap-border)] bg-[var(--ap-surface-glass)]">
      <div className="mx-auto grid max-w-[1800px] gap-8 px-4 py-10 text-sm text-[var(--ap-text-muted)] sm:px-6 md:grid-cols-[1.2fr,2fr] lg:px-12">
        <div className="space-y-3">
          <p className="font-display text-xl font-black text-[var(--ap-text)]">{brand.brandName}</p>
          <p className="max-w-xl leading-7">
            {brand.tagline} Safe anime and manga culture coverage, official-source discovery, and no hosted anime or manga content.
          </p>
          <p className="text-xs font-bold text-[var(--ap-primary-active)]">{brand.website} / {brand.handle}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 font-semibold text-[var(--ap-text)]">
            <a
              href={brand.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit AniManga Wire on YouTube"
              className="transition hover:text-[var(--ap-primary-active)] focus-visible:text-[var(--ap-primary-active)]"
            >
              YouTube
            </a>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit AniManga Wire on Instagram"
              className="transition hover:text-[var(--ap-primary-active)] focus-visible:text-[var(--ap-primary-active)]"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="anipulse-label text-xs text-[var(--ap-text)]">{group.title}</p>
              <div className="grid gap-2">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-[var(--ap-primary-active)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
