import { SearchBox } from "@/components/search/SearchBox";
import { SurfaceCard } from "@/components/theme/SurfaceCard";
import { ThemeBadge } from "@/components/theme/ThemeBadge";
import { TitleCard } from "@/components/ui/TitleCard";
import { searchCatalog } from "@/lib/api";

type SearchPageProps = { searchParams?: { q?: string } };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q?.trim() ?? "";
  const isTooShort = query.length === 1;
  const results = query && !isTooShort ? await searchCatalog(query) : [];

  return (
    <div className="space-y-8">
      <SurfaceCard elevated className="p-8">
        <div className="space-y-4">
          <ThemeBadge>Search</ThemeBadge>
          <h1 className="anipulse-heading text-4xl">Find anime and manga</h1>
          <p className="max-w-2xl text-[var(--ap-text-muted)]">
            Search uses live public catalog metadata. Short but meaningful queries are supported, while single-character searches are intentionally ignored.
          </p>
          <div className="pt-2"><SearchBox defaultValue={query} /></div>
        </div>
      </SurfaceCard>
      {query ? (
        <section>
          <div className="mb-5">
            <h2 className="anipulse-heading text-2xl">Results for “{query}”</h2>
            <p className="mt-1 text-sm text-[var(--ap-text-muted)]">
              {isTooShort ? "Enter at least 2 characters to search." : `${results.length} result${results.length === 1 ? "" : "s"} found.`}
            </p>
          </div>
          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((item) => <TitleCard key={`${item.type}-${item.malId}`} item={item} />)}
            </div>
          ) : (
            <SurfaceCard className="p-8 text-[var(--ap-text-muted)]">
              {isTooShort ? "Try a longer title fragment." : "No results found. Try a different or more specific title."}
            </SurfaceCard>
          )}
        </section>
      ) : null}
    </div>
  );
}
