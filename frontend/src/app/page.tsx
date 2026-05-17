import Link from "next/link";

import { SearchBox } from "@/components/search/SearchBox";
import { SurfaceCard } from "@/components/theme/SurfaceCard";
import { ThemeBadge } from "@/components/theme/ThemeBadge";
import { ThemeButton } from "@/components/theme/ThemeButton";
import { TitleCard } from "@/components/ui/TitleCard";
import { getTopManga, getTrendingAnime } from "@/lib/api";

export default async function HomePage() {
  const [anime, manga] = await Promise.all([
    getTrendingAnime(),
    getTopManga()
  ]);

  return (
    <div className="space-y-12">
      <SurfaceCard elevated className="p-8 md:p-12">
        <div className="space-y-6">
          <ThemeBadge>AniManga Hub</ThemeBadge>
          <h1 className="anipulse-heading max-w-4xl text-4xl md:text-6xl">
            The discovery hub for anime and manga fans.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--ap-text-muted)]">
            Search titles, explore trending anime and manga, and find official watch/read sources with reviews and personal lists coming next.
          </p>
          <div>
            <SearchBox />
          </div>
          <div className="flex flex-wrap gap-3">
            <ThemeButton as={Link} href="/anime">
              Explore Anime
            </ThemeButton>
            <ThemeButton as={Link} href="/manga" variant="secondary">
              Explore Manga
            </ThemeButton>
          </div>
        </div>
      </SurfaceCard>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="anipulse-heading text-2xl">Trending anime</h2>
            <p className="text-sm text-[var(--ap-text-muted)]">Live public data from Jikan/MyAnimeList.</p>
          </div>
          <Link href="/anime" className="text-sm font-semibold text-[var(--ap-primary-active)] hover:underline">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {anime.slice(0, 8).map((item) => <TitleCard key={`anime-${item.malId}`} item={item} />)}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="anipulse-heading text-2xl">Top manga</h2>
            <p className="text-sm text-[var(--ap-text-muted)]">A first catalog layer before local database caching.</p>
          </div>
          <Link href="/manga" className="text-sm font-semibold text-[var(--ap-primary-active)] hover:underline">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {manga.slice(0, 8).map((item) => <TitleCard key={`manga-${item.malId}`} item={item} />)}
        </div>
      </section>
    </div>
  );
}
