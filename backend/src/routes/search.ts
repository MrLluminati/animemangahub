import { Router } from "express";
import { searchCatalog } from "../controllers/searchController";

export const searchRouter = Router();

searchRouter.get("/", searchCatalog);
