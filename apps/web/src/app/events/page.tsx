import { EventCard } from "@/components/event-card";
import { PageSections } from "@/components/page-sections";
import { PageShell } from "@/components/page-shell";
import { getEventsPageData, getUpcomingEvents } from "@/lib/content/loaders";

export default async function EventsPage() {
  const page = await getEventsPageData();
  const events = await getUpcomingEvents();

  return (
    <PageShell
      eyebrow="Events"
      title={page.title}
      intro={page.intro}
      documentId={page._id}
      documentType={page._type}
    >
      {page.sections?.length ? (
        <PageSections sections={page.sections} documentId={page._id} documentType={page._type} />
      ) : null}
      <section className="card-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </section>
    </PageShell>
  );
}
