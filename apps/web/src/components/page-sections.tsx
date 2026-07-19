"use client";

import { PortableText } from "@portabletext/react";
import { BookNowButton } from "@/components/book-now-button";
import { CustomGallerySection } from "@/components/custom-gallery-section";
import { EventCard } from "@/components/event-card";
import { GridGallerySection } from "@/components/grid-gallery-section";
import { PrivateEventsInquiry } from "@/components/private-events-inquiry";
import { RoomCard } from "@/components/room-card";
import { SanityImageView } from "@/components/sanity-image";
import { StickyScrollGallery } from "@/components/sticky-scroll-gallery";
import { BuiLink } from "@/components/ui/actions";
import { BuiHeadline, BuiText } from "@/components/ui/typography";
import { VerticalGallerySection } from "@/components/vertical-gallery-section";
import { cleanStegaString, createSanityDataAttribute } from "@/lib/sanity/preview";
import type { Event, PageSection } from "@/lib/content/types";

function getTextAlignClass(textAlign?: PageSection["textAlign"]) {
  return textAlign ? `text-align-${textAlign}` : "";
}

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
        const galleryImages = section.images;
        const sectionPath = section._key ? `sections[_key=="${section._key}"]` : `sections[${index}]`;
        const sectionAttr =
          documentId && documentType
            ? createSanityDataAttribute({
                id: documentId,
                type: documentType,
                path: [sectionPath],
              })
            : undefined;
        const isBespokeSection =
          section._type === "heroBlock" ||
          section._type === "galleryBlock";
        const textAlignClass = getTextAlignClass(section.textAlign);
        const hasSectionHeader = !isBespokeSection && section._type !== "inquiryBlock" && (section.eyebrow || section.title);

        return (
          <section
            key={key}
            className={`page-section ${isBespokeSection ? "page-section--bespoke" : ""}`}
            data-sanity={sectionAttr}
          >
            {hasSectionHeader ? (
              <header className={`page-section__header ${textAlignClass}`.trim()}>
                {section.eyebrow ? <BuiText variant="eyebrow">{section.eyebrow}</BuiText> : null}
                {section.title ? <BuiHeadline as="h2">{section.title}</BuiHeadline> : null}
              </header>
            ) : null}

            {section._type === "heroBlock" ? (
              <div className="home-hero-frame">
                {section.media ? (
                  <SanityImageView
                    image={section.media}
                    alt={section.title}
                    width={1800}
                    height={1200}
                    sizes="100vw"
                    className="home-hero-image"
                  />
                ) : null}
                <div className="home-hero-caption">
                  {section.title ? <span className="home-hero-name">{section.title}</span> : null}
                  {section.body ? <span className="home-hero-meta">{section.body}</span> : null}
                </div>
                {(section.primaryCta || section.secondaryCta) ? (
                  <div className="cta-row">
                    {section.primaryCta ? (
                      <BuiLink variant="button" className="button-link" href={cleanStegaString(section.primaryCta.href)}>
                        {section.primaryCta.label}
                      </BuiLink>
                    ) : null}
                    {section.secondaryCta ? (
                      <BuiLink
                        variant="secondary"
                        className="button-link button-link-secondary"
                        href={cleanStegaString(section.secondaryCta.href)}
                      >
                        {section.secondaryCta.label}
                      </BuiLink>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {section._type === "galleryBlock" && galleryImages?.length ? (
              section.displayMode === "stickyScroll" ? (
                <StickyScrollGallery
                  eyebrow={section.eyebrow}
                  title={section.title}
                  images={galleryImages}
                  showGalleryHeader={section.showGalleryHeader}
                  showGalleryProgress={section.showGalleryProgress}
                />
              ) : section.displayMode === "vertical" ? (
                <VerticalGallerySection
                  eyebrow={section.eyebrow}
                  title={section.title}
                  images={galleryImages}
                  showGalleryHeader={section.showGalleryHeader}
                />
              ) : section.displayMode === "custom" ? (
                <CustomGallerySection
                  eyebrow={section.eyebrow}
                  title={section.title}
                  images={galleryImages}
                  showGalleryHeader={section.showGalleryHeader}
                />
              ) : (
                <GridGallerySection
                  eyebrow={section.eyebrow}
                  title={section.title}
                  images={galleryImages}
                  showGalleryHeader={section.showGalleryHeader}
                />
              )
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
                {section.body ? <BuiText>{section.body}</BuiText> : null}
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
                  {section.body ? <BuiText>{section.body}</BuiText> : null}
                  {section.primaryCta ? (
                    <BuiLink className="text-link" href={cleanStegaString(section.primaryCta.href)}>
                      {section.primaryCta.label}
                    </BuiLink>
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
                {section.body ? <BuiText className="lede">{section.body}</BuiText> : null}
                <div className="card-grid">
                  {section.rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                  ))}
                </div>
              </div>
            ) : null}

            {section._type === "eventFeedBlock" && upcomingEvents.length ? (
              <div className="section-stack">
                {section.body ? <BuiText className="lede">{section.body}</BuiText> : null}
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

            {section._type === "bookingEmbedBlock" ? (
              <div className="cta-row">
                <BookNowButton label={section.cta?.label || "Book Now"} />
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
