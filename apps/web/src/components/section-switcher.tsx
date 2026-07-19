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
import { BuiText } from "@/components/ui/typography";
import { VerticalGallerySection } from "@/components/vertical-gallery-section";
import { cleanStegaString } from "@/lib/sanity/preview";
import type { Event, PageSection } from "@/lib/content/types";

export function getSectionTextAlignClass(textAlign?: PageSection["textAlign"]) {
  return `text-align-${textAlign || "center"}`;
}

export function usesCustomSectionLayout(section: PageSection) {
  return section._type === "heroBlock";
}

export function sectionHasHeader(section: PageSection) {
  if (!section.eyebrow && !section.title) {
    return false;
  }

  if (section._type === "galleryBlock") {
    return !!section.showGalleryHeader;
  }

  return (
    !usesCustomSectionLayout(section) &&
    !!(section.eyebrow || section.title)
  );
}

function getSplitFeatureClassName(section: PageSection) {
  return `split-feature ${
    section.layout === "imageRight"
      ? "split-feature--reverse"
      : section.layout === "imageTop" || section.layout === "imageBottom"
        ? "split-feature--stacked"
        : ""
  } ${section.layout === "imageBottom" ? "split-feature--image-bottom" : ""}`.trim();
}

export function SectionSwitcher({
  section,
  upcomingEvents = [],
}: {
  section: PageSection;
  upcomingEvents?: Event[];
}) {
  const textAlignClass = getSectionTextAlignClass(section.textAlign);
  const galleryImages = section.images;

  if (section._type === "heroBlock") {
    return (
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
        <div className={`home-hero-caption ${textAlignClass}`.trim()}>
          {section.title ? <span className="home-hero-name">{section.title}</span> : null}
          {section.body ? <span className="home-hero-meta">{section.body}</span> : null}
        </div>
        {(section.primaryCta || section.secondaryCta) ? (
          <div className={`cta-row ${textAlignClass}`.trim()}>
            {section.primaryCta ? (
              <BuiLink
                variant="button"
                className="button-link"
                href={cleanStegaString(section.primaryCta.href)}
              >
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
    );
  }

  if (section._type === "galleryBlock" && galleryImages?.length) {
    if (section.displayMode === "stickyScroll") {
      return (
        <StickyScrollGallery
          title={section.title}
          images={galleryImages}
          showGalleryProgress={section.showGalleryProgress}
        />
      );
    }

    if (section.displayMode === "vertical") {
      return (
        <VerticalGallerySection
          title={section.title}
          images={galleryImages}
        />
      );
    }

    if (section.displayMode === "custom") {
      return (
        <CustomGallerySection
          title={section.title}
          images={galleryImages}
        />
      );
    }

    return (
      <GridGallerySection
        title={section.title}
        images={galleryImages}
      />
    );
  }

  if (section._type === "imageBlock") {
    return (
      <div className={`section__content section-stack ${textAlignClass}`.trim()}>
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
    );
  }

  if (section._type === "imageTextBlock") {
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
          {section.primaryCta ? (
            <BuiLink className="text-link" href={cleanStegaString(section.primaryCta.href)}>
              {section.primaryCta.label}
            </BuiLink>
          ) : null}
        </div>
      </div>
    );
  }

  if (section._type === "featureListBlock" && section.items?.length) {
    return (
      <ul className={`tag-list ${textAlignClass}`.trim()}>
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (section._type === "roomFeedBlock" && section.rooms?.length) {
    return (
      <div className={`section__content section-stack ${textAlignClass}`.trim()}>
        {section.body ? <BuiText className="lede">{section.body}</BuiText> : null}
        <div className="card-grid">
          {section.rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    );
  }

  if (section._type === "eventFeedBlock" && upcomingEvents.length) {
    return (
      <div className={`section__content section-stack ${textAlignClass}`.trim()}>
        {section.body ? <BuiText className="lede">{section.body}</BuiText> : null}
        <div className="card-grid">
          {upcomingEvents.slice(0, section.limit || 3).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    );
  }

  if (section._type === "hoursBlock" && section.entries?.length) {
    return (
      <ul className={`hours-list ${textAlignClass}`.trim()}>
        {section.entries.map((entry) => (
          <li key={`${entry.label}-${entry.hours}`}>
            <strong>{entry.label}</strong>
            <span>{entry.hours}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (section._type === "richTextBlock") {
    return (
      <div className={`rich-body ${textAlignClass}`.trim()}>
        <PortableText value={section.content || []} />
      </div>
    );
  }

  if (section._type === "quoteBlock" && section.quote) {
    return (
      <figure className={`quote-block ${textAlignClass}`.trim()}>
        <blockquote>{section.quote}</blockquote>
        {section.attribution ? <figcaption>{section.attribution}</figcaption> : null}
      </figure>
    );
  }

  if (section._type === "inquiryBlock") {
    return (
      <PrivateEventsInquiry
        body={section.body}
        cta={section.cta}
        alignClassName={textAlignClass}
      />
    );
  }

  if (section._type === "bookingEmbedBlock") {
    return (
      <div className={`section__content ${textAlignClass}`.trim()}>
        {section.body ? <BuiText>{section.body}</BuiText> : null}
        <div className={`cta-row ${textAlignClass}`.trim()}>
          <BookNowButton label={section.cta?.label || "Book Now"} />
        </div>
      </div>
    );
  }

  return null;
}
