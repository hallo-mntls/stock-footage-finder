import type { VideoAsset } from "@/types";

function normalizePexels(v: any): VideoAsset {
  const hd = v.video_files?.find((f: any) => f.quality === "hd");
  const sd = v.video_files?.find((f: any) => f.quality === "sd");
  const file = hd || sd || v.video_files?.[0];
  return {
    id: `pexels_${v.id}`,
    source: "pexels",
    title: v.url?.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || `Pexels Video ${v.id}`,
    thumbnail: v.image,
    videoUrl: file?.link || null,
    previewUrl: sd?.link || file?.link || null,
    pageUrl: v.url,
    duration: v.duration,
    width: v.width,
    height: v.height,
    user: v.user?.name || "",
    downloadable: true,
  };
}

function normalizePixabay(v: any): VideoAsset {
  const large = v.videos?.large;
  const medium = v.videos?.medium;
  return {
    id: `pixabay_${v.id}`,
    source: "pixabay",
    title: v.tags?.split(",")[0]?.trim() || `Pixabay Video ${v.id}`,
    thumbnail: large?.thumbnail || medium?.thumbnail || "",
    videoUrl: large?.url || medium?.url || null,
    previewUrl: medium?.url || null,
    pageUrl: v.pageURL,
    duration: v.duration,
    width: large?.width || 0,
    height: large?.height || 0,
    user: v.user || "",
    downloadable: true,
  };
}

function normalizeYouTube(item: any): VideoAsset {
  const videoId = item.id?.videoId;
  return {
    id: `youtube_${videoId}`,
    source: "youtube",
    title: item.snippet?.title || "",
    thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
    videoUrl: null,
    previewUrl: null,
    pageUrl: `https://www.youtube.com/watch?v=${videoId}`,
    duration: null,
    width: null,
    height: null,
    user: item.snippet?.channelTitle || "",
    downloadable: false,
  };
}

function normalizeCoverr(v: any): VideoAsset {
  return {
    id: `coverr_${v.id}`,
    source: "coverr",
    title: v.title || `Coverr ${v.id}`,
    thumbnail: v.poster || v.thumbnail || "",
    videoUrl: v.urls?.mp4_download || v.urls?.mp4 || null,
    previewUrl: v.urls?.mp4_preview || null,
    pageUrl: `https://coverr.co/videos/${v.id}`,
    duration: v.duration ? Math.round(v.duration) : null,
    width: v.max_width || 0,
    height: v.max_height || 0,
    user: "",
    downloadable: !!(v.urls?.mp4_download || v.urls?.mp4),
  };
}

function parseArchiveRuntime(runtime: unknown): number | null {
  if (!runtime) return null;
  const str = String(runtime).trim();
  const parts = str.split(":").map((p) => parseFloat(p));
  if (parts.some((p) => isNaN(p))) return null;
  if (parts.length === 3) return Math.round(parts[0] * 3600 + parts[1] * 60 + parts[2]);
  if (parts.length === 2) return Math.round(parts[0] * 60 + parts[1]);
  return Math.round(parts[0]);
}

async function fetchArchiveVideoFile(identifier: string): Promise<{ videoUrl: string | null; width: number | null; height: number | null }> {
  try {
    const res = await fetch(`https://archive.org/metadata/${identifier}`, { next: { revalidate: 300 } });
    if (!res.ok) return { videoUrl: null, width: null, height: null };
    const data = await res.json();
    const files: any[] = data.files || [];
    const mp4 = files.find((f) => f.format === "h.264" || f.format === "MPEG4")
      || files.find((f) => f.name?.toLowerCase().endsWith(".mp4"));
    if (!mp4) return { videoUrl: null, width: null, height: null };
    return {
      videoUrl: `https://archive.org/download/${identifier}/${encodeURIComponent(mp4.name)}`,
      width: mp4.width ? parseInt(mp4.width, 10) : null,
      height: mp4.height ? parseInt(mp4.height, 10) : null,
    };
  } catch {
    return { videoUrl: null, width: null, height: null };
  }
}

