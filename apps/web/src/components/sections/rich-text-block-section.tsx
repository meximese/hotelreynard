import { PortableText } from "@portabletext/react";
import type { PageSection } from "@/lib/content/types";

export function RichTextBlockSection({
  section,
}: {
  section: PageSection;
}) {
  return (
    <div className="rich-body">
      <PortableText value={section.content || []} />
    </div>
  );
}
