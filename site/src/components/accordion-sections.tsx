"use client";

import { Accordion } from "@base-ui/react/accordion";
import { SectionSwitcher } from "@/components/section-switcher";
import { createSanityDataAttribute } from "@/lib/sanity/preview";
import type { Event, PageSection } from "@/lib/content/types";

function PlusIcon() {
  return (
    <svg
      className="accordion-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 8h13M8 14.5v-13" />
    </svg>
  );
}

export function AccordionSections({
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
  const defaultOpenSections = sections.reduce<string[]>((values, section, index) => {
    if (index === 0 || section._type === "inquiryBlock") {
      values.push(`section-${index}`);
    }

    return values;
  }, []);

  return (
    <div className="section-stack">
      <Accordion.Root className="content-accordion" multiple defaultValue={defaultOpenSections}>
        {sections.map((section, index) => {
          const key = `${section._type}-${index}`;
          const value = `section-${index}`;
          const sectionPath = section._key ? `sections[_key=="${section._key}"]` : `sections[${index}]`;
          const sectionAttr =
            documentId && documentType
              ? createSanityDataAttribute({
                  id: documentId,
                  type: documentType,
                  path: [sectionPath],
                })
              : undefined;
          return (
            <Accordion.Item key={key} className="accordion-item" value={value} data-sanity={sectionAttr}>
              <Accordion.Header>
                <Accordion.Trigger className="accordion-trigger">
                  <span>
                    {section.eyebrow ? (
                      <span className="section__eyebrow accordion-kicker">{section.eyebrow}</span>
                    ) : null}
                    {section.title ? (
                      <span className="section__title accordion-title">{section.title}</span>
                    ) : null}
                  </span>
                  <PlusIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="accordion-panel">
                <div className="accordion-panel-inner">
                  <SectionSwitcher section={section} upcomingEvents={upcomingEvents} />
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
