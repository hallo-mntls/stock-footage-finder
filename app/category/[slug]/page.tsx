import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { searchAll } from "@/lib/search";
import { CATEGORIES, buildCategoryMeta } from "@/lib/seo";
import VideoCard from "@/components/VideoCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
import AffiliateSection from "@/components/AffiliateSection";

// Pre-generate all category pages at build time (SSG) — great for SEO
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  const meta = buildCategoryMeta(cat.slug, cat.label);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const { results, counts } = await searchAll(cat.keywords);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* SEO heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Free {cat.label} Stock Footage
        </h1>
        <p className="text-gray-400">
          {counts.total} free royalty-free {cat.label.toLowerCase()} video clips —
          download instantly from Pexels, Pixabay, Coverr and more.
        </p>
      </div>

      {/* Top ad */}
      <AdBanner slot="6677889900" format="horizontal" className="h-20 mb-8 w-full" />

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {results.slice(0, 12).map((asset) => (
          <VideoCard key={asset.id} asset={asset} />
        ))}
      </div>

      <AdBanner slot="7788990011" format="horizontal" className="h-20 mb-8 w-full" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.slice(12).map((asset) => (
          <VideoCard key={asset.id} asset={asset} />
        ))}
      </div>

      {/* Other categories */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          More categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
            <a
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-gray-400 hover:text-white transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <AffiliateSection query={cat.label} />
    </div>
  );
}
