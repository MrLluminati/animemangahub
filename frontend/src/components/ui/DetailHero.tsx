import Image from "next/image";

import type { CatalogTitle } from "@/types/catalog";

type DetailHeroProps = {
  item: CatalogTitle;
};

function DetailMeta({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <div className="manga-panel p-4">
      <p className="anipulse-label text-xs text-[var(--ap-text-muted)]">{label}</p>
      <p className="mt-2 font-semibold text-[var(--ap-text)]">{value}</p>
    </div>
  );
}

export function DetailHero({ item }: DetailHeroProps) {
  const tags = [
    ...(item.genres ?? []),
    ...(item.themes ?? []),
    ...(item.demographics ?? [])
  ];

  return (
    <article className="grid gap-8 lg:grid-cols-[320px,1fr]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--ap-radius-card)] border-2 border-[var(--ap-border)] bg-[var(--ap-surface-container-high)] shadow-[var(--ap-shadow-strong)]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 90vw, 320px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--ap-text-muted)]">
            No image
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="anipulse-label text-sm text-[var(--ap-primary-active)]">
            {item.type}
          </p>
          <h1 className="anipulse-heading mt-4 text-4xl md:text-6xl">
            {item.title}
          </h1>
          {item.synopsis ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--ap-text-muted)]">
              {item.synopsis}
            </p>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailMeta label="Score" value={typeof item.score === "number" ? item.score.toFixed(1) : null} />
          <DetailMeta label="Status" value={item.status} />
          <DetailMeta label="Year" value={item.year} />
          <DetailMeta label="Rating" value={item.rating} />
          <DetailMeta label="Source" value={item.source} />
          <DetailMeta label="Episodes" value={item.episodes} />
          <DetailMeta label="Chapters" value={item.chapters} />
          <DetailMeta label="Volumes" value={item.volumes} />
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-[var(--ap-radius-control)] border border-[var(--ap-border)] bg-[var(--ap-surface-container-lowest)] px-3 py-1 text-xs font-semibold text-[var(--ap-text-muted)]">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
