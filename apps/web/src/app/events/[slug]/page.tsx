import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageShell } from "@/components/page-shell";
import { SanityImageView } from "@/components/sanity-image";
import { getEventBySlug } from "@/lib/content/loaders";
import { cleanStegaString } from "@/lib/sanity/preview";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Event"
      title={event.title}
      intro={
        event.summary ||
        "This route is ready for Sanity-backed event detail content and public programming."
      }
      documentId={event._id}
      documentType={event._type || "event"}
    >
      <SanityImageView
        image={event.heroImage}
        alt={event.title}
        width={1600}
        height={1100}
        sizes="100vw"
        className="hero-image"
      />
      {event.body?.length ? (
        <div className="rich-body">
          <PortableText value={event.body} />
        </div>
      ) : null}
      {event.cta ? (
        <div className="cta-row">
          <Link className="button-link" href={cleanStegaString(event.cta.href)}>
            {event.cta.label}
          </Link>
        </div>
      ) : null}
    </PageShell>
  );
}
