import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";

interface RichTextSectionProps {
  title?: string;
  value?: PortableTextBlock[];
}

export default function RichTextSection({
  title,
  value = [],
}: RichTextSectionProps) {
  return (
    <section className="rich-text-section">
      {title ? <h2>{title}</h2> : null}
      <div className="rich-text-section__body">
        <PortableText value={value} />
      </div>
    </section>
  );
}
