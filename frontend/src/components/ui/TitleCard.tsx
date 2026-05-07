import Image from "next/image";
import Link from "next/link";

import type { CatalogTitle } from "@/types/catalog";

type TitleCardProps = {
  item: CatalogTitle;
};

export function TitleCard({ item }: TitleCardProps) {
  const metaParts = [
    item.type,
    item.year ? String(item.year) : null,
    item.status,
  ].filter(Boolean);

  const href = `/${item.type}/${item.malId}`;

  return (
    <Link href={href} className="group block focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black">
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-xl shadow-black/20 transition group-hover:-translate-y-1 group-hover:border-rose-400/60 group-hover:bg-zinc-900">
        {item.imageUrl ? (
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-zinc-800 text-sm text-zinc-500">
            No image
          </div>
        )}

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-sm font-semibold text-white">
              {item.title}
            </h3>

            {typeof item.score === "number" ? (
              <span className="shrink-0 rounded-full bg-amber-400/15 px-2 py-1 text-xs font-semibold text-amber-300">
                {item.score.toFixed(1)}
              </span>
            ) : null}
          </div>

          {item.synopsis ? (
            <p className="line-clamp-2 text-xs text-zinc-400">{item.synopsis}</p>
          ) : null}

          {metaParts.length > 0 ? (
            <p className="text-xs text-zinc-500">{metaParts.join(" • ")}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
