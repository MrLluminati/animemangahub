import type { Request, Response } from "express";
import { fetchAnimeById, fetchTrendingAnime, searchAnime } from "../services/animeService";

export async function getTrendingAnime(_req: Request, res: Response) {
  try {
    const anime = await fetchTrendingAnime();
    res.json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trending anime" });
  }
}

export async function getAnimeById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid anime id" });
    return;
  }

  try {
    const anime = await fetchAnimeById(id);
    res.json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch anime detail" });
  }
}

export async function searchAnimeTitles(req: Request, res: Response) {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    res.json([]);
    return;
  }

  try {
    const anime = await searchAnime(query);
    res.json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to search anime" });
  }
}
