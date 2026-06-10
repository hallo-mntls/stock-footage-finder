"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ConsentState = "unset" | "all" | "necessary";

interface ConsentCtx {
  consent: ConsentState;
  accept: () => void;
  reject: () => void;
}

const Ctx = createContext<ConsentCtx | null>(null);
const LS_KEY = "sff-cookie-consent";

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("unset");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "all" || saved === "necessary") setConsent(saved);
    } catch {}
  }, []);

  function persist(c: ConsentState) {
    setConsent(c);
    try { localStorage.setItem(LS_KEY, c); } catch {}
  }

  return (
    <Ctx.Provider value={{ consent, accept: () => persist("all"), reject: () => persist("necessary") }}>
      {children}
    </Ctx.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent must be inside ConsentProvider");
  return ctx;
}
