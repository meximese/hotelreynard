import { PrivateEventsInquiry } from "@/components/private-events-inquiry";
import { SectionBody } from "@/components/section-body";
import { BookingEmbedBlockSection } from "@/components/sections/booking-embed-block-section";
import { EventFeedSection } from "@/components/sections/event-feed-section";
import { FeatureListSection } from "@/components/sections/feature-list-section";
import { GalleryBlockSection } from "@/components/sections/gallery-block-section";
import { HoursBlockSection } from "@/components/sections/hours-block-section";
import { ImageBlockSection } from "@/components/sections/image-block-section";
import { ImageTextBlockSection } from "@/components/sections/image-text-block-section";
import { QuoteBlockSection } from "@/components/sections/quote-block-section";
import { RichTextBlockSection } from "@/components/sections/rich-text-block-section";
import { RoomFeedSection } from "@/components/sections/room-feed-section";
import type { Event, PageSection } from "@/lib/content/types";

export function getSectionTextAlignClass(textAlign?: PageSection["textAlign"]) {
  return `text-align-${textAlign || "center"}`;
}

export function sectionHasHeader(section: PageSection) {
  if (!section.eyebrow && !section.title) {
    return false;
  }

  if (section._type === "galleryBlock") {
    return !!section.showGalleryHeader;
  }

  return !!(section.eyebrow || section.title);
}

export function SectionSwitcher({
  section,
  upcomingEvents = [],
}: {
  section: PageSection;
  upcomingEvents?: Event[];
}) {
  const textAlignClass = getSectionTextAlignClass(section.textAlign);

  if (section._type === "galleryBlock") {
    return <GalleryBlockSection section={section} />;
  }

  if (section._type === "imageBlock") {
    return (
      <SectionBody alignClassName={textAlignClass} stack>
        <ImageBlockSection section={section} />
      </SectionBody>
    );
  }

  if (section._type === "imageTextBlock") {
    return (
      <SectionBody alignClassName={textAlignClass}>
        <ImageTextBlockSection section={section} textAlignClass={textAlignClass} />
      </SectionBody>
    );
  }

  if (section._type === "featureListBlock" && section.items?.length) {
    return (
      <SectionBody alignClassName={textAlignClass}>
        <FeatureListSection section={section} />
      </SectionBody>
    );
  }

  if (section._type === "roomFeedBlock" && section.rooms?.length) {
    return (
      <SectionBody alignClassName={textAlignClass} stack>
        <RoomFeedSection section={section} />
      </SectionBody>
    );
  }

  if (section._type === "eventFeedBlock" && upcomingEvents.length) {
    return (
      <SectionBody alignClassName={textAlignClass} stack>
        <EventFeedSection section={section} upcomingEvents={upcomingEvents} />
      </SectionBody>
    );
  }

  if (section._type === "hoursBlock" && section.entries?.length) {
    return (
      <SectionBody alignClassName={textAlignClass}>
        <HoursBlockSection section={section} />
      </SectionBody>
    );
  }

  if (section._type === "richTextBlock") {
    return (
      <SectionBody alignClassName={textAlignClass}>
        <RichTextBlockSection section={section} />
      </SectionBody>
    );
  }

  if (section._type === "quoteBlock" && section.quote) {
    return (
      <SectionBody alignClassName={textAlignClass}>
        <QuoteBlockSection section={section} />
      </SectionBody>
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
      <SectionBody alignClassName={textAlignClass}>
        <BookingEmbedBlockSection section={section} />
      </SectionBody>
    );
  }

  return null;
}
