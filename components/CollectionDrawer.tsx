"use client";
import { useState } from "react";
import { useCollection, type CollectedItem } from "@/context/CollectionContext";

function triggerDownload(item: CollectedItem) {
  if (!item.downloadable || !item.videoUrl) return;
  const filename = `${item.source}_${item.id}.mp4`;
  const a = document.createElement("a");
  a.href = `/api/proxy-download?url=${encodeURIComponent(item.videoUrl)}&filename=${encodeURIComponent(filename)}`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function CollectionDrawer() {
  const { items, remove, clear } = useCollection();
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const downloadable = items.filter(i => i.downloadable && i.videoUrl);
  const viewOnly = items.filter(i => !i.downloadable || !i.videoUrl);

  async function downloadAll() {
    if (!downloadable.length) return;
    setDownloading(true);
    for (let i = 0; i < downloadable.length; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 700));
      triggerDownload(downloadable[i]);
    }
    setDownloading(false);
  }

  if (items.length === 0 && !open) return null;

  return (
    <>
      {/* Floating button — hidden while drawer is open */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg shadow-violet-900/50 transition-colors"
          aria-label="Open collection"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>{items.length}</span>
        </button>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-[#13131f] border-l border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="font-semibold text-white">
            My Collection
            <span className="ml-2 text-sm font-normal text-gray-400">{items.length} clip{items.length !== 1 ? "s" : ""}</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-16 text-sm">Your collection is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-white/5 hover:bg-white/8 rounded-lg p-2 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-12 object-cover rounded bg-black flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 truncate leading-snug">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs capitalize text-gray-500">{item.source}</span>
                    {!item.downloadable && (
                      <span className="text-xs text-yellow-500/70">view only</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {item.downloadable && item.videoUrl && (
                    <button
                      onClick={() => triggerDownload(item)}
                      className="text-gray-400 hover:text-violet-400 p-1.5 rounded transition-colors"
                      aria-label="Download"
                      title="Download"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  )}
                  {!item.downloadable && (
                    <a
                      href={item.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-violet-400 p-1.5 rounded transition-colors"
                      title="Open page"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => remove(item.id)}
                    className="text-gray-600 hover:text-red-400 p-1.5 rounded transition-colors"
                    aria-label="Remove from collection"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-white/10 space-y-2">
            {viewOnly.length > 0 && (
              <p className="text-xs text-yellow-500/70 pb-1">
                {viewOnly.length} clip{viewOnly.length !== 1 ? "s" : ""} (YouTube) can&apos;t be downloaded directly — open them individually.
              </p>
            )}
            {downloadable.length > 0 && (
              <button
                onClick={downloadAll}
                disabled={downloading}
                className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 disabled:opacity-60 disabled:cursor-wait text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Downloading…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download all {downloadable.length} clip{downloadable.length !== 1 ? "s" : ""}
                  </>
                )}
              </button>
            )}
            <button
              onClick={clear}
              className="w-full text-sm text-gray-600 hover:text-red-400 py-1.5 transition-colors"
            >
              Clear collection
            </button>
          </div>
        )}
      </div>
    </>
  );
}
