import Link from "next/link";
import { notFound } from "next/navigation";

import { LegalAvailabilityLinks } from "@/components/catalog/LegalAvailabilityLinks";
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

      <LegalAvailabilityLinks item={anime} />
    </div>
  );
}
