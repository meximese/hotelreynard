"use client";

import { PortableText } from "@portabletext/react";
import { Accordion } from "@base-ui/react/accordion";
import { SanityImageView } from "@/components/sanity-image";
import { cleanStegaString, createSanityDataAttribute } from "@/lib/sanity/preview";
import type { PageSection } from "@/lib/content/types";

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

export function PageSections({
  sections,
  documentId,
  documentType,
}: {
  sections: PageSection[];
  documentId?: string;
  documentType?: string;
}) {
  return (
    <div className="section-stack">
      <Accordion.Root className="content-accordion" multiple defaultValue={["section-0"]}>
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
          const title =
            section.title ||
            (section._type === "quoteBlock"
              ? "Quote"
              : section._type === "imageTextBlock"
                ? "Story"
                :
            (section._type === "hoursBlock"
              ? "Hours"
              : section._type === "featureListBlock"
                ? "Highlights"
                : "Section"));

          return (
            <Accordion.Item key={key} className="accordion-item" value={value} data-sanity={sectionAttr}>
              <Accordion.Header>
                <Accordion.Trigger className="accordion-trigger">
                  <span>
                    {section.eyebrow ? <span className="accordion-kicker">{section.eyebrow}</span> : null}
                    <span className="accordion-title">{title}</span>
                  </span>
                  <PlusIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="accordion-panel">
                <div className="accordion-panel-inner">
                  {section._type === "heroBlock" ? (
                    <div className="section-stack">
                      {section.media ? (
                        <SanityImageView
                          image={section.media}
                          alt={section.title}
                          width={1400}
                          height={900}
                          sizes="100vw"
                          className="feature-image"
                        />
                      ) : null}
                      {section.body ? <p>{section.body}</p> : null}
                    </div>
                  ) : null}

                  {section._type === "galleryBlock" && section.images?.length ? (
                    <div className="image-grid">
                      {section.images.map((image, index) => (
                        <SanityImageView
                          key={`${image.asset?._ref || "image"}-${index}`}
                          image={image}
                          alt={image.alt || `${title} image ${index + 1}`}
                          width={900}
                          height={700}
                          sizes="(max-width: 900px) 100vw, 50vw"
                          className="gallery-image"
                        />
                      ))}
                    </div>
                  ) : null}

                  {section._type === "imageTextBlock" ? (
                    <div
                      className={`split-feature ${
                        section.layout === "imageRight" ? "split-feature--reverse" : ""
                      }`}
                    >
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
                      <div className="split-feature__copy">
                        {section.body ? <p>{section.body}</p> : null}
                        {section.primaryCta ? (
                          <a className="text-link" href={cleanStegaString(section.primaryCta.href)}>
                            {section.primaryCta.label}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {section._type === "featureListBlock" && section.items?.length ? (
                    <ul className="tag-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section._type === "hoursBlock" && section.entries?.length ? (
                    <ul className="hours-list">
                      {section.entries.map((entry) => (
                        <li key={`${entry.label}-${entry.hours}`}>
                          <strong>{entry.label}</strong>
                          <span>{entry.hours}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section._type === "richTextBlock" ? (
                    <div className="rich-body">
                      <PortableText value={section.content || []} />
                    </div>
                  ) : null}

                  {section._type === "quoteBlock" && section.quote ? (
                    <figure className="quote-block">
                      <blockquote>{section.quote}</blockquote>
                      {section.attribution ? <figcaption>{section.attribution}</figcaption> : null}
                    </figure>
                  ) : null}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
