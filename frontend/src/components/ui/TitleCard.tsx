import Image from "next/image";

type TitleCardProps = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  score?: number | null;
  meta?: string;
};

export function TitleCard({
  title,
  subtitle,
  imageUrl,
  score,
  meta,
}: TitleCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-rose-400/60 hover:bg-zinc-900">
      {imageUrl ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] w-full items-center justify-center bg-zinc-800 text-sm text-zinc-500">
          No image
        </div>
      )}

      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {title}
          </h3>

          {typeof score === "number" ? (
            <span className="rounded-full bg-amber-400/15 px-2 py-1 text-xs font-semibold text-amber-300">
              {score.toFixed(1)}
            </span>
          ) : null}
        </div>

        {subtitle ? (
          <p className="line-clamp-2 text-xs text-zinc-400">{subtitle}</p>
        ) : null}

        {meta ? <p className="text-xs text-zinc-500">{meta}</p> : null}
      </div>
    </article>
  );
}