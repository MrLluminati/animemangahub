import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { TitleCard } from "@/components/ui/TitleCard";
import { getFilteredAnime, getTrendingAnime, type CatalogFilterParams } from "@/lib/api";

type PageSearchParams = Record<string, string | string[] | undefined>;

const ANIME_STATUS_OPTIONS = [
  { label: "Airing", value: "airing" },
  { label: "Complete", value: "complete" },
  { label: "Upcoming", value: "upcoming" }
];

function getFirstParam(searchParams: PageSearchParams | undefined, key: string) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

function getFilters(searchParams: PageSearchParams | undefined): CatalogFilterParams {
  return {
    genre: getFirstParam(searchParams, "genre"),
    year: getFirstParam(searchParams, "year"),
    status: getFirstParam(searchParams, "status")
  };
}

function hasActiveFilters(filters: CatalogFilterParams) {
  return Boolean(filters.genre || filters.year || filters.status);
}

export default async function AnimePage({ searchParams }: { searchParams?: PageSearchParams }) {
  const filters = getFilters(searchParams);
  const isFiltered = hasActiveFilters(filters);
  const anime = isFiltered ? await getFilteredAnime(filters) : await getTrendingAnime();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Catalog</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Anime</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Browse anime from Jikan public API data. Use safe catalog filters for genre, release year, and status.
        </p>
      </section>

      <CatalogFilters
        action="/anime"
        selectedGenre={filters.genre}
        selectedYear={filters.year}
        selectedStatus={filters.status}
        statusOptions={ANIME_STATUS_OPTIONS}
      />

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-400">
            {isFiltered ? "Filtered anime results" : "Currently airing anime"}
          </p>
          <p className="text-xs text-slate-500">
            Showing {anime.length} title{anime.length === 1 ? "" : "s"}.
          </p>
        </div>

        {anime.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {anime.map((item) => <TitleCard key={item.malId} item={item} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-slate-300">
            No anime matched these filters. Try a broader genre, year, or status.
          </div>
        )}
      </section>
    </div>
  );
}
