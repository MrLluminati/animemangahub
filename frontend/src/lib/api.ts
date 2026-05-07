import type { CacheHealth, CacheStats } from "@/types/cache";
import type { CatalogTitle } from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchCatalog(path: string): Promise<CatalogTitle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchTitle(path: string): Promise<CatalogTitle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchDebugJson<T>(path: string): Promise<T | null> {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Debug API request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getTrendingAnime() {
  return fetchCatalog("/api/anime/trending");
}

export function getTopManga() {
  return fetchCatalog("/api/manga/top");
}

export function getAnimeById(id: string | number) {
  return fetchTitle(`/api/anime/${id}`);
}

export function getMangaById(id: string | number) {
  return fetchTitle(`/api/manga/${id}`);
}

export function searchCatalog(query: string) {
  const searchParams = new URLSearchParams({ q: query });
  return fetchCatalog(`/api/search?${searchParams.toString()}`);
}

export function getCacheHealth() {
  return fetchDebugJson<CacheHealth>("/api/cache/health");
}

export function getCacheStats() {
  return fetchDebugJson<CacheStats>("/api/cache/stats");
}
