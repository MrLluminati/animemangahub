import type { CacheHealth, CacheStats } from "@/types/cache";
import type { CatalogTitle } from "@/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type CatalogFilterParams = {
  genre?: string;
  year?: string;
  status?: string;
};

export type SearchSort = "relevance" | "score" | "popularity" | "year";

function appendCatalogFilters(path: string, filters: CatalogFilterParams) {
  const searchParams = new URLSearchParams();

  if (filters.genre) {
    searchParams.set("genre", filters.genre);
  }

  if (filters.year) {
    searchParams.set("year", filters.year);
  }

  if (filters.status) {
    searchParams.set("status", filters.status);
  }

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

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

async function fetchLiveCatalog(path: string): Promise<CatalogTitle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store"
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

export function getFilteredAnime(filters: CatalogFilterParams) {
  return fetchCatalog(appendCatalogFilters("/api/anime/filter", filters));
}

export function getTopManga() {
  return fetchCatalog("/api/manga/top");
}

export function getFilteredManga(filters: CatalogFilterParams) {
  return fetchCatalog(appendCatalogFilters("/api/manga/filter", filters));
}

export function getAnimeById(id: string | number) {
  return fetchTitle(`/api/anime/${id}`);
}

export function getMangaById(id: string | number) {
  return fetchTitle(`/api/manga/${id}`);
}

export function searchCatalog(query: string, sort: SearchSort = "relevance") {
  const searchParams = new URLSearchParams({ q: query, sort });
  return fetchLiveCatalog(`/api/search?${searchParams.toString()}`);
}

export function getSearchSuggestions(query: string) {
  const searchParams = new URLSearchParams({ q: query });
  return fetchLiveCatalog(`/api/search/suggestions?${searchParams.toString()}`);
}

export function getCacheHealth() {
  return fetchDebugJson<CacheHealth>("/api/cache/health");
}

export function getCacheStats() {
  return fetchDebugJson<CacheStats>("/api/cache/stats");
}
