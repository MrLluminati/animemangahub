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

export function getTrendingAnime() {
  return fetchCatalog("/api/anime/trending");
}

export function getTopManga() {
  return fetchCatalog("/api/manga/top");
}
