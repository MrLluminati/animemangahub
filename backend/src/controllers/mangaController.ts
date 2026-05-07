import type { Request, Response } from "express";
import { fetchMangaById, fetchTopManga, searchManga } from "../services/mangaService";

export async function getTopManga(_req: Request, res: Response) {
  try {
    const manga = await fetchTopManga();
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch top manga" });
  }
}

export async function getMangaById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid manga id" });
    return;
  }

  try {
    const manga = await fetchMangaById(id);
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch manga detail" });
  }
}

export async function searchMangaTitles(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    res.json([]);
    return;
  }

  try {
    const manga = await searchManga(query);
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to search manga" });
  }
}
