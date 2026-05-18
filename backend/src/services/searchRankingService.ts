export type SearchSort = "relevance" | "score" | "popularity" | "year";

export type RankedCatalogTitle = {
  malId: number;
  title: string;
  nativeTitle?: string | null;
  titleEnglish?: string | null;
  titleJapanese?: string | null;
  titleSynonyms?: string[];
  type: "anime" | "manga";
  imageUrl: string | null;
  score: number | null;
  rank?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites?: number | null;
  year: number | null;
  status: string | null;
  synopsis: string | null;
  genres?: string[];
  themes?: string[];
  demographics?: string[];
  rating?: string | null;
  source?: string | null;
  episodes?: number | null;
  chapters?: number | null;
  volumes?: number | null;
  relevanceScore?: number;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getTitleCandidates(item: RankedCatalogTitle) {
  return [
    item.title,
    item.nativeTitle,
    item.titleEnglish,
    item.titleJapanese,
    ...(item.titleSynonyms ?? [])
  ].filter((value): value is string => Boolean(value?.trim()));
}

function getTextCandidates(item: RankedCatalogTitle) {
  return [
    item.synopsis,
    ...(item.genres ?? []),
    ...(item.themes ?? []),
    ...(item.demographics ?? [])
  ].filter((value): value is string => Boolean(value?.trim()));
}

function scoreTitleMatch(query: string, candidate: string) {
  const normalizedTitle = normalize(candidate);

  if (!normalizedTitle) {
    return 0;
  }

  if (normalizedTitle === query) {
    return 10000;
  }

  if (normalizedTitle.startsWith(`${query} `) || normalizedTitle.startsWith(query)) {
    return 7000;
  }

  if (normalizedTitle.split(" ").some((word) => word === query)) {
    return 5200;
  }

  if (normalizedTitle.includes(` ${query} `) || normalizedTitle.endsWith(` ${query}`)) {
    return 4200;
  }

  if (normalizedTitle.includes(query)) {
    return 3000;
  }

  return 0;
}

function scoreTextMatch(query: string, candidate: string) {
  const normalizedText = normalize(candidate);

  if (!normalizedText) {
    return 0;
  }

  if (normalizedText.split(" ").some((word) => word === query)) {
    return 350;
  }

  if (normalizedText.includes(query)) {
    return 150;
  }

  return 0;
}

export function calculateRelevanceScore(item: RankedCatalogTitle, query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return 0;
  }

  const titleScore = Math.max(
    0,
    ...getTitleCandidates(item).map((candidate) => scoreTitleMatch(normalizedQuery, candidate))
  );

  const textScore = Math.max(
    0,
    ...getTextCandidates(item).map((candidate) => scoreTextMatch(normalizedQuery, candidate))
  );

  const scoreBoost = item.score ? item.score * 40 : 0;
  const memberBoost = item.members ? Math.min(500, Math.log10(Math.max(item.members, 1)) * 80) : 0;
  const favoriteBoost = item.favorites ? Math.min(250, Math.log10(Math.max(item.favorites, 1)) * 50) : 0;
  const rankBoost = item.rank ? Math.max(0, 250 - Math.min(item.rank, 250)) : 0;
  const typeBoost = item.type === "anime" ? 20 : 0;

  return Math.round(titleScore + textScore + scoreBoost + memberBoost + favoriteBoost + rankBoost + typeBoost);
}

function dedupeByTypeAndId(items: RankedCatalogTitle[]) {
  const seen = new Set<string>();
  const uniqueItems: RankedCatalogTitle[] = [];

  for (const item of items) {
    const key = `${item.type}:${item.malId}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueItems.push(item);
  }

  return uniqueItems;
}

export function sortSearchResults(items: RankedCatalogTitle[], query: string, sort: SearchSort = "relevance") {
  const rankedItems = dedupeByTypeAndId(items).map((item) => ({
    ...item,
    relevanceScore: calculateRelevanceScore(item, query)
  }));

  const sortedItems = [...rankedItems].sort((a, b) => {
    if (sort === "score") {
      return (b.score ?? -1) - (a.score ?? -1) || (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
    }

    if (sort === "popularity") {
      return (b.members ?? 0) - (a.members ?? 0) || (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
    }

    if (sort === "year") {
      return (b.year ?? 0) - (a.year ?? 0) || (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
    }

    return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0) || (b.members ?? 0) - (a.members ?? 0);
  });

  if (sort !== "relevance") {
    return sortedItems;
  }

  return sortedItems.filter((item) => (item.relevanceScore ?? 0) > 0);
}

export function parseSearchSort(value: unknown): SearchSort {
  if (value === "score" || value === "popularity" || value === "year") {
    return value;
  }

  return "relevance";
}
