import Link from "next/link";

import type { CatalogRelationGroup, RelatedCatalogTitle } from "@/types/catalog";

type RelatedTitlesProps = {
  groups: CatalogRelationGroup[];
};

function getTypeLabel(type: RelatedCatalogTitle["type"]) {
  return type === "anime" ? "Anime" : "Manga";
}

function getTitleHref(item: RelatedCatalogTitle) {
  return `/${item.type}/${item.malId}`;
}

export function RelatedTitles({ groups }: RelatedTitlesProps) {
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      entries: group.entries.filter((entry) => entry.type === "anime" || entry.type === "manga")
    }))
    .filter((group) => group.entries.length > 0);

  if (visibleGroups.length === 0) {
    return null;
  }

  return (
    <section className="anipulse-surface p-6 md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="anipulse-label text-xs text-[var(--ap-primary-active)]">Connections</p>
          <h2 className="mt-3 text-2xl font-black text-[var(--ap-text)]">Related titles</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--ap-text-muted)]">
            Explore adaptations, sequels, prequels, side stories, and other connected anime/manga entries from public catalog data.
          </p>
        </div>
        <span className="w-fit rounded-full border border-[var(--ap-border-strong)] bg-[color-mix(in_srgb,var(--ap-primary-active)_12%,transparent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ap-primary-active)]">
          Cross-reference
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {visibleGroups.map((group) => (
          <div key={group.relation} className="rounded-[var(--ap-radius-card)] border border-[var(--ap-border)] bg-[color-mix(in_srgb,var(--ap-surface-container)_72%,transparent)] p-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--ap-text-muted)]">{group.relation}</h3>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {group.entries.map((entry) => (
                <Link
                  key={`${group.relation}-${entry.type}-${entry.malId}`}
                  href={getTitleHref(entry)}
                  className="group flex min-h-[72px] items-center justify-between gap-4 rounded-[var(--ap-radius-control)] border border-[var(--ap-border)] bg-[color-mix(in_srgb,var(--ap-surface-container-lowest)_80%,transparent)] p-4 transition hover:border-[var(--ap-border-strong)] hover:bg-[color-mix(in_srgb,var(--ap-primary-active)_10%,transparent)]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[var(--ap-text)]">{entry.title}</span>
                    <span className="mt-2 inline-flex rounded-full border border-[var(--ap-border)] px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--ap-text-muted)]">
                      {getTypeLabel(entry.type)}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-[var(--ap-primary-active)] transition group-hover:translate-x-1">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
