import { Router } from "express";
import { clearCacheController, getCacheHealthController, getCacheStatsController } from "../controllers/cacheController";

export const cacheRouter = Router();

cacheRouter.get("/health", getCacheHealthController);
cacheRouter.get("/stats", getCacheStatsController);
cacheRouter.delete("/", clearCacheController);
cacheRouter.post("/clear", clearCacheController);
