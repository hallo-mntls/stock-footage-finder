export const SITE_NAME = "Stock Footage Finder";
export const SITE_URL = "https://stock-footage-finder.com";
export const SITE_DESCRIPTION =
  "Find free stock footage from Pexels, Pixabay, YouTube, Coverr and more — search all sources at once. Download royalty-free video clips for YouTube, Instagram, films and commercial projects.";

export const CATEGORIES = [
  { slug: "nature", label: "Nature & Wildlife", keywords: "nature wildlife forest ocean" },
  { slug: "city", label: "City & Urban", keywords: "city urban street timelapse" },
  { slug: "aerial", label: "Aerial & Drone", keywords: "aerial drone flyover" },
  { slug: "people", label: "People & Lifestyle", keywords: "people lifestyle walking" },
  { slug: "business", label: "Business & Office", keywords: "business office meeting" },
  { slug: "technology", label: "Technology", keywords: "technology computer digital" },
  { slug: "food", label: "Food & Cooking", keywords: "food cooking kitchen" },
  { slug: "travel", label: "Travel & Adventure", keywords: "travel adventure vacation" },
  { slug: "abstract", label: "Abstract & Motion", keywords: "abstract motion background loop" },
  { slug: "space", label: "Space & Science", keywords: "space science galaxy cosmos" },
  { slug: "architecture", label: "Architecture", keywords: "architecture building interior" },
  { slug: "sports", label: "Sports & Action", keywords: "sports action fitness running" },
];

export function buildSearchMeta(query: string, total: number) {
  const q = query.trim();
  return {
    title: `"${q}" Free Stock Footage — ${total} Free Video Clips | ${SITE_NAME}`,
    description: `Search results for "${q}" — ${total} free royalty-free video clips from Pexels, Pixabay, YouTube, and Coverr. Download instantly, no watermark.`,
    canonical: `${SITE_URL}/search?q=${encodeURIComponent(q)}`,
  };
}

export function buildCategoryMeta(slug: string, label: string) {
  return {
    title: `Free ${label} Stock Footage — Download Royalty-Free Video Clips | ${SITE_NAME}`,
    description: `Browse and download free ${label.toLowerCase()} stock footage. Royalty-free video clips from Pexels, Pixabay and more. Perfect for YouTube, social media and commercial use.`,
    canonical: `${SITE_URL}/category/${slug}`,
  };
}
