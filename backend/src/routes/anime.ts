import { Router } from "express";
import { getAnimeById, getFilteredAnime, getTrendingAnime, searchAnimeTitles } from "../controllers/animeController";

export const animeRouter = Router();

animeRouter.get("/trending", getTrendingAnime);
animeRouter.get("/filter", getFilteredAnime);
animeRouter.get("/search", searchAnimeTitles);
animeRouter.get("/:id", getAnimeById);
