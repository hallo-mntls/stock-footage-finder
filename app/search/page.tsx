import { Suspense } from "react";
import type { Metadata } from "next";
import { searchAll } from "@/lib/search";
import { SITE_NAME, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import SearchBar from "@/components/SearchBar";
import VideoCard from "@/components/VideoCard";
import JsonLd from "@/components/JsonLd";

const SOURCES = ["all", "pexels", "pixabay", "youtube", "coverr", "archive"] as const;

const SOURCE_LABELS: Record<string, string> = {
  all: "All Sources",
  pexels: "Pexels",
  pixabay: "Pixabay",
  youtube: "YouTube",
  coverr: "Coverr",
  archive: "Archive.org",
};

interface Props {
  searchParams: Promise<{ q?: string; orientation?: string; source?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = "" } = await searchParams;
  if (!q) {
    return {
      title: "Search Free Stock Footage",
      description:
        "Search free, royalty-free stock footage from Pexels, Pixabay, YouTube, Coverr and Archive.org all at once.",
    };
  }
  const query = q.trim();
  const title = `${query} — Free Stock Footage & Royalty-Free Video Clips | ${SITE_NAME}`;
  const description = `Download free "${query}" stock footage from Pexels, Pixabay, YouTube, Coverr and Archive.org. Royalty-free HD & 4K video clips, no watermark, no signup.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/search?q=${encodeURIComponent(query)}` },
    openGraph: { title, description },
  };
}

async function Results({ query, orientation, source }: { query: string; orientation: string; source: string }) {
  const { results, counts } = await searchAll(query, orientation);

  const filtered = source === "all" ? results : results.filter((r) => r.source === source);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No results found for &ldquo;{query}&rdquo;</p>
        <p className="text-sm mt-2">Try different keywords or another source</p>
      </div>
    );
  }

  const isPortrait = (a: (typeof filtered)[number]) =>
    a.height != null && a.width != null && a.height > a.width;
  const portraitCount = filtered.filter(isPortrait).length;
  const mixed = portraitCount > 0 && portraitCount < filtered.length;

  const isPortraitFilter = orientation === "portrait";
  const gridCols = isPortraitFilter
    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      {/* Result count */}
      <p className="text-sm text-gray-400 mb-6">
        <strong className="text-white">{filtered.length} free stock video clips</strong> for &ldquo;{query}&rdquo;
        {source !== "all" && <span> from {SOURCE_LABELS[source]}</span>}
        {" — "}
        {(["pexels", "pixabay", "youtube", "coverr", "archive"] as const)
          .filter((s) => counts[s])
          .map((s) => `${counts[s]} ${s}`)
          .join(", ")}
      </p>

      {mixed ? (
        // Masonry layout — packs mixed portrait/landscape heights without gaps
        <div className="columns-2 md:columns-3 xl:columns-4 gap-4">
          {filtered.map((asset) => (
            <div key={asset.id} className="mb-4 break-inside-avoid">
              <VideoCard asset={asset} />
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid ${gridCols} gap-4`}>
          {filtered.map((asset) => (
            <VideoCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", orientation = "all", source = "all" } = await searchParams;

  const filterLinkBase = (extra: Record<string, string>) => {
    const params = new URLSearchParams({ q, orientation, source, ...extra });
    return `/search?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {q && (
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: `"${q}" Stock Footage`, url: `${SITE_URL}/search?q=${encodeURIComponent(q)}` },
          ])}
        />
      )}
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar defaultValue={q} />
      </div>

      {q && (
        <div className="flex flex-col gap-3 mb-6">
          {/* Format filter */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-sm text-gray-500 w-14 shrink-0">Format:</span>
            {["all", "landscape", "portrait"].map((o) => (
              <a
                key={o}
                href={filterLinkBase({ orientation: o })}
                className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                  (orientation || "all") === o
                    ? "bg-violet-600/20 border-violet-500 text-violet-300"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {o === "all" ? "All" : o === "landscape" ? "⬛ Horizontal" : "▮ Vertical"}
              </a>
            ))}
          </div>

          {/* Source filter */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-sm text-gray-500 w-14 shrink-0">Source:</span>
            {SOURCES.map((s) => (
              <a
                key={s}
                href={filterLinkBase({ source: s })}
                className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                  (source || "all") === s
                    ? "bg-violet-600/20 border-violet-500 text-violet-300"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                }`}
              >
                {SOURCE_LABELS[s]}
              </a>
            ))}
          </div>
        </div>
      )}

      {q ? (
        <Suspense
          fallback={
            <div className="flex items-center gap-3 py-12 text-gray-400">
              <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              Searching across all sources…
            </div>
          }
        >
          <Results query={q} orientation={orientation} source={source} />
        </Suspense>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Enter a search term to find free stock footage
        </div>
      )}
    </div>
  );
}
