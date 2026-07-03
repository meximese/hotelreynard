import { PageShell } from "@/components/page-shell";
import { RoomCard } from "@/components/room-card";
import { getFeaturedRooms } from "@/lib/content/loaders";

export default async function StayPage() {
  const rooms = await getFeaturedRooms();

  return (
    <PageShell
      eyebrow="Stay"
      title="Eight distinct rooms, one booking journey."
      intro="Each room should carry its own mood, material palette, and local story. The content model treats them as first-class documents now, even while booking remains property-level."
    >
      <section className="card-grid">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </section>
    </PageShell>
  );
}
