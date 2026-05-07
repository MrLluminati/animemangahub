import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailHero } from "@/components/ui/DetailHero";
import { getAnimeById } from "@/lib/api";

type AnimeDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const anime = await getAnimeById(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/anime" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
        ← Back to anime
      </Link>

      <DetailHero item={anime} />

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-xl font-bold text-white">Legal availability placeholder</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Phase 1B adds the detail page layer. Future phases will connect official streaming platforms, availability regions, and partner links.
        </p>
      </section>
    </div>
  );
}
