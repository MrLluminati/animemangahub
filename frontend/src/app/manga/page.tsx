import { TitleCard } from "@/components/ui/TitleCard";
import { getTopManga } from "@/lib/api";

export default async function MangaPage() {
  const manga = await getTopManga();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Catalog</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Manga</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Browse top manga from Jikan public API data. Click any card to open its Phase 1B detail page.
        </p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {manga.map((item) => <TitleCard key={item.malId} item={item} />)}
      </div>
    </div>
  );
}
