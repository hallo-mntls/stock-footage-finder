"use client";
import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (publisherId && typeof window !== "undefined") {
      try { (window as any).adsbygoogle?.push({}); } catch {}
    }
  }, [publisherId]);

  if (!publisherId) {
    // Placeholder shown in development
    return (
      <div className={`bg-gray-800 border border-dashed border-gray-600 rounded flex items-center justify-center text-gray-500 text-xs ${className}`}>
        Ad Slot · {slot}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
