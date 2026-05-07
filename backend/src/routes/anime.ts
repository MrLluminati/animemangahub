import { Router } from "express";
import { getAnimeById, getTrendingAnime, searchAnimeTitles } from "../controllers/animeController";

export const animeRouter = Router();

animeRouter.get("/trending", getTrendingAnime);
animeRouter.get("/search", searchAnimeTitles);
animeRouter.get("/:id", getAnimeById);
