import Link from "next/link";
import { notFound } from "next/navigation";

import { LegalAvailabilityLinks } from "@/components/catalog/LegalAvailabilityLinks";
import { RelatedTitles } from "@/components/catalog/RelatedTitles";
import { DetailHero } from "@/components/ui/DetailHero";
import { getMangaById, getMangaRelations } from "@/lib/api";

type MangaDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function MangaDetailPage({ params }: MangaDetailPageProps) {
  const [manga, relations] = await Promise.all([
    getMangaById(params.id),
    getMangaRelations(params.id)
  ]);

  if (!manga) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/manga" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
        ← Back to manga
      </Link>

      <DetailHero item={manga} />

      <RelatedTitles groups={relations} />

      <LegalAvailabilityLinks item={manga} />
    </div>
  );
}
