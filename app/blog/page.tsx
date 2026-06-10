import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { SITE_NAME, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Free Stock Footage Guides & Tips | ${SITE_NAME}`,
  description:
    "Guides on finding free stock footage, B-roll and drone clips for YouTube and your projects. Learn where to download royalty-free video for free.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ])}
      />
      <h1 className="text-3xl font-bold text-white mb-2">Free Stock Footage Guides</h1>
      <p className="text-gray-400 mb-10">
        Tips and guides on finding free, royalty-free video clips for YouTube, social media and
        commercial projects.
      </p>

      <div className="space-y-6">
        {POSTS.map((post) => (
          <article
            key={post.slug}
            className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-violet-500/40 transition-colors"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-bold text-white hover:text-violet-300 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-400 mt-3 leading-7">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-3 text-violet-400 hover:underline text-sm font-semibold"
            >
              Read guide →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
