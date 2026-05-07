import type { Request, Response } from "express";
import { searchAnime } from "../services/animeService";
import { searchManga } from "../services/mangaService";

export async function searchCatalog(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    res.json([]);
    return;
  }

  try {
    const [anime, manga] = await Promise.all([
      searchAnime(query, 8),
      searchManga(query, 8)
    ]);

    res.json([...anime, ...manga]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to search catalog" });
  }
}
