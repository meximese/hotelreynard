import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getRoomBySlug } from "@/lib/content/loaders";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Room"
      title={room.title}
      intro={
        room.shortDescription ||
        "This room is modeled as a first-class content type so it can grow into a richer public experience over time."
      }
    >
      {room.highlights?.length ? (
        <ul className="tag-list">
          {room.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </PageShell>
  );
}
