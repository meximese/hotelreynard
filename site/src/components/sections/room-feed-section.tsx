import { RoomCard } from "@/components/room-card";
import { BuiText } from "@/components/ui/typography";
import type { PageSection } from "@/lib/content/types";

export function RoomFeedSection({
  section,
}: {
  section: PageSection;
}) {
  if (!section.rooms?.length) {
    return null;
  }

  return (
    <>
      {section.body ? <BuiText className="lede">{section.body}</BuiText> : null}
      <div className="card-grid">
        {section.rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </>
  );
}
