import { jikanFetch, mapJikanTitle, type JikanListResponse, type JikanSingleResponse } from "../lib/jikan";
import { getOrSetCache } from "./cacheService";

const LIST_CACHE_TTL_SECONDS = 60 * 60 * 6;
const DETAIL_CACHE_TTL_SECONDS = 60 * 60 * 24;
const SEARCH_CACHE_TTL_SECONDS = 60 * 60;

export async function fetchTrendingAnime() {
  return getOrSetCache("anime:trending", LIST_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanListResponse>("/top/anime?filter=airing&limit=24");
    return payload.data.map((item) => mapJikanTitle(item, "anime"));
  });
}

export async function fetchAnimeById(id: number) {
  return getOrSetCache(`anime:detail:${id}`, DETAIL_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanSingleResponse>(`/anime/${id}`);
    return mapJikanTitle(payload.data, "anime");
  });
}

export async function searchAnime(query: string, limit = 12) {
  const trimmedQuery = query.trim().toLowerCase();

  return getOrSetCache(`anime:search:${trimmedQuery}:${limit}`, SEARCH_CACHE_TTL_SECONDS, async () => {
    const searchParams = new URLSearchParams({
      q: trimmedQuery,
      limit: String(limit)
    });

    const payload = await jikanFetch<JikanListResponse>(`/anime?${searchParams.toString()}`);
    return payload.data.map((item) => mapJikanTitle(item, "anime"));
  });
}
