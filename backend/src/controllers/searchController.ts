import type { Request, Response } from "express";
import { searchAnime } from "../services/animeService";
import { searchManga } from "../services/mangaService";

const SHORT_QUERY_LIMIT = 16;
const DEFAULT_QUERY_LIMIT = 8;

export async function searchCatalog(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (!query || query.length < 2) {
    res.json([]);
    return;
  }

  const limit = query.length <= 3 ? SHORT_QUERY_LIMIT : DEFAULT_QUERY_LIMIT;
  const [animeResult, mangaResult] = await Promise.allSettled([
    searchAnime(query, limit),
    searchManga(query, limit)
  ]);

  const anime = animeResult.status === "fulfilled" ? animeResult.value : [];
  const manga = mangaResult.status === "fulfilled" ? mangaResult.value : [];

  if (animeResult.status === "rejected") console.error("Anime search failed", animeResult.reason);
  if (mangaResult.status === "rejected") console.error("Manga search failed", mangaResult.reason);

  if (animeResult.status === "rejected" && mangaResult.status === "rejected") {
    res.status(502).json({ message: "Failed to search catalog" });
    return;
  }

  res.json([...anime, ...manga]);
}
