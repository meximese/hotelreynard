import { SanityImageView } from "@/components/sanity-image";
import { BuiLink } from "@/components/ui/actions";
import { BuiText } from "@/components/ui/typography";
import { resolveSanityLinkHref } from "@/lib/content/links";
import type { PageSection } from "@/lib/content/types";

function getSplitFeatureClassName(section: PageSection) {
  return `split-feature ${
    section.layout === "imageRight"
      ? "split-feature--reverse"
      : section.layout === "imageTop" || section.layout === "imageBottom"
        ? "split-feature--stacked"
        : ""
  } ${section.layout === "imageBottom" ? "split-feature--image-bottom" : ""}`.trim();
}

export function ImageTextBlockSection({
  section,
  textAlignClass,
}: {
  section: PageSection;
  textAlignClass: string;
}) {
  const href = resolveSanityLinkHref(section.link);

  return (
    <div className={getSplitFeatureClassName(section)}>
      {section.media ? (
        <SanityImageView
          image={section.media}
          alt={section.title}
          width={1400}
          height={1000}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="split-feature__image"
        />
      ) : null}
      <div className={`section__content split-feature__copy ${textAlignClass}`.trim()}>
        {section.body ? <BuiText>{section.body}</BuiText> : null}
        {href ? (
          <BuiLink className="text-link" href={href}>
            Learn more
          </BuiLink>
        ) : null}
      </div>
    </div>
  );
}
