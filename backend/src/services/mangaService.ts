import { jikanFetch, mapJikanTitle, type JikanListResponse, type JikanSingleResponse } from "../lib/jikan";

export async function fetchTopManga() {
  const payload = await jikanFetch<JikanListResponse>("/top/manga?limit=24");
  return payload.data.map((item) => mapJikanTitle(item, "manga"));
}

export async function fetchMangaById(id: number) {
  const payload = await jikanFetch<JikanSingleResponse>(`/manga/${id}`);
  return mapJikanTitle(payload.data, "manga");
}

export async function searchManga(query: string, limit = 12) {
  const searchParams = new URLSearchParams({
    q: query,
    limit: String(limit)
  });

  const payload = await jikanFetch<JikanListResponse>(`/manga?${searchParams.toString()}`);
  return payload.data.map((item) => mapJikanTitle(item, "manga"));
}
