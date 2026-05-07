import type { Request, Response } from "express";
import { clearCache, getCacheHealth, getCacheStats } from "../services/cacheService";

export async function getCacheHealthController(_req: Request, res: Response) {
  try {
    const health = await getCacheHealth();
    res.json(health);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Failed to check cache health" });
  }
}

export async function getCacheStatsController(_req: Request, res: Response) {
  try {
    const stats = await getCacheStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cache stats" });
  }
}

export async function clearCacheController(req: Request, res: Response) {
  if (process.env.NODE_ENV === "production") {
    res.status(403).json({ message: "Cache clearing is disabled in production" });
    return;
  }

  try {
    const prefix = typeof req.query.prefix === "string" ? req.query.prefix.trim() : undefined;
    const result = await clearCache(prefix || undefined);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear cache" });
  }
}
