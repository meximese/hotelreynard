"use client";

import type { Event } from "@/lib/content/types";
import { ContentSeparator } from "@/components/content-separator";
import { SanityImageView } from "@/components/sanity-image";
import { BuiLink } from "@/components/ui/actions";
import { BuiHeadline, BuiText } from "@/components/ui/typography";
import { createSanityDataAttribute } from "@/lib/sanity/preview";

export function EventCard({ event }: { event: Event }) {
  const cardAttr =
    event._id && event._type
      ? createSanityDataAttribute({ id: event._id, type: event._type, path: ["title"] })
      : undefined;

  return (
    <article className="card" data-sanity={cardAttr}>
      <SanityImageView
        image={event.heroImage}
        alt={event.title}
        width={800}
        height={560}
        sizes="(max-width: 900px) 100vw, 33vw"
        className="card-image"
      />
      <div className="card-stack">
        <div>
          <BuiText variant="eyebrow" className="eyebrow">
            {event.venueType || "Event"}
          </BuiText>
          <BuiHeadline as="h3">{event.title}</BuiHeadline>
          {event.summary ? <BuiText>{event.summary}</BuiText> : null}
        </div>
        <ContentSeparator />
        <BuiLink href={`/events/${event.slug.current}`} className="text-link">
          View event
        </BuiLink>
      </div>
    </article>
  );
}
