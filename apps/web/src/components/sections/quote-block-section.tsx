import type { PageSection } from "@/lib/content/types";

export function QuoteBlockSection({
  section,
}: {
  section: PageSection;
}) {
  if (!section.quote) {
    return null;
  }

  return (
    <figure className="quote-block">
      <blockquote>{section.quote}</blockquote>
      {section.attribution ? <figcaption>{section.attribution}</figcaption> : null}
    </figure>
  );
}
