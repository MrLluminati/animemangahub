type JikanTitleKind = "anime" | "manga";

type JikanImageSet = {
  jpg?: { image_url?: string; large_image_url?: string };
  webp?: { image_url?: string; large_image_url?: string };
};

type JikanTitle = {
  mal_id: number;
  title?: string;
  title_english?: string | null;
  images?: JikanImageSet;
  score?: number | null;
  year?: number | null;
  status?: string | null;
  synopsis?: string | null;
};

type JikanResponse = {
  data: JikanTitle[];
};

const JIKAN_BASE_URL = process.env.JIKAN_API_BASE ?? "https://api.jikan.moe/v4";
const RATE_LIMIT_MS = 350;

let lastRequestAt = 0;

async function waitForRateLimit() {
  const now = Date.now();
  const elapsed = now - lastRequestAt;
  const waitMs = Math.max(0, RATE_LIMIT_MS - elapsed);

  if (waitMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  lastRequestAt = Date.now();
}

export async function jikanFetch(path: string): Promise<JikanResponse> {
  await waitForRateLimit();

  const response = await fetch(`${JIKAN_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Jikan request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<JikanResponse>;
}

export function mapJikanTitle(item: JikanTitle, type: JikanTitleKind) {
  return {
    malId: item.mal_id,
    title: item.title_english || item.title || "Untitled",
    type,
    imageUrl: item.images?.webp?.large_image_url || item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || null,
    score: item.score ?? null,
    year: item.year ?? null,
    status: item.status ?? null,
    synopsis: item.synopsis ?? null
  };
}
