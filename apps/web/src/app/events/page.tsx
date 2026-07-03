import { EventCard } from "@/components/event-card";
import { PageShell } from "@/components/page-shell";
import { getUpcomingEvents } from "@/lib/content/loaders";

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <PageShell
      eyebrow="Events"
      title="Public programming across the restaurant and outdoor event space."
      intro="Events are modeled as a real collection with schedule, venue, status, and CTA fields so the website can evolve beyond static promotional copy."
    >
      <section className="card-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </section>
    </PageShell>
  );
}
