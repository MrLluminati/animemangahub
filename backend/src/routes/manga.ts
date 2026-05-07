import { Router } from "express";
import { getMangaById, getTopManga, searchMangaTitles } from "../controllers/mangaController";

export const mangaRouter = Router();

mangaRouter.get("/top", getTopManga);
mangaRouter.get("/search", searchMangaTitles);
mangaRouter.get("/:id", getMangaById);
