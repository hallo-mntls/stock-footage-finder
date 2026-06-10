import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import JsonLd from "@/components/JsonLd";
import {
  CATEGORIES,
  SITE_NAME,
  SITE_URL,
  HOME_FAQ,
  websiteSchema,
  organizationSchema,
  faqSchema,
} from "@/lib/seo";

const POPULAR_SEARCHES = [
  "ocean waves", "city timelapse", "forest nature", "aerial drone",
  "abstract background", "slow motion", "sunset", "rain",
];

export const metadata: Metadata = {
  title: `Free Stock Footage Search — Pexels, Pixabay & More in One Place | ${SITE_NAME}`,
  description:
    "Search free stock footage from Pexels, Pixabay, YouTube, Coverr and Archive.org all at once. Download royalty-free video clips and B-roll instantly — no watermark, no signup.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Free Stock Footage Search Engine`,
    description:
      "Search Pexels, Pixabay, YouTube, Coverr and Archive.org at once. Free royalty-free video clips, no watermark, no signup.",
    url: SITE_URL,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <JsonLd data={[websiteSchema(), organizationSchema(), faqSchema()]} />
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Find Free Stock Footage<br />
          <span className="text-violet-400">From Every Source at Once</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Search Pexels, Pixabay, YouTube, and Coverr simultaneously.
          Download royalty-free video clips instantly — no watermark, no signup.
        </p>

        <SearchBar />

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {POPULAR_SEARCHES.map((s) => (
            <Link
              key={s}
              href={`/search?q=${encodeURIComponent(s)}`}
              className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-gray-400 hover:text-white transition-colors capitalize"
            >
              {s}
            </Link>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { n: "4", label: "Sources searched simultaneously" },
          { n: "Free", label: "No subscription required" },
          { n: "HD/4K", label: "High quality video clips" },
          { n: "Instant", label: "Direct download, no watermark" },
        ].map((s) => (
          <div key={s.label} className="bg-white/3 border border-white/8 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-violet-400 mb-1">{s.n}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Category grid */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white/3 hover:bg-violet-600/20 border border-white/8 hover:border-violet-500/40 rounded-xl p-4 text-center transition-all"
            >
              <div className="text-sm font-semibold text-white/80 group-hover:text-white">
                {cat.label}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO text block */}
      <section className="mb-16 bg-white/3 border border-white/8 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">The Best Free Stock Footage Search Engine</h2>
        <div className="text-gray-400 text-sm leading-7 space-y-3">
          <p>
            <strong className="text-white">Stock Footage Finder</strong> is the fastest way to discover free,
            royalty-free video clips for your projects. Instead of searching Pexels, Pixabay, Coverr,
            and YouTube separately, we search them all at the same time and show you the best results
            in one unified grid.
          </p>
          <p>
            All videos are free for commercial and personal use. Pexels and Pixabay videos are released
            under their respective free licenses. YouTube videos are available to view and embed.
          </p>
          <p>
            Whether you need{" "}
            <Link href="/search?q=nature+b-roll" className="text-violet-400 hover:underline">nature b-roll</Link>,{" "}
            <Link href="/search?q=city+timelapse" className="text-violet-400 hover:underline">city timelapses</Link>,{" "}
            <Link href="/search?q=aerial+drone+footage" className="text-violet-400 hover:underline">aerial drone footage</Link>, or{" "}
            <Link href="/search?q=abstract+background+loop" className="text-violet-400 hover:underline">abstract background loops</Link>,{" "}
            Stock Footage Finder delivers results instantly.
          </p>
        </div>
      </section>

      {/* FAQ — visible content backing the FAQPage structured data */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {HOME_FAQ.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white/3 border border-white/8 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                {q}
                <span className="text-violet-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-gray-400 text-sm leading-7 mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
