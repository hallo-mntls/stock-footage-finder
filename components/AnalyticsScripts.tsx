"use client";
import Script from "next/script";
import { useConsent } from "@/context/ConsentContext";

export default function AnalyticsScripts({ adsenseId, gaId }: { adsenseId?: string; gaId?: string }) {
  const { consent } = useConsent();

  if (consent !== "all") return null;

  return (
    <>
      {adsenseId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());gtag('config','${gaId}');
          `}</Script>
        </>
      )}
      {/* Impact.com affiliate tracking */}
      <Script id="impact-tracking" strategy="afterInteractive">{`
        (function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7384245-d028-44f3-ba08-fece5445b25d1.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');
      `}</Script>
    </>
  );
}
