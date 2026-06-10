import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { searchAll } from "@/lib/search";
import { CATEGORIES, buildCategoryMeta, SITE_NAME, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import VideoCard from "@/components/VideoCard";
import SearchBar from "@/components/SearchBar";
import JsonLd from "@/components/JsonLd";

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

  const portraitCount = results.filter(
    (a) => a.height != null && a.width != null && a.height > a.width
  ).length;
  const mixed = portraitCount > 0 && portraitCount < results.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: `${cat.label} Stock Footage`, url: `${SITE_URL}/category/${cat.slug}` },
        ])}
      />
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

      {/* Results */}
      {mixed ? (
        <div className="columns-2 md:columns-3 xl:columns-4 gap-4 mb-8">
          {results.map((asset) => (
            <div key={asset.id} className="mb-4 break-inside-avoid">
              <VideoCard asset={asset} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {results.map((asset) => (
            <VideoCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      {/* SEO copy */}
      <section className="bg-white/3 border border-white/8 rounded-2xl p-8 mb-8">
        <h2 className="text-lg font-bold mb-3">
          Download Free {cat.label} Footage for Any Project
        </h2>
        <p className="text-gray-400 text-sm leading-7">
          Browse hand-picked free {cat.label.toLowerCase()} stock footage gathered from Pexels,
          Pixabay, Coverr, YouTube and Archive.org — all in one place. Every clip is royalty-free
          and ready to download in HD or 4K, with no watermark and no signup. Use {SITE_NAME} to
          find the perfect {cat.label.toLowerCase()} B-roll for your YouTube videos, social media
          reels, films and commercial projects in seconds.
        </p>
      </section>

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
    </div>
  );
}
