import { SearchBox } from "@/components/search/SearchBox";
import { TitleCard } from "@/components/ui/TitleCard";
import { searchCatalog } from "@/lib/api";

type SearchPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q?.trim() ?? "";
  const results = query ? await searchCatalog(query) : [];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Search</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Find anime and manga</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Search currently uses live Jikan public API data. Local database caching comes in a later Phase 1B/1C iteration.
        </p>
        <div className="mt-6">
          <SearchBox defaultValue={query} />
        </div>
      </section>

      {query ? (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Results for “{query}”</h2>
            <p className="mt-1 text-sm text-slate-400">{results.length} result{results.length === 1 ? "" : "s"} found.</p>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((item) => (
                <TitleCard key={`${item.type}-${item.malId}`} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-300">
              No results found. Try a different title.
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
