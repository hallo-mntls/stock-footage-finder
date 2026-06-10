import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { CollectionProvider } from "@/context/CollectionContext";
import CollectionDrawer from "@/components/CollectionDrawer";
import { ConsentProvider } from "@/context/ConsentContext";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AnalyticsScripts from "@/components/AnalyticsScripts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Search Free Stock Footage from Pexels, Pixabay & More`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "free stock footage", "free stock video", "royalty free video clips",
    "free b-roll footage", "free video clips download", "pexels videos",
    "pixabay videos", "free footage for youtube", "stock footage finder",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0a0a0f] text-white min-h-screen flex flex-col">
      <ConsentProvider>
      <CollectionProvider>
        <AnalyticsScripts adsenseId={adsenseId} gaId={gaId} />
        {/* Header */}
        <header className="border-b border-white/5 bg-[#0a0a0f]/95 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
              <span>Stock Footage Finder</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
              <Link href="/category/nature" className="hover:text-white transition-colors">Nature</Link>
              <Link href="/category/city" className="hover:text-white transition-colors">City</Link>
              <Link href="/category/aerial" className="hover:text-white transition-colors">Aerial</Link>
              <Link href="/category/abstract" className="hover:text-white transition-colors">Abstract</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-4">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/search?q=nature" className="hover:text-gray-300">Nature Footage</Link>
              <Link href="/search?q=city+timelapse" className="hover:text-gray-300">City Timelapse</Link>
              <Link href="/search?q=aerial+drone" className="hover:text-gray-300">Aerial Drone</Link>
              <Link href="/search?q=abstract+background" className="hover:text-gray-300">Abstract Backgrounds</Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-4">
              <Link href="/impressum" className="hover:text-gray-300">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-gray-300">Datenschutz</Link>
            </div>
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} Stock Footage Finder · Free royalty-free video search engine ·{" "}
              Videos sourced from Pexels, Pixabay, YouTube, Coverr, and Archive.org.
            </p>
          </div>
        </footer>
        <CollectionDrawer />
        <CookieConsentBanner />
      </CollectionProvider>
      </ConsentProvider>
      </body>
    </html>
  );
}
