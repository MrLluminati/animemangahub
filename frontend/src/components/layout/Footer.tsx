import Link from "next/link";

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
          <p className="font-display text-xl font-black text-[var(--ap-text)]">AniManga Hub</p>
          <p className="max-w-xl leading-7">
            Built with AniPulse: a mobile-first anime, manga, guide, and culture discovery theme. Data is shown through public metadata APIs, with official-source discovery and no hosted anime or manga content.
          </p>
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
