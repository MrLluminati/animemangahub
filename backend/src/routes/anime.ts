import { Router } from "express";
import { getTrendingAnime } from "../controllers/animeController";

export const animeRouter = Router();

animeRouter.get("/trending", getTrendingAnime);
