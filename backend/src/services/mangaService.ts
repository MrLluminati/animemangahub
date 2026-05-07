import { jikanFetch, mapJikanTitle } from "../lib/jikan";

export async function fetchTopManga() {
  const payload = await jikanFetch("/top/manga?limit=24");
  return payload.data.map((item) => mapJikanTitle(item, "manga"));
}
