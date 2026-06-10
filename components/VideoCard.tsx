"use client";
import { useState, useRef } from "react";
import type { VideoAsset } from "@/types";
import { useCollection } from "@/context/CollectionContext";

const SOURCE_COLORS: Record<string, string> = {
  pexels:  "bg-green-500/20 text-green-400",
  pixabay: "bg-yellow-500/20 text-yellow-400",
  youtube: "bg-red-500/20 text-red-400",
  coverr:  "bg-pink-500/20 text-pink-400",
  archive: "bg-orange-500/20 text-orange-400",
};

function fmt(sec: number | null) {
  if (!sec) return null;
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

export default function VideoCard({ asset }: { asset: VideoAsset }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { add, remove, has } = useCollection();
  const saved = has(asset.id);

  const isPortrait = asset.height != null && asset.width != null && asset.height > asset.width;

  function onMouseEnter() {
    if (!asset.previewUrl) return;
    setPlaying(true);
    setTimeout(() => videoRef.current?.play().catch(() => {}), 50);
  }
  function onMouseLeave() {
    setPlaying(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }

  function handleTap() {
    if (!asset.previewUrl) return;
    if (playing) {
      setPlaying(false);
      if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    } else {
      setPlaying(true);
      setTimeout(() => videoRef.current?.play().catch(() => {}), 50);
    }
  }

  function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!asset.downloadable || !asset.videoUrl) return;
    const filename = `${asset.source}_${asset.id}.mp4`;
    const a = document.createElement("a");
    a.href = `/api/proxy-download?url=${encodeURIComponent(asset.videoUrl)}&filename=${encodeURIComponent(filename)}`;
    a.download = filename;
    a.click();
  }

  function toggleSave(e: React.MouseEvent) {
    e.stopPropagation();
    if (saved) {
      remove(asset.id);
    } else {
      add({
        id: asset.id,
        source: asset.source,
        title: asset.title,
        thumbnail: asset.thumbnail,
        videoUrl: asset.videoUrl,
        downloadable: asset.downloadable,
        pageUrl: asset.pageUrl,
      });
    }
  }

  return (
    <article className="group bg-[#1a1a27] border border-white/5 rounded-xl overflow-hidden hover:border-white/15 hover:-translate-y-0.5 transition-all duration-150">
      {/* Thumbnail */}
      <div
        className={`relative ${isPortrait ? "aspect-[9/16]" : "aspect-video"} bg-[#111] overflow-hidden cursor-pointer`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleTap}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.thumbnail}
          alt={`${asset.title} — free ${asset.source} stock footage`}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-200 ${playing ? "opacity-0" : "opacity-100"}`}
        />
        {asset.previewUrl && (
          <video
            ref={videoRef}
            src={asset.previewUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${playing ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {/* Save / bookmark button */}
        <button
          onClick={toggleSave}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full backdrop-blur-sm transition-all ${
            saved
              ? "bg-violet-500 text-white shadow-lg shadow-violet-900/50"
              : "bg-black/50 text-white/60 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/70 hover:text-white"
          }`}
          aria-label={saved ? "Remove from collection" : "Save to collection"}
        >
          <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        {/* Duration */}
        {fmt(asset.duration) && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {fmt(asset.duration)}
          </span>
        )}

        {/* Actions — always visible on mobile, hover-only on desktop */}
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          {asset.downloadable && (
            <button
              onClick={handleDownload}
              className="flex-1 bg-white/15 hover:bg-white/30 active:bg-white/40 text-white text-xs font-semibold rounded px-2 py-1.5 backdrop-blur-sm transition-colors"
            >
              ↓ Download
            </button>
          )}
          <a
            href={asset.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-white/15 hover:bg-white/30 active:bg-white/40 text-white text-xs font-semibold rounded px-2 py-1.5 backdrop-blur-sm transition-colors text-center"
          >
            ↗ Open
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-white/90 leading-tight line-clamp-2 mb-2">
          {asset.title}
        </p>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${SOURCE_COLORS[asset.source] || "bg-gray-700 text-gray-300"}`}>
            {asset.source}
          </span>
          {asset.user && (
            <span className="text-xs text-gray-500 truncate">{asset.user}</span>
          )}
        </div>
      </div>
    </article>
  );
}
