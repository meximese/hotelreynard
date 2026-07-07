"use client";

import Link from "next/link";
import type { Event } from "@/lib/content/types";
import { ContentSeparator } from "@/components/content-separator";
import { SanityImageView } from "@/components/sanity-image";

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="card">
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
          <p className="eyebrow">{event.venueType || "Event"}</p>
          <h3>{event.title}</h3>
          {event.summary ? <p>{event.summary}</p> : null}
        </div>
        <ContentSeparator />
        <Link href={`/events/${event.slug.current}`} className="text-link">
          View event
        </Link>
      </div>
    </article>
  );
}
