// Renders a JSON-LD structured-data block for search engines (rich results).
// Server component — outputs a plain <script type="application/ld+json"> tag.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
