import type { CatalogTitle } from "@/types/catalog";

type LegalAvailabilityLinksProps = {
  item: CatalogTitle;
};

type LegalPlatformLink = {
  name: string;
  description: string;
  href: string;
};

function encodeTitle(title: string) {
  return encodeURIComponent(title.trim());
}

function getAnimeLinks(title: string): LegalPlatformLink[] {
  const query = encodeTitle(title);

  return [
    {
      name: "Crunchyroll",
      description: "Search official anime streaming catalog.",
      href: `https://www.crunchyroll.com/search?q=${query}`
    },
    {
      name: "Netflix",
      description: "Search official Netflix title availability.",
      href: `https://www.netflix.com/search?q=${query}`
    },
    {
      name: "Prime Video",
      description: "Search official Prime Video catalog.",
      href: `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${query}`
    },
    {
      name: "YouTube",
      description: "Search official channels and licensed uploads only.",
      href: `https://www.youtube.com/results?search_query=${query}%20official%20anime`
    }
  ];
}

function getMangaLinks(title: string): LegalPlatformLink[] {
  const query = encodeTitle(title);

  return [
    {
      name: "MANGA Plus",
      description: "Search Shueisha's official manga reading service.",
      href: `https://mangaplus.shueisha.co.jp/search_result?keyword=${query}`
    },
    {
      name: "VIZ",
      description: "Search official VIZ manga pages.",
      href: `https://www.viz.com/search?search=${query}`
    },
    {
      name: "BookWalker",
      description: "Search official digital manga store pages.",
      href: `https://global.bookwalker.jp/search/?qcat=&word=${query}`
    },
    {
      name: "Kodansha",
      description: "Search official Kodansha manga pages.",
      href: `https://kodansha.us/?s=${query}`
    }
  ];
}

export function LegalAvailabilityLinks({ item }: LegalAvailabilityLinksProps) {
  const links = item.type === "anime" ? getAnimeLinks(item.title) : getMangaLinks(item.title);
  const heading = item.type === "anime" ? "Where to watch" : "Where to read";
  const note =
    item.type === "anime"
      ? "Check streaming platforms and official sources. Availability can vary by region and may change over time."
      : "Check publishers, stores, and official reading platforms. Availability can vary by region and may change over time.";

  return (
    <section className="anipulse-surface p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="anipulse-label text-sm text-[var(--ap-primary-active)]">Availability</p>
          <h2 className="mt-3 text-2xl font-black text-[var(--ap-text)]">{heading}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ap-text-muted)]">{note}</p>
        </div>
        <span className="rounded-[var(--ap-radius-control)] border border-[var(--ap-border-strong)] bg-[var(--ap-surface-container-lowest)] px-3 py-1 text-xs font-bold uppercase text-[var(--ap-primary-active)]">
          Official sources
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="manga-panel group p-5 transition hover:border-[var(--ap-primary-active)]"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-[var(--ap-text)]">{link.name}</h3>
              <span className="text-sm font-bold text-[var(--ap-primary-active)] transition group-hover:translate-x-1">
                Open
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--ap-text-muted)]">{link.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-5 rounded-[var(--ap-radius-card)] border border-[var(--ap-border-strong)] bg-[rgba(222,28,34,0.12)] p-4 text-sm leading-7 text-[var(--ap-text)]">
        AniManga Wire only points users toward official sources and safe discovery options.
        These buttons are discovery shortcuts and do not guarantee that every title is available on every platform or in every region.
      </div>
    </section>
  );
}
