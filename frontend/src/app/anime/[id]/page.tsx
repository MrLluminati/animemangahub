import Link from "next/link";
import { notFound } from "next/navigation";

import { LegalAvailabilityLinks } from "@/components/catalog/LegalAvailabilityLinks";
import { RelatedTitles } from "@/components/catalog/RelatedTitles";
import { DetailHero } from "@/components/ui/DetailHero";
import { getAnimeById, getAnimeRelations } from "@/lib/api";

type AnimeDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const [anime, relations] = await Promise.all([
    getAnimeById(params.id),
    getAnimeRelations(params.id)
  ]);

  if (!anime) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/anime" className="text-sm font-semibold text-[var(--ap-primary-active)] hover:underline">
        Back to anime
      </Link>

      <DetailHero item={anime} />

      <RelatedTitles groups={relations} />

      <LegalAvailabilityLinks item={anime} />
    </div>
  );
}