async function searchPexels(query: string, orientation: string): Promise<VideoAsset[]> {
  if (!process.env.PEXELS_API_KEY) return [];
  const params: Record<string, string> = { query, per_page: "20" };
  if (orientation !== "all") params.orientation = orientation;
  const res = await fetch(
    `https://api.pexels.com/videos/search?${new URLSearchParams(params)}`,
    { headers: { Authorization: process.env.PEXELS_API_KEY }, next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.videos || []).map(normalizePexels);
}

async function searchPixabay(query: string, orientation: string): Promise<VideoAsset[]> {
  if (!process.env.PIXABAY_API_KEY) return [];
  const res = await fetch(
    `https://pixabay.com/api/videos/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=20`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  let results = (data.hits || []).map(normalizePixabay);
  if (orientation === "landscape") results = results.filter((v: VideoAsset) => (v.width ?? 0) > (v.height ?? 0));
  if (orientation === "portrait") results = results.filter((v: VideoAsset) => (v.height ?? 0) > (v.width ?? 0));
  return results;
}

async function searchYouTube(query: string): Promise<VideoAsset[]> {
  if (!process.env.YOUTUBE_API_KEY) return [];
  const params = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY,
    q: query,
    part: "snippet",
    type: "video",
    maxResults: "20",
  });
  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map(normalizeYouTube);
}

async function searchCoverr(query: string): Promise<VideoAsset[]> {
  if (!process.env.COVERR_API_KEY) return [];
  const res = await fetch(
    `https://api.coverr.co/videos?query=${encodeURIComponent(query)}&page_size=20&urls=true&api_key=${process.env.COVERR_API_KEY}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.hits || []).map(normalizeCoverr);
}

async function searchArchive(query: string, orientation: string): Promise<VideoAsset[]> {
  const params = new URLSearchParams();
  params.set("q", `${query} AND mediatype:movies`);
  params.set("output", "json");
  params.set("rows", "12");
  params.set("page", "1");
  ["identifier", "title", "creator", "runtime"].forEach((f) => params.append("fl[]", f));

  const res = await fetch(`https://archive.org/advancedsearch.php?${params}`, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  const data = await res.json();
  const docs: any[] = data.response?.docs || [];

  const items = await Promise.all(docs.map(async (doc): Promise<VideoAsset | null> => {
    const { videoUrl, width, height } = await fetchArchiveVideoFile(doc.identifier);
    if (!videoUrl) return null;
    return {
      id: `archive_${doc.identifier}`,
      source: "archive",
      title: doc.title || doc.identifier,
      thumbnail: `https://archive.org/services/img/${doc.identifier}`,
      videoUrl,
      previewUrl: videoUrl,
      pageUrl: `https://archive.org/details/${doc.identifier}`,
      duration: parseArchiveRuntime(doc.runtime),
      width,
      height,
      user: doc.creator || "",
      downloadable: true,
    };
  }));

  let results = items.filter((v): v is VideoAsset => v !== null);
  if (orientation === "landscape") results = results.filter((v) => (v.width ?? 0) > (v.height ?? 0));
  if (orientation === "portrait") results = results.filter((v) => (v.height ?? 0) > (v.width ?? 0));
  return results;
}

export async function searchAll(query: string, orientation = "all") {
  const [pexels, pixabay, youtube, coverr, archive] = await Promise.allSettled([
    searchPexels(query, orientation),
    searchPixabay(query, orientation),
    searchYouTube(query),
    searchCoverr(query),
    searchArchive(query, orientation),
  ]);

  const get = (r: PromiseSettledResult<VideoAsset[]>) =>
    r.status === "fulfilled" ? r.value : [];

  const sources = [get(pexels), get(pixabay), get(youtube), get(coverr), get(archive)];
  const combined: VideoAsset[] = [];
  const maxLen = Math.max(...sources.map((s) => s.length));
  for (let i = 0; i < maxLen; i++) {
    sources.forEach((s) => { if (s[i]) combined.push(s[i]); });
  }

  return {
    results: combined,
    counts: {
      pexels: get(pexels).length,
      pixabay: get(pixabay).length,
      youtube: get(youtube).length,
      coverr: get(coverr).length,
      archive: get(archive).length,
      total: combined.length,
    },
  };
}
