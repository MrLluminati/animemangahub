import type { Request, Response } from "express";
import { fetchFilteredManga, fetchMangaById, fetchTopManga, searchManga } from "../services/mangaService";
import { fetchTitleRelations } from "../services/relationService";

const MANGA_STATUSES = new Set(["publishing", "complete", "hiatus", "discontinued", "upcoming"]);

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

function parseOptionalMangaStatus(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed = String(value).trim().toLowerCase();

  return MANGA_STATUSES.has(parsed)
    ? (parsed as "publishing" | "complete" | "hiatus" | "discontinued" | "upcoming")
    : null;
}

function parseRequiredPositiveInteger(value: unknown) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export async function getTopManga(_req: Request, res: Response) {
  try {
    const manga = await fetchTopManga();
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch top manga" });
  }
}

export async function getFilteredManga(req: Request, res: Response) {
  const genre = parseOptionalPositiveInteger(req.query.genre);
  const year = parseOptionalYear(req.query.year);
  const status = parseOptionalMangaStatus(req.query.status);

  if (genre === null) {
    res.status(400).json({ message: "Invalid manga genre filter" });
    return;
  }

  if (year === null) {
    res.status(400).json({ message: "Invalid manga year filter" });
    return;
  }

  if (status === null) {
    res.status(400).json({ message: "Invalid manga status filter" });
    return;
  }

  try {
    const manga = await fetchFilteredManga({ genre, year, status, limit: 24 });
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch filtered manga" });
  }
}

export async function getMangaById(req: Request, res: Response) {
  const id = parseRequiredPositiveInteger(req.params.id);

  if (id === null) {
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

export async function getMangaRelations(req: Request, res: Response) {
  const id = parseRequiredPositiveInteger(req.params.id);

  if (id === null) {
    res.status(400).json({ message: "Invalid manga id" });
    return;
  }

  try {
    const relations = await fetchTitleRelations("manga", id);
    res.json(relations);
  } catch (error) {
    console.warn("Manga relations unavailable; returning empty relation groups.", error);
    res.json([]);
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
