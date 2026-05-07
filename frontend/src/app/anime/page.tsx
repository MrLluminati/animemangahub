import { TitleCard } from "@/components/ui/TitleCard";
import { getTrendingAnime } from "@/lib/api";

export default async function AnimePage() {
  const anime = await getTrendingAnime();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Catalog</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Anime</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Phase 1A uses Jikan public API data. Filters, detail pages, and local database caching come next.
        </p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {anime.map((item) => <TitleCard key={item.malId} item={item} />)}
      </div>
    </div>
  );
}
