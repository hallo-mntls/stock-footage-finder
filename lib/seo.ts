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

// ─── Structured data (JSON-LD) builders ────────────────────────────────

/** Organization schema — establishes the brand entity for Google. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
  };
}

/** WebSite schema with a SearchAction — enables the Google sitelinks search box. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Free Stock Footage Search Engine",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** FAQPage content — keyword-rich Q&A eligible for FAQ rich results. */
export const HOME_FAQ: { q: string; a: string }[] = [
  {
    q: "Is the stock footage really free to download?",
    a: "Yes. Stock Footage Finder only surfaces free, royalty-free video clips from sources like Pexels, Pixabay, Coverr and Archive.org. There are no subscriptions, no watermarks and no signup required to download.",
  },
  {
    q: "Can I use these video clips commercially?",
    a: "In most cases yes. Pexels and Pixabay clips are released under their free licenses that allow commercial use without attribution. Always double-check the licence on the original source page before using a clip in a commercial project.",
  },
  {
    q: "Where does the footage come from?",
    a: "We search multiple free stock video libraries at once — Pexels, Pixabay, YouTube, Coverr and Archive.org — and combine the results into a single grid so you don't have to search each site separately.",
  },
  {
    q: "Is Stock Footage Finder a free alternative to Pexels and Pixabay?",
    a: "Stock Footage Finder is a meta-search engine that searches Pexels, Pixabay and other free libraries simultaneously, so you find more free stock footage faster than searching any single site on its own.",
  },
  {
    q: "Do I need an account to download clips?",
    a: "No account is needed. You can search, preview and download free stock footage instantly, and collect multiple clips for a batch download — all without registering.",
  },
];

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** BreadcrumbList schema for a sub-page. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
