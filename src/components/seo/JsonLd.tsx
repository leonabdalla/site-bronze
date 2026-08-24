/**
 * Renders a schema.org JSON-LD block. The data always comes from our own
 * server-authored objects (never user input), so dangerouslySetInnerHTML is
 * safe here; the "<" escape below is just cheap insurance against a stray
 * "</script>" sequence inside a description string breaking the tag.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
