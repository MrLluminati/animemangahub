import type { Request, Response } from "express";
import { fetchTopManga } from "../services/mangaService";

export async function getTopManga(_req: Request, res: Response) {
  try {
    const manga = await fetchTopManga();
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch top manga" });
  }
}
