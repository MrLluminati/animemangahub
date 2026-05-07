import { jikanFetch, mapJikanTitle, type JikanListResponse, type JikanSingleResponse } from "../lib/jikan";

export async function fetchTrendingAnime() {
  const payload = await jikanFetch<JikanListResponse>("/top/anime?filter=airing&limit=24");
  return payload.data.map((item) => mapJikanTitle(item, "anime"));
}

export async function fetchAnimeById(id: number) {
  const payload = await jikanFetch<JikanSingleResponse>(`/anime/${id}`);
  return mapJikanTitle(payload.data, "anime");
}

export async function searchAnime(query: string, limit = 12) {
  const searchParams = new URLSearchParams({
    q: query,
    limit: String(limit)
  });

  const payload = await jikanFetch<JikanListResponse>(`/anime?${searchParams.toString()}`);
  return payload.data.map((item) => mapJikanTitle(item, "anime"));
}
