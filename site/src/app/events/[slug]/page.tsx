import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageShell } from "@/components/page-shell";
import { SanityImageView } from "@/components/sanity-image";
import { BuiLink } from "@/components/ui/actions";
import { resolveSanityLinkHref } from "@/lib/content/links";
import { getEventBySlug } from "@/lib/content/loaders";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  const eventLinkHref = resolveSanityLinkHref(event?.link);

  if (!event) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Event"
      title={event.title}
      pageIntro={[]}
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
      {eventLinkHref ? (
        <div className="cta-row">
          <BuiLink variant="button" className="button-link" href={eventLinkHref}>
            Learn more
          </BuiLink>
        </div>
      ) : null}
    </PageShell>
  );
}
