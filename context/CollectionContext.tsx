"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { VideoAsset } from "@/types";

export type CollectedItem = Pick<
  VideoAsset,
  "id" | "source" | "title" | "thumbnail" | "videoUrl" | "downloadable" | "pageUrl"
>;

interface CollectionCtx {
  items: CollectedItem[];
  add: (item: CollectedItem) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const Ctx = createContext<CollectionCtx | null>(null);
const LS_KEY = "sff-collection";

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CollectedItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  function save(next: CollectedItem[]) {
    setItems(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}
  }

  return (
    <Ctx.Provider value={{
      items,
      add:    (item) => save([...items.filter(i => i.id !== item.id), item]),
      remove: (id)   => save(items.filter(i => i.id !== id)),
      has:    (id)   => items.some(i => i.id === id),
      clear:  ()     => save([]),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCollection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCollection must be inside CollectionProvider");
  return ctx;
}
