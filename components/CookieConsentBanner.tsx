"use client";
import Link from "next/link";
import { useConsent } from "@/context/ConsentContext";

export default function CookieConsentBanner() {
  const { consent, accept, reject } = useConsent();

  if (consent !== "unset") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] bg-[#13131f] border-t border-white/10 p-4 shadow-2xl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-gray-400 flex-1">
          Wir verwenden Cookies für Statistiken (Google Analytics) und Affiliate-Tracking (Impact.com).
          Diese werden nur mit deiner Zustimmung geladen. Mehr dazu in unserer{" "}
          <Link href="/datenschutz" className="text-violet-400 hover:underline">Datenschutzerklärung</Link>.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={reject}
            className="text-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
          >
            Nur notwendige
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
