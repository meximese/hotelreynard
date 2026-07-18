"use client";

import { PortableText } from "@portabletext/react";
import { Accordion } from "@base-ui/react/accordion";
import { EventCard } from "@/components/event-card";
import { PrivateEventsInquiry } from "@/components/private-events-inquiry";
import { RoomCard } from "@/components/room-card";
import { SanityImageView } from "@/components/sanity-image";
import { cleanStegaString, createSanityDataAttribute } from "@/lib/sanity/preview";
import type { Event, PageSection } from "@/lib/content/types";

function getTextAlignClass(textAlign?: PageSection["textAlign"]) {
  return textAlign ? `text-align-${textAlign}` : "";
}

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
          const textAlignClass = getTextAlignClass(section.textAlign);

          return (
            <Accordion.Item key={key} className="accordion-item" value={value} data-sanity={sectionAttr}>
              <Accordion.Header>
                <Accordion.Trigger className="accordion-trigger">
                  <span>
                    {section.eyebrow ? <span className="accordion-kicker">{section.eyebrow}</span> : null}
                    {section.title ? <span className="accordion-title">{section.title}</span> : null}
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
                      {(section.primaryCta || section.secondaryCta) ? (
                        <div className="cta-row">
                          {section.primaryCta ? (
                            <a className="button-link" href={cleanStegaString(section.primaryCta.href)}>
                              {section.primaryCta.label}
                            </a>
                          ) : null}
                          {section.secondaryCta ? (
                            <a
                              className="button-link button-link-secondary"
                              href={cleanStegaString(section.secondaryCta.href)}
                            >
                              {section.secondaryCta.label}
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {section._type === "galleryBlock" && section.images?.length ? (
                    <div className="image-grid">
                      {section.images.map((image, imageIndex) => (
                        <SanityImageView
                          key={`${image.asset?._ref || "image"}-${imageIndex}`}
                          image={image}
                          alt={image.alt || `Gallery image ${imageIndex + 1}`}
                          width={900}
                          height={700}
                          sizes="(max-width: 900px) 100vw, 50vw"
                          className="gallery-image"
                        />
                      ))}
                    </div>
                  ) : null}

                  {section._type === "imageBlock" ? (
                    <div className={`section-stack ${textAlignClass}`.trim()}>
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
                      {section.body ? <p>{section.body}</p> : null}
                    </div>
                  ) : null}

                  {section._type === "imageTextBlock" ? (
                    <div
                      className={`split-feature ${
                        section.layout === "imageRight"
                          ? "split-feature--reverse"
                          : section.layout === "imageTop" || section.layout === "imageBottom"
                            ? "split-feature--stacked"
                            : ""
                      } ${section.layout === "imageBottom" ? "split-feature--image-bottom" : ""}`}
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
                      <div className={`split-feature__copy ${textAlignClass}`.trim()}>
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

                  {section._type === "roomFeedBlock" && section.rooms?.length ? (
                    <div className="section-stack">
                      {section.body ? <p className="lede">{section.body}</p> : null}
                      <div className="card-grid">
                        {section.rooms.map((room) => (
                          <RoomCard key={room._id} room={room} />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {section._type === "eventFeedBlock" && upcomingEvents.length ? (
                    <div className="section-stack">
                      {section.body ? <p className="lede">{section.body}</p> : null}
                      <div className="card-grid">
                        {upcomingEvents.slice(0, section.limit || 3).map((event) => (
                          <EventCard key={event._id} event={event} />
                        ))}
                      </div>
                    </div>
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
                    <div className={`rich-body ${textAlignClass}`.trim()}>
                      <PortableText value={section.content || []} />
                    </div>
                  ) : null}

                  {section._type === "quoteBlock" && section.quote ? (
                    <figure className={`quote-block ${textAlignClass}`.trim()}>
                      <blockquote>{section.quote}</blockquote>
                      {section.attribution ? <figcaption>{section.attribution}</figcaption> : null}
                    </figure>
                  ) : null}

                  {section._type === "inquiryBlock" ? (
                    <PrivateEventsInquiry
                      eyebrow={section.eyebrow}
                      title={section.title}
                      body={section.body}
                      cta={section.cta}
                    />
                  ) : null}

                  {section._type === "bookingEmbedBlock" && section.cta ? (
                    <div className="cta-row">
                      <a className="button-link" href={cleanStegaString(section.cta.href)}>
                        {section.cta.label}
                      </a>
                    </div>
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
