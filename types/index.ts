export interface VideoAsset {
  id: string;
  source: "pexels" | "pixabay" | "youtube" | "coverr" | "archive";
  title: string;
  thumbnail: string;
  videoUrl: string | null;
  previewUrl: string | null;
  pageUrl: string;
  duration: number | null;
  width: number | null;
  height: number | null;
  user: string;
  downloadable: boolean;
}

export interface SearchResponse {
  results: VideoAsset[];
  counts: Record<string, number>;
  sourceErrors: Record<string, string>;
  query: string;
  total: number;
}
