import type { CatalogTitle } from "@/types/catalog";

type TitleCardProps = {
  item: CatalogTitle;
};

export function TitleCard({ item }: TitleCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="aspect-[3/4] bg-slate-900">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-slate-500">No image</div>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-base font-bold text-white">{item.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{item.type}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {typeof item.score === "number" && <span className="rounded-full bg-white/10 px-3 py-1">★ {item.score}</span>}
          {item.year && <span className="rounded-full bg-white/10 px-3 py-1">{item.year}</span>}
          {item.status && <span className="rounded-full bg-white/10 px-3 py-1">{item.status}</span>}
        </div>
      </div>
    </article>
  );
}
