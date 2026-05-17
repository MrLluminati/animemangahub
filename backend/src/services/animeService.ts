import { jikanFetch, mapJikanTitle, type JikanListResponse, type JikanSingleResponse } from "../lib/jikan";
import { getOrSetCache } from "./cacheService";

const LIST_CACHE_TTL_SECONDS = 60 * 60 * 6;
const DETAIL_CACHE_TTL_SECONDS = 60 * 60 * 24;
const SEARCH_CACHE_TTL_SECONDS = 60 * 60;
const FILTER_CACHE_TTL_SECONDS = 60 * 60;

export type AnimeFilterOptions = {
  genre?: number;
  year?: number;
  status?: "airing" | "complete" | "upcoming";
  limit?: number;
};

export async function fetchTrendingAnime() {
  return getOrSetCache("anime:trending", LIST_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanListResponse>("/top/anime?filter=airing&limit=24");
    return payload.data.map((item) => mapJikanTitle(item, "anime"));
  });
}

export async function fetchFilteredAnime(options: AnimeFilterOptions = {}) {
  const limit = options.limit ?? 24;
  const genreKey = options.genre ?? "any";
  const yearKey = options.year ?? "any";
  const statusKey = options.status ?? "any";

  return getOrSetCache(`anime:filter:${genreKey}:${yearKey}:${statusKey}:${limit}`, FILTER_CACHE_TTL_SECONDS, async () => {
    const searchParams = new URLSearchParams({
      limit: String(limit),
      order_by: "score",
      sort: "desc"
    });

    if (options.genre) {
      searchParams.set("genres", String(options.genre));
    }

    if (options.year) {
      searchParams.set("start_date", `${options.year}-01-01`);
      searchParams.set("end_date", `${options.year}-12-31`);
    }

    if (options.status) {
      searchParams.set("status", options.status);
    }

    const payload = await jikanFetch<JikanListResponse>(`/anime?${searchParams.toString()}`);
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
