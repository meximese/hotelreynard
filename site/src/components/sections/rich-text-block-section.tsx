import { PortableText } from "@portabletext/react";
import {portableTextComponents} from "@/components/portable-text";
import type { PageSection } from "@/lib/content/types";

export function RichTextBlockSection({
  section,
}: {
  section: PageSection;
}) {
  return (
    <div className="rich-body">
      <PortableText components={portableTextComponents} value={section.content || []} />
    </div>
  );
}
