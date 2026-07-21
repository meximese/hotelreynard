import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageShell } from "@/components/page-shell";
import { SanityImageView } from "@/components/sanity-image";
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
      documentId={room._id}
      documentType={room._type || "room"}
    >
      <SanityImageView
        image={room.heroImage}
        alt={room.title}
        width={1600}
        height={1100}
        sizes="100vw"
        className="hero-image"
      />
      {room.body?.length ? (
        <div className="rich-body">
          <PortableText value={room.body} />
        </div>
      ) : null}
      {room.highlights?.length ? (
        <ul className="tag-list">
          {room.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
      {room.gallery?.length ? (
        <div className="image-grid">
          {room.gallery.map((image, index) => (
            <SanityImageView
              key={`${image.asset?._ref || "image"}-${index}`}
              image={image}
              alt={image.alt || `${room.title} gallery image ${index + 1}`}
              width={1000}
              height={800}
              sizes="(max-width: 767px) 100vw, 50vw"
              className="gallery-image"
            />
          ))}
        </div>
      ) : null}
    </PageShell>
  );
}
