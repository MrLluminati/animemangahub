import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { TitleCard } from "@/components/ui/TitleCard";
import { getFilteredManga, getTopManga, type CatalogFilterParams } from "@/lib/api";

type PageSearchParams = Record<string, string | string[] | undefined>;

const MANGA_STATUS_OPTIONS = [
  { label: "Publishing", value: "publishing" },
  { label: "Complete", value: "complete" },
  { label: "Hiatus", value: "hiatus" },
  { label: "Discontinued", value: "discontinued" },
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

export default async function MangaPage({ searchParams }: { searchParams?: PageSearchParams }) {
  const filters = getFilters(searchParams);
  const isFiltered = hasActiveFilters(filters);
  const manga = isFiltered ? await getFilteredManga(filters) : await getTopManga();

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Catalog</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Manga</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Browse manga from Jikan public API data. Use safe catalog filters for genre, publication year, and status.
        </p>
      </section>

      <CatalogFilters
        action="/manga"
        selectedGenre={filters.genre}
        selectedYear={filters.year}
        selectedStatus={filters.status}
        statusOptions={MANGA_STATUS_OPTIONS}
      />

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-400">
            {isFiltered ? "Filtered manga results" : "Top manga"}
          </p>
          <p className="text-xs text-slate-500">
            Showing {manga.length} title{manga.length === 1 ? "" : "s"}.
          </p>
        </div>

        {manga.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {manga.map((item) => <TitleCard key={item.malId} item={item} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-slate-300">
            No manga matched these filters. Try a broader genre, year, or status.
          </div>
        )}
      </section>
    </div>
  );
}
