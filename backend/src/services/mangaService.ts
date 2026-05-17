import { jikanFetch, mapJikanTitle, type JikanListResponse, type JikanSingleResponse } from "../lib/jikan";
import { getOrSetCache } from "./cacheService";

const LIST_CACHE_TTL_SECONDS = 60 * 60 * 6;
const DETAIL_CACHE_TTL_SECONDS = 60 * 60 * 24;
const SEARCH_CACHE_TTL_SECONDS = 60 * 60;
const FILTER_CACHE_TTL_SECONDS = 60 * 60;

export type MangaFilterOptions = { genre?: number; year?: number; status?: "publishing" | "complete" | "hiatus" | "discontinued" | "upcoming"; limit?: number };

export async function fetchTopManga() {
  return getOrSetCache("manga:top", LIST_CACHE_TTL_SECONDS, async () => {
    const payload = await jikanFetch<JikanListResponse>("/top/manga?limit=24");
    return payload.data.map((item) => mapJikanTitle(item, "manga"));
  });
}

export async function fetchFilteredManga(options: MangaFilterOptions = {}) {
  const limit = options.limit ?? 24;
  const genreKey = options.genre ?? "any";
  const yearKey = options.year ?? "any";
  const statusKey = options.status ?? "any";
  return getOrSetCache(`manga:filter:${genreKey}:${yearKey}:${statusKey}:${limit}`, FILTER_CACHE_TTL_SECONDS, async () => {
    const searchParams = new URLSearchParams({ limit: String(limit), order_by: "score", sort: "desc" });
    if (options.genre) searchParams.set("genres", String(options.genre));
    if (options.year) { searchParams.set("start_date", `${options.year}-01-01`); searchParams.set("end_date", `${options.year}-12-31`); }
    if (options.status) searchParams.set("status", options.status);
    const payload = await jikanFetch<JikanListResponse>(`/manga?${searchParams.toString()}`);
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
  const searchLimit = trimmedQuery.length <= 3 ? Math.max(limit, 16) : limit;
  return getOrSetCache(`manga:search:${trimmedQuery}:${searchLimit}`, SEARCH_CACHE_TTL_SECONDS, async () => {
    const searchParams = new URLSearchParams({ q: trimmedQuery, limit: String(searchLimit), order_by: "score", sort: "desc", sfw: "true" });
    const payload = await jikanFetch<JikanListResponse>(`/manga?${searchParams.toString()}`);
    return payload.data.map((item) => mapJikanTitle(item, "manga"));
  });
}
