import { SectionHeader } from "@/components/section-header";
import {
  getSectionTextAlignClass,
  sectionHasHeader,
  SectionSwitcher,
} from "@/components/section-switcher";
import { createSanityDataAttribute } from "@/lib/sanity/preview";
import type { Event, PageSection } from "@/lib/content/types";

export function PageSections({
  sections,
  documentId,
  documentType,
  upcomingEvents = [],
}: {
  sections: PageSection[];
  documentId?: string;
  documentType?: string;
  upcomingEvents?: Event[];
}) {
  return (
    <div className="section-stack">
      {sections.map((section, index) => {
        const key = `${section._type}-${index}`;
        const sectionPath = section._key ? `sections[_key=="${section._key}"]` : `sections[${index}]`;
        const sectionAttr =
          documentId && documentType
            ? createSanityDataAttribute({
                id: documentId,
                type: documentType,
                path: [sectionPath],
              })
            : undefined;
        const textAlignClass = getSectionTextAlignClass(section.textAlign);
        const hasHeader = sectionHasHeader(section);

        return (
          <section
            key={key}
            className={`section page-section ${
              section._type === "galleryBlock" ? "gallery-section" : ""
            }`.trim()}
            data-sanity={sectionAttr}
          >
            {hasHeader ? (
              <SectionHeader
                eyebrow={section.eyebrow}
                title={section.title}
                alignClassName={textAlignClass}
              />
            ) : null}
            <SectionSwitcher section={section} upcomingEvents={upcomingEvents} />
          </section>
        );
      })}
    </div>
  );
}
