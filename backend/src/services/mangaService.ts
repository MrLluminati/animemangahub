import { jikanFetch, mapJikanTitle, type JikanListResponse, type JikanSingleResponse } from "../lib/jikan";
import { getOrSetCache } from "./cacheService";

const LIST_CACHE_TTL_SECONDS = 60 * 60 * 6;
const DETAIL_CACHE_TTL_SECONDS = 60 * 60 * 24;
const SEARCH_CACHE_TTL_SECONDS = 60 * 60;

export async function fetchTopManga() {
  return getOrSetCache("manga:top", LIST_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanListResponse>("/top/manga?limit=24");
    return payload.data.map((item) => mapJikanTitle(item, "manga"));
  });
}

export async function fetchMangaById(id: number) {
  return getOrSetCache(`manga:detail:${id}`, DETAIL_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanSingleResponse>(`/manga/${id}`);
    return mapJikanTitle(payload.data, "manga");
  });
}

export async function searchManga(query: string, limit = 12) {
  const trimmedQuery = query.trim().toLowerCase();

  return getOrSetCache(`manga:search:${trimmedQuery}:${limit}`, SEARCH_CACHE_TTL_SECONDS, async () => {
    const searchParams = new URLSearchParams({
      q: trimmedQuery,
      limit: String(limit)
    });

    const payload = await jikanFetch<JikanListResponse>(`/manga?${searchParams.toString()}`);
    return payload.data.map((item) => mapJikanTitle(item, "manga"));
  });
}
