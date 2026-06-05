const AFFILIATES = [
  {
    name: "Adobe Stock",
    description: "Millions of premium video clips",
    url: "https://stock.adobe.com/",
    badge: "Up to 10 free assets",
    color: "from-red-900/40 to-red-800/20",
  },
  {
    name: "iStock by Getty",
    description: "Professional stock footage",
    url: "https://www.istockphoto.com/",
    badge: "Premium quality",
    color: "from-blue-900/40 to-blue-800/20",
  },
  {
    name: "Envato Elements",
    description: "Unlimited video downloads",
    url: "https://elements.envato.com/",
    badge: "Unlimited plan",
    color: "from-green-900/40 to-green-800/20",
  },
  {
    name: "Storyblocks",
    description: "Royalty-free video library",
    url: "https://www.storyblocks.com/",
    badge: "Subscribe & save",
    color: "from-purple-900/40 to-purple-800/20",
  },
];

export default function AffiliateSection({ query }: { query?: string }) {
  return (
    <section className="mt-12 border-t border-white/10 pt-8">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Need more? Try premium sources
        {query && <span className="ml-1 font-normal text-gray-500">for &ldquo;{query}&rdquo;</span>}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AFFILIATES.map((a) => (
          <a
            key={a.name}
            href={a.url}
            target="_blank"
            rel="noopener sponsored"
            className={`group bg-gradient-to-br ${a.color} border border-white/10 rounded-lg p-4 hover:border-white/25 transition-all`}
          >
            <div className="text-xs bg-white/10 text-white/70 rounded px-2 py-0.5 inline-block mb-2">
              {a.badge}
            </div>
            <div className="font-semibold text-sm text-white group-hover:text-white/90">
              {a.name}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{a.description}</div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-3">* Affiliate links — we may earn a commission at no cost to you.</p>
    </section>
  );
}
