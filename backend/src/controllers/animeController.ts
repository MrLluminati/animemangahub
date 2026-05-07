import type { Request, Response } from "express";
import { fetchTrendingAnime } from "../services/animeService";

export async function getTrendingAnime(_req: Request, res: Response) {
  try {
    const anime = await fetchTrendingAnime();
    res.json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trending anime" });
  }
}
