import { NextRequest } from "next/server";

const ALLOWED = [
  "videos.pexels.com",
  "cdn.pixabay.com",
  "cdn.coverr.co",
  "storage.coverr.co",
  "archive.org",
];

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const filename = req.nextUrl.searchParams.get("filename") || "video.mp4";

  if (!url) return new Response("Missing url", { status: 400 });

  let parsed: URL;
  try { parsed = new URL(url); } catch { return new Response("Invalid URL", { status: 400 }); }

  const allowed = ALLOWED.some(d => parsed.hostname === d || parsed.hostname.endsWith("." + d));
  if (!allowed) return new Response("Domain not allowed", { status: 403 });

  const upstream = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const safeFile = filename.replace(/[^a-zA-Z0-9._\-\s]/g, "_");

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "video/mp4",
      "Content-Disposition": `attachment; filename="${safeFile}"`,
      ...(upstream.headers.get("content-length")
        ? { "Content-Length": upstream.headers.get("content-length")! }
        : {}),
    },
  });
}
