import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageShell } from "@/components/page-shell";
import { CtaActions } from "@/components/cta-actions";
import {portableTextComponents} from "@/components/portable-text";
import { SanityImageView } from "@/components/sanity-image";
import { getEventBySlug } from "@/lib/content/loaders";
import { metadataForSeo } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  return metadataForSeo(event?.seo);
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
          <PortableText components={portableTextComponents} value={event.body} />
        </div>
      ) : null}
      <CtaActions actions={event.callsToAction} />
    </PageShell>
  );
}
