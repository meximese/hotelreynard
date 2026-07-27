import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageShell } from "@/components/page-shell";
import {portableTextComponents} from "@/components/portable-text";
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
  const actions =
    event?.callsToAction
      ?.map((link) => ({ href: resolveSanityLinkHref(link), label: link.label || "Learn more" }))
      .filter((item): item is { href: string; label: string } => Boolean(item.href)) || [];

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
      {actions.length ? (
        <div className="cta-row">
          {actions.map((action) => (
            <BuiLink key={action.href} variant="button" className="button-link" href={action.href}>
              {action.label}
            </BuiLink>
          ))}
        </div>
      ) : null}
    </PageShell>
  );
}
