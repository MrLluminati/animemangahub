import { SearchBox } from "@/components/search/SearchBox";
import { SearchSortSelect } from "@/components/search/SearchSortSelect";
import { SurfaceCard } from "@/components/theme/SurfaceCard";
import { ThemeBadge } from "@/components/theme/ThemeBadge";
import { TitleCard } from "@/components/ui/TitleCard";
import { searchCatalog, type SearchSort } from "@/lib/api";

type SearchPageProps = {
  searchParams?: {
    q?: string;
    sort?: string;
  };
};

function parseSort(value?: string): SearchSort {
  if (value === "score" || value === "popularity" || value === "year") {
    return value;
  }

  return "relevance";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q?.trim() ?? "";
  const sort = parseSort(searchParams?.sort);
  const results = query ? await searchCatalog(query, sort) : [];

  return (
    <div className="space-y-8">
      <SurfaceCard elevated className="p-8">
        <div className="space-y-4">
          <ThemeBadge>Search</ThemeBadge>
          <h1 className="anipulse-heading text-4xl">Find anime and manga</h1>
          <p className="max-w-2xl text-[var(--ap-text-muted)]">
            Search by exact title, partial title, or a single word. Exact matches are ranked first, followed by related anime and manga.
          </p>
          <div className="pt-2">
            <SearchBox defaultValue={query} />
          </div>
        </div>
      </SurfaceCard>

      {query ? (
        <section>
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="anipulse-heading text-2xl">Results for “{query}”</h2>
              <p className="mt-1 text-sm text-[var(--ap-text-muted)]">
                {results.length} result{results.length === 1 ? "" : "s"} found.
              </p>
            </div>

            <SearchSortSelect query={query} currentSort={sort} />
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((item, index) => (
                <TitleCard key={`${item.type}-${item.malId}`} item={item} priority={index === 0} />
              ))}
            </div>
          ) : (
            <SurfaceCard className="p-8 text-[var(--ap-text-muted)]">
              No results found. Try a different title, spelling, or related word.
            </SurfaceCard>
          )}
        </section>
      ) : null}
    </div>
  );
}
