import Link from "next/link";
import type { Event } from "@/lib/content/types";

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="card">
      <p className="eyebrow">{event.venueType || "Event"}</p>
      <h3>{event.title}</h3>
      {event.summary ? <p>{event.summary}</p> : null}
      <Link href={`/events/${event.slug.current}`} className="text-link">
        View event
      </Link>
    </article>
  );
}
