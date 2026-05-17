import { Router } from "express";
import { getFilteredManga, getMangaById, getTopManga, searchMangaTitles } from "../controllers/mangaController";

export const mangaRouter = Router();

mangaRouter.get("/top", getTopManga);
mangaRouter.get("/filter", getFilteredManga);
mangaRouter.get("/search", searchMangaTitles);
mangaRouter.get("/:id", getMangaById);
