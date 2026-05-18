import type { Request, Response } from "express";
import { searchAnime } from "../services/animeService";
import { searchManga } from "../services/mangaService";
import { parseSearchSort, sortSearchResults, type RankedCatalogTitle } from "../services/searchRankingService";

const SHORT_QUERY_LIMIT = 24;
const DEFAULT_QUERY_LIMIT = 12;
const SUGGESTION_LIMIT = 3;

async function getCombinedSearchResults(query: string, limit: number) {
  const [animeResult, mangaResult] = await Promise.allSettled([
    searchAnime(query, limit),
    searchManga(query, limit)
  ]);

  const anime = animeResult.status === "fulfilled" ? animeResult.value : [];
  const manga = mangaResult.status === "fulfilled" ? mangaResult.value : [];

  if (animeResult.status === "rejected") {
    console.error("Anime search failed", animeResult.reason);
  }

  if (mangaResult.status === "rejected") {
    console.error("Manga search failed", mangaResult.reason);
  }

  if (animeResult.status === "rejected" && mangaResult.status === "rejected") {
    throw new Error("Both anime and manga search failed");
  }

  return [...anime, ...manga] as RankedCatalogTitle[];
}

export async function searchCatalog(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();
  const sort = parseSearchSort(req.query.sort);

  if (!query) {
    res.json([]);
    return;
  }

  try {
    const limit = query.length <= 3 ? SHORT_QUERY_LIMIT : DEFAULT_QUERY_LIMIT;
    const combinedResults = await getCombinedSearchResults(query, limit);
    const sortedResults = sortSearchResults(combinedResults, query, sort);

    res.json(sortedResults);
  } catch (error) {
    console.error(error);
    res.status(502).json({ message: "Failed to search catalog" });
  }
}

export async function searchSuggestions(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (query.length < 2) {
    res.json([]);
    return;
  }

  try {
    const combinedResults = await getCombinedSearchResults(query, SHORT_QUERY_LIMIT);
    const suggestions = sortSearchResults(combinedResults, query, "relevance").slice(0, SUGGESTION_LIMIT);

    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(502).json({ message: "Failed to search suggestions" });
  }
}
