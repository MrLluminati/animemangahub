import { Router } from "express";
import { searchCatalog, searchSuggestions } from "../controllers/searchController";

export const searchRouter = Router();

searchRouter.get("/suggestions", searchSuggestions);
searchRouter.get("/", searchCatalog);
