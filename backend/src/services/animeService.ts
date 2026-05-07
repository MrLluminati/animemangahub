import { jikanFetch, mapJikanTitle } from "../lib/jikan";

export async function fetchTrendingAnime() {
  const payload = await jikanFetch("/top/anime?filter=airing&limit=24");
  return payload.data.map((item) => mapJikanTitle(item, "anime"));
}
