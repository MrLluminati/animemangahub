import Link from "next/link";
import { notFound } from "next/navigation";

import { DetailHero } from "@/components/ui/DetailHero";
import { getMangaById } from "@/lib/api";

type MangaDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function MangaDetailPage({ params }: MangaDetailPageProps) {
  const manga = await getMangaById(params.id);

  if (!manga) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/manga" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
        ← Back to manga
      </Link>

      <DetailHero item={manga} />

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-xl font-bold text-white">Legal reading placeholder</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Phase 1B adds the detail page layer. Future phases will connect official publishers, availability regions, and affiliate-safe reading links.
        </p>
      </section>
    </div>
  );
}
