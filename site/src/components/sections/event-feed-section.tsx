import { EventCard } from "@/components/event-card";
import { BuiText } from "@/components/ui/typography";
import type { Event, PageSection } from "@/lib/content/types";

export function EventFeedSection({
  section,
  upcomingEvents,
}: {
  section: PageSection;
  upcomingEvents: Event[];
}) {
  if (!upcomingEvents.length) {
    return null;
  }

  return (
    <>
      {section.body ? <BuiText className="lede">{section.body}</BuiText> : null}
      <div className="card-grid">
        {upcomingEvents.slice(0, section.limit || 3).map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </>
  );
}
