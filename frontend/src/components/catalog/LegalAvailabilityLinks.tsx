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
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Availability</p>
          <h2 className="mt-3 text-2xl font-black text-white">{heading}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{note}</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
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
            className="group rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:border-orange-300/60 hover:bg-orange-500/10"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white">{link.name}</h3>
              <span className="text-sm font-bold text-orange-300 transition group-hover:text-orange-200">
                Open ↗
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{link.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-7 text-amber-100">
        AniManga Hub only points users toward official sources and safe discovery options.
        These buttons are discovery shortcuts and do not guarantee that every title is available on every platform or in every region.
      </div>
    </section>
  );
}
