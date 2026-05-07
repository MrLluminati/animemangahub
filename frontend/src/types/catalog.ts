export type CatalogTitle = {
  malId: number;
  title: string;
  type: "anime" | "manga";
  imageUrl: string | null;
  score: number | null;
  year: number | null;
  status: string | null;
  synopsis: string | null;
  genres?: string[];
  themes?: string[];
  demographics?: string[];
  rating?: string | null;
  source?: string | null;
  episodes?: number | null;
  chapters?: number | null;
  volumes?: number | null;
};
