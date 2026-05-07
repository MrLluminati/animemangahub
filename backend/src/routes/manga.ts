import { Router } from "express";
import { getTopManga } from "../controllers/mangaController";

export const mangaRouter = Router();

mangaRouter.get("/top", getTopManga);
