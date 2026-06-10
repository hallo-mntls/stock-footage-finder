import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, getPost } from "@/lib/blog";
import { SITE_NAME, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const { Body } = post;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
          ]),
        ]}
      />

      <Link href="/blog" className="text-sm text-violet-400 hover:underline">
        ← All guides
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-3 leading-tight">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <Body />

      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-gray-400">
          Ready to find a clip?{" "}
          <Link href="/" className="text-violet-400 hover:underline font-semibold">
            Search free stock footage now →
          </Link>
        </p>
      </div>
    </article>
  );
}
