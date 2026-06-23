import { jikanFetch } from "../lib/jikan";
import { getOrSetCache } from "./cacheService";

type CatalogRelationType = "anime" | "manga";

type JikanRelationEntry = {
  mal_id?: number;
  type?: string;
  name?: string;
  url?: string;
};

type JikanRelationGroup = {
  relation?: string;
  entry?: JikanRelationEntry[];
};

type JikanRelationResponse = {
  data?: JikanRelationGroup[];
};

export type RelatedCatalogTitle = {
  malId: number;
  title: string;
  type: CatalogRelationType;
  url: string | null;
};

export type CatalogRelationGroup = {
  relation: string;
  entries: RelatedCatalogTitle[];
};

const RELATION_CACHE_TTL_SECONDS = 60 * 60 * 24;

function mapEntryType(type?: string): CatalogRelationType | null {
  const normalizedType = type?.trim().toLowerCase();

  if (normalizedType === "anime" || normalizedType === "manga") {
    return normalizedType;
  }

  return null;
}

function normalizeRelationLabel(relation?: string) {
  return relation?.trim() || "Related";
}

function mapRelationGroup(group: JikanRelationGroup): CatalogRelationGroup | null {
  const entries =
    group.entry
      ?.map((entry) => {
        const type = mapEntryType(entry.type);

        if (!type || !entry.mal_id || !entry.name?.trim()) {
          return null;
        }

        return {
          malId: entry.mal_id,
          title: entry.name.trim(),
          type,
          url: entry.url ?? null
        };
      })
      .filter((entry): entry is RelatedCatalogTitle => Boolean(entry)) ?? [];

  if (entries.length === 0) {
    return null;
  }

  return {
    relation: normalizeRelationLabel(group.relation),
    entries
  };
}

export async function fetchTitleRelations(type: CatalogRelationType, id: number) {
  return getOrSetCache(`title:relations:${type}:${id}`, RELATION_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanRelationResponse>(`/${type}/${id}/relations`);

    return (payload.data ?? [])
      .map(mapRelationGroup)
      .filter((group): group is CatalogRelationGroup => Boolean(group));
  });
}
