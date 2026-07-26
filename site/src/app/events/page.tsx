import { PageSections } from "@/components/page-sections";
import { PageShell } from "@/components/page-shell";
import { getEventsPageData, getUpcomingEvents } from "@/lib/content/loaders";

export default async function EventsPage() {
  const page = await getEventsPageData();
  const eventFeedLimit = Math.max(
    0,
    ...(page.sections
      ?.filter((section) => section._type === "eventFeedBlock")
      .map((section) => section.limit || 3) || [0]),
  );
  const events = eventFeedLimit > 0 ? await getUpcomingEvents(eventFeedLimit) : [];

  return (
    <PageShell
      hero={page.hero}
      eyebrow="Events"
      title={page.title}
      pageIntro={page.pageIntro}
      documentId={page._id}
      documentType={page._type}
    >
      {page.sections?.length ? (
        <PageSections
          sections={page.sections}
          documentId={page._id}
          documentType={page._type}
          upcomingEvents={events}
        />
      ) : null}
    </PageShell>
  );
}
