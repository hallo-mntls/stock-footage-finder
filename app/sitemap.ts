import type { MetadataRoute } from "next";
import { SITE_URL, CATEGORIES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const popularSearches = [
    "ocean waves", "city timelapse", "forest nature", "aerial drone footage",
    "abstract background", "slow motion water", "sunset beach", "rain window",
    "fire flames", "snow winter", "mountains hiking", "traffic cars",
    "clouds time lapse", "night sky stars", "waterfall", "autumn leaves",
    "coffee pour", "people walking street", "drone beach", "northern lights",
    "particles background", "smoke", "underwater", "city night",
    "green screen", "loop background", "fog forest", "river flowing",
    "space galaxy", "fireworks", "rainforest", "desert sand dunes",
  ];

  const searchPages: MetadataRoute.Sitemap = popularSearches.map((q) => ({
    url: `${SITE_URL}/search?q=${encodeURIComponent(q)}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...searchPages];
}
