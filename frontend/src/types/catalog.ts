export type CatalogTitle = {
  malId: number;
  title: string;
  type: "anime" | "manga";
  imageUrl: string | null;
  score: number | null;
  year: number | null;
  status: string | null;
  synopsis: string | null;
};
