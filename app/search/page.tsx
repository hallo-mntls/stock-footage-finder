import { Suspense } from "react";
import type { Metadata } from "next";
import { searchAll } from "@/lib/search";
import { buildSearchMeta } from "@/lib/seo";
import SearchBar from "@/components/SearchBar";
import VideoCard from "@/components/VideoCard";
import AdBanner from "@/components/AdBanner";
import AffiliateSection from "@/components/AffiliateSection";

interface Props {
  searchParams: Promise<{ q?: string; orientation?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = "" } = await searchParams;
  if (!q) return { title: "Search Free Stock Footage" };
  const meta = buildSearchMeta(q, 0);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: { title: meta.title, description: meta.description },
  };
}

async function Results({ query, orientation }: { query: string; orientation: string }) {
  const { results, counts } = await searchAll(query, orientation);

  if (results.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No results found for &ldquo;{query}&rdquo;</p>
        <p className="text-sm mt-2">Try different keywords</p>
      </div>
    );
  }

  return (
    <>
      {/* Result count — SSR-rendered for SEO */}
      <p className="text-sm text-gray-400 mb-6">
        <strong className="text-white">{counts.total} free stock video clips</strong> for &ldquo;{query}&rdquo; —{" "}
        {(["pexels", "pixabay", "youtube", "coverr"] as const)
          .filter((s) => counts[s])
          .map((s) => `${counts[s]} ${s}`)
          .join(", ")}
      </p>

      {/* Grid with mid-roll ad after row 3 (~12 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.slice(0, 12).map((asset) => (
          <VideoCard key={asset.id} asset={asset} />
        ))}
      </div>

      {/* Mid-page ad */}
      <AdBanner slot="1122334455" format="horizontal" className="h-24 my-8 w-full" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.slice(12).map((asset) => (
          <VideoCard key={asset.id} asset={asset} />
        ))}
      </div>

      <AffiliateSection query={query} />
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", orientation = "all" } = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search bar stays visible */}
      <div className="mb-8">
        <SearchBar defaultValue={q} />
      </div>

      {/* Format filter */}
      {q && (
        <div className="flex gap-2 mb-6 flex-wrap items-center">
          <span className="text-sm text-gray-500">Format:</span>
          {["all", "landscape", "portrait"].map((o) => (
            <a
              key={o}
              href={`/search?q=${encodeURIComponent(q)}&orientation=${o}`}
              className={`text-sm px-3 py-1 rounded-full border transition-colors capitalize ${
                (orientation || "all") === o
                  ? "bg-violet-600/20 border-violet-500 text-violet-300"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {o === "all" ? "All" : o === "landscape" ? "⬛ Horizontal" : "▮ Vertical"}
            </a>
          ))}
        </div>
      )}

      {/* Top ad */}
      <AdBanner slot="5566778899" format="horizontal" className="h-20 mb-8 w-full" />

      {q ? (
        <Suspense
          fallback={
            <div className="flex items-center gap-3 py-12 text-gray-400">
              <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              Searching across all sources…
            </div>
          }
        >
          <Results query={q} orientation={orientation} />
        </Suspense>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Enter a search term to find free stock footage
        </div>
      )}
    </div>
  );
}
