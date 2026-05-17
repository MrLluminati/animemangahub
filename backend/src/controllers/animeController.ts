import type { Request, Response } from "express";
import { fetchAnimeById, fetchFilteredAnime, fetchTrendingAnime, searchAnime } from "../services/animeService";

const ANIME_STATUSES = new Set(["airing", "complete", "upcoming"]);

function parseOptionalPositiveInteger(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function parseOptionalYear(value: unknown) {
  const parsed = parseOptionalPositiveInteger(value);

  if (parsed === undefined || parsed === null) {
    return parsed;
  }

  const currentYear = new Date().getFullYear();
  return parsed >= 1900 && parsed <= currentYear + 2 ? parsed : null;
}

function parseOptionalAnimeStatus(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = String(value).trim().toLowerCase();
  return ANIME_STATUSES.has(parsed) ? (parsed as "airing" | "complete" | "upcoming") : null;
}

export async function getTrendingAnime(_req: Request, res: Response) {
  try {
    const anime = await fetchTrendingAnime();
    res.json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trending anime" });
  }
}

export async function getFilteredAnime(req: Request, res: Response) {
  const genre = parseOptionalPositiveInteger(req.query.genre);
  const year = parseOptionalYear(req.query.year);
  const status = parseOptionalAnimeStatus(req.query.status);

  if (genre === null) {
    res.status(400).json({ message: "Invalid anime genre filter" });
    return;
  }

  if (year === null) {
    res.status(400).json({ message: "Invalid anime year filter" });
    return;
  }

  if (status === null) {
    res.status(400).json({ message: "Invalid anime status filter" });
    return;
  }

  try {
    const anime = await fetchFilteredAnime({ genre, year, status, limit: 24 });
    res.json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch filtered anime" });
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
