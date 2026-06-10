import Link from "next/link";
import type { ReactNode } from "react";

// ─── Small styled building blocks for article bodies ───────────────────
function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>;
}
function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="text-gray-300 leading-7 mb-4">{children}</p>;
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc list-inside text-gray-300 leading-7 mb-4 space-y-1">{children}</ul>;
}
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-violet-400 hover:underline">
      {children}
    </Link>
  );
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  keywords: string[];
  excerpt: string;
  Body: () => ReactNode;
}

export const POSTS: BlogPost[] = [
  {
    slug: "best-free-stock-footage-sites",
    title: "Best Free Stock Footage Sites in 2026",
    description:
      "The 7 best sites to download free stock footage in 2026 — Pexels, Pixabay, Coverr, Archive.org and more. Royalty-free video clips, no watermark, no signup.",
    date: "2026-06-10",
    keywords: [
      "free stock footage sites", "best free stock video", "royalty free footage",
      "pexels alternative", "free video clips download",
    ],
    excerpt:
      "A no-nonsense rundown of the best places to download truly free, royalty-free stock footage in 2026 — and the fastest way to search them all at once.",
    Body: () => (
      <>
        <P>
          Finding good <strong className="text-white">free stock footage</strong> usually means
          opening five different tabs and searching each site separately. This guide lists the best
          free stock video sites in 2026, what each is good for, and how to search all of them at
          once with <A href="/">Stock Footage Finder</A>.
        </P>

        <H2>1. Pexels</H2>
        <P>
          Pexels is one of the largest libraries of free, royalty-free video. Every clip is free for
          commercial and personal use, no attribution required. Quality is consistently high, with
          plenty of 4K. Great all-rounder for{" "}
          <A href="/search?q=nature+b-roll">nature B-roll</A> and lifestyle clips.
        </P>

        <H2>2. Pixabay</H2>
        <P>
          Pixabay offers a huge mix of video, images and music under a single free license. Volume
          is the big win here — if a clip exists for free anywhere, it's often on Pixabay. Perfect
          for <A href="/search?q=abstract+background+loop">abstract background loops</A> and filler
          shots.
        </P>

        <H2>3. Coverr</H2>
        <P>
          Coverr specialises in beautiful, modern clips — especially{" "}
          <A href="/search?q=city+timelapse">city timelapses</A> and clean lifestyle footage that
          works well as website hero backgrounds.
        </P>

        <H2>4. Archive.org (Internet Archive)</H2>
        <P>
          The Internet Archive is a goldmine for public-domain and historical footage — vintage
          film, archival reels and creative-commons uploads you won't find anywhere else. Licenses
          vary per item, so always check before commercial use.
        </P>

        <H2>5. YouTube (Creative Commons)</H2>
        <P>
          Plenty of creators publish footage under a Creative Commons license on YouTube. It's great
          for reference and embedding, though downloading depends on each creator's terms.
        </P>

        <H2>The fastest way: search them all at once</H2>
        <P>
          Instead of checking each site one by one, <A href="/">Stock Footage Finder</A> searches
          Pexels, Pixabay, Coverr, Archive.org and YouTube simultaneously and shows the results in a
          single grid. You can filter by source or by orientation, preview clips on hover, and
          collect several into a batch download — no account needed.
        </P>

        <H3>Quick checklist before you use any clip</H3>
        <UL>
          <li>Confirm the license on the original source page.</li>
          <li>Check whether attribution is required.</li>
          <li>For Archive.org items, verify the item is public domain or CC-licensed.</li>
        </UL>

        <P>
          Ready to find a clip? Try a search for{" "}
          <A href="/search?q=aerial+drone+footage">aerial drone footage</A> or browse our{" "}
          <A href="/category/nature">free nature footage</A> collection.
        </P>
      </>
    ),
  },
  {
    slug: "free-b-roll-for-youtube",
    title: "How to Find Free B-Roll for YouTube (2026 Guide)",
    description:
      "How to find free B-roll footage for your YouTube videos in 2026 — where to download it, license tips, and how to search every free source at once.",
    date: "2026-06-10",
    keywords: [
      "free b-roll", "b-roll for youtube", "free youtube footage",
      "no copyright video clips", "free stock video for youtube",
    ],
    excerpt:
      "B-roll makes your YouTube videos look professional. Here's where to get it for free, how licensing works, and the fastest way to find the right clip.",
    Body: () => (
      <>
        <P>
          Good <strong className="text-white">B-roll</strong> is the difference between a flat
          talking-head video and a polished, watchable one. The good news: you don't need a stock
          subscription. Here's how to find free, no-copyright B-roll for YouTube in 2026.
        </P>

        <H2>What counts as "safe" B-roll for YouTube?</H2>
        <P>
          You want footage that is royalty-free and cleared for commercial use, since monetised
          YouTube videos count as commercial. Clips from Pexels and Pixabay are released under free
          licenses that allow exactly this, usually with no attribution required — but always
          double-check the source page.
        </P>

        <H2>Where to download free B-roll</H2>
        <UL>
          <li><A href="/search?q=city+street+b-roll">City and street B-roll</A> — for vlogs and intros.</li>
          <li><A href="/search?q=nature+b-roll">Nature B-roll</A> — calming cutaways and transitions.</li>
          <li><A href="/search?q=technology+computer">Tech and workspace clips</A> — for tutorials and reviews.</li>
          <li><A href="/search?q=people+lifestyle">People and lifestyle</A> — relatable cutaways.</li>
        </UL>

        <H2>Match the format to your video</H2>
        <P>
          For standard YouTube videos you want horizontal (16:9) clips. For Shorts, switch to
          vertical. On any search results page you can use the{" "}
          <strong className="text-white">Format</strong> filter to show only horizontal or vertical
          footage, so you never drop a portrait clip into a landscape timeline by accident.
        </P>

        <H2>Build a batch and download in one go</H2>
        <P>
          When you're cutting a video you usually need several clips at once. With{" "}
          <A href="/">Stock Footage Finder</A> you can save clips to a collection as you browse and
          download them all together — handy when you're gathering ten cutaways for a single edit.
        </P>

        <H3>Pro tips</H3>
        <UL>
          <li>Grab clips slightly longer than you need — easier to trim than to stretch.</li>
          <li>Mix sources so your B-roll doesn't look like everyone else's.</li>
          <li>Keep a downloads folder per project to stay organised.</li>
        </UL>

        <P>
          Start by searching for something specific, like{" "}
          <A href="/search?q=slow+motion+coffee">slow motion coffee</A> or{" "}
          <A href="/search?q=city+night">city at night</A>, and filter by source to find your style.
        </P>
      </>
    ),
  },
  {
    slug: "free-drone-footage",
    title: "Where to Download Free Drone Footage in 2026",
    description:
      "Where to download free aerial and drone stock footage in 2026 — the best sources for 4K flyovers, beaches, mountains and cities, royalty-free and no watermark.",
    date: "2026-06-10",
    keywords: [
      "free drone footage", "free aerial footage", "drone stock video",
      "4k aerial footage free", "no copyright drone footage",
    ],
    excerpt:
      "Aerial shots instantly make a video feel cinematic. Here are the best places to download free drone footage in 4K — and how to find the perfect flyover fast.",
    Body: () => (
      <>
        <P>
          Nothing makes an edit feel cinematic faster than a sweeping{" "}
          <strong className="text-white">aerial drone shot</strong>. You don't need a drone — or a
          budget — to use them. Here's where to find free 4K drone footage in 2026.
        </P>

        <H2>Best sources for free aerial footage</H2>
        <P>
          Pexels and Pixabay both have large, high-quality aerial collections, including 4K
          flyovers of <A href="/search?q=drone+beach">beaches</A>,{" "}
          <A href="/search?q=aerial+mountains">mountains</A> and{" "}
          <A href="/search?q=city+aerial">cities</A>. Coverr adds polished, modern drone clips that
          look great as backgrounds. For unusual or historical aerials, Archive.org is worth a dig.
        </P>

        <H2>What to look for in a drone clip</H2>
        <UL>
          <li><strong className="text-white">Resolution:</strong> prefer 4K so you can crop or zoom without losing quality.</li>
          <li><strong className="text-white">Stability:</strong> smooth, steady motion reads as professional.</li>
          <li><strong className="text-white">Movement:</strong> slow reveals and orbits cut together more easily than fast passes.</li>
        </UL>

        <H2>Find the right flyover in seconds</H2>
        <P>
          Rather than browsing each library separately, search{" "}
          <A href="/category/aerial">free aerial &amp; drone footage</A> on Stock Footage Finder — it
          pulls aerial clips from every free source into one grid. Hover to preview, filter by
          source, and collect your favourites for a single batch download.
        </P>

        <H3>Popular aerial searches</H3>
        <UL>
          <li><A href="/search?q=aerial+drone+footage">Aerial drone footage</A></li>
          <li><A href="/search?q=drone+beach">Drone beach</A></li>
          <li><A href="/search?q=aerial+forest">Aerial forest</A></li>
          <li><A href="/search?q=city+aerial+night">City aerial at night</A></li>
        </UL>

        <P>
          Always confirm the license on the original source before using a clip commercially —
          most free aerial footage on Pexels and Pixabay is cleared for it, but it's worth a quick
          check.
        </P>
      </>
    ),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
