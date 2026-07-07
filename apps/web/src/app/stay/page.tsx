import { PageShell } from "@/components/page-shell";
import { PageSections } from "@/components/page-sections";
import { RoomCard } from "@/components/room-card";
import { getFeaturedRooms, getStayPage } from "@/lib/content/loaders";

export default async function StayPage() {
  const page = await getStayPage();
  const rooms = await getFeaturedRooms();

  return (
    <PageShell
      eyebrow="Stay"
      title={page.title}
      intro={page.intro}
      documentId={page._id}
      documentType={page._type}
    >
      {page.sections?.length ? (
        <PageSections sections={page.sections} documentId={page._id} documentType={page._type} />
      ) : null}
      <section className="card-grid">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </section>
    </PageShell>
  );
}
