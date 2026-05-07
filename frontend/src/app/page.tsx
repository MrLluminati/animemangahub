import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { TitleCard } from "@/components/ui/TitleCard";
import { getTrendingAnime, getTopManga } from "@/lib/api";

export default async function HomePage() {
  const [anime, manga] = await Promise.all([
    getTrendingAnime(),
    getTopManga()
  ]);

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-300">
          AniManga Hub
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          The discovery hub for anime and manga fans.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Search titles, explore trending anime and manga, and build toward a legal watch/read directory with community reviews and personal lists.
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/anime" className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">
            Explore Anime
          </Link>
          <Link href="/manga" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            Explore Manga
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Trending anime</h2>
            <p className="text-sm text-slate-400">Live public data from Jikan/MyAnimeList.</p>
          </div>
          <Link href="/anime" className="text-sm font-semibold text-orange-300 hover:text-orange-200">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {anime.slice(0, 8).map((item) => <TitleCard key={`anime-${item.malId}`} item={item} />)}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Top manga</h2>
            <p className="text-sm text-slate-400">A first catalog layer before local database caching.</p>
          </div>
          <Link href="/manga" className="text-sm font-semibold text-orange-300 hover:text-orange-200">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {manga.slice(0, 8).map((item) => <TitleCard key={`manga-${item.malId}`} item={item} />)}
        </div>
      </section>
    </div>
  );
}
