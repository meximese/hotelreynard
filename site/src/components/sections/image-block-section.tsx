import { SanityImageView } from "@/components/sanity-image";
import { BuiText } from "@/components/ui/typography";
import type { PageSection } from "@/lib/content/types";

export function ImageBlockSection({
  section,
}: {
  section: PageSection;
}) {
  return (
    <>
      {section.media ? (
        <SanityImageView
          image={section.media}
          alt={section.media.alt || section.title}
          width={1400}
          height={1000}
          sizes="100vw"
          className="feature-image"
        />
      ) : null}
      {section.body ? <BuiText>{section.body}</BuiText> : null}
    </>
  );
}
