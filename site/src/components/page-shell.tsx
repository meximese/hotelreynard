import type {PortableTextBlock} from "@portabletext/types";
import {PortableText} from "@portabletext/react";
import {ContentSeparator} from "@/components/content-separator";
import {portableTextComponents} from "@/components/portable-text";
import {SanityImageView} from "@/components/sanity-image";
import {BuiLink} from "@/components/ui/actions";
import {BuiHeadline, BuiText} from "@/components/ui/typography";
import {resolveSanityLinkHref} from "@/lib/content/links";
import type {PageHero} from "@/lib/content/types";
import {createSanityDataAttribute} from "@/lib/sanity/preview";

export function PageShell({
  hero,
  eyebrow,
  title,
  pageIntro,
  documentId,
  documentType,
  children,
}: {
  hero?: PageHero;
  eyebrow: string;
  title: string;
  pageIntro?: PortableTextBlock[];
  documentId?: string;
  documentType?: string;
  children?: React.ReactNode;
}) {
  const heroActions =
    hero?.callsToAction
      ?.map((link) => ({ href: resolveSanityLinkHref(link), label: link.label || "Learn more" }))
      .filter((item): item is { href: string; label: string } => Boolean(item.href)) || [];

  const titleAttr =
    documentId && documentType
      ? createSanityDataAttribute({
          id: documentId,
          type: documentType,
          path: ["title"],
        })
      : undefined;
  const introAttr =
    documentId && documentType
      ? createSanityDataAttribute({
          id: documentId,
          type: documentType,
          path: ["pageIntro"],
        })
      : undefined;
  const heroAttr =
    documentId && documentType
      ? createSanityDataAttribute({
          id: documentId,
          type: documentType,
          path: ["hero"],
        })
      : undefined;

  return (
    <main className="page-shell">
      {hero?.media || hero?.title || hero?.body ? (
        <section className="page-top-hero" data-sanity={heroAttr}>
          {hero.media ? (
            <SanityImageView
              image={hero.media}
              mobileImage={hero.mobileMedia}
              alt={hero.title || title}
              width={1800}
              height={1200}
              sizes="100vw"
              className="home-hero-image"
            />
          ) : null}
          {hero.title || hero.body ? (
            <div className="page-top-hero__caption">
              <BuiText as="span" className="home-hero-name">
                {hero.title}
              </BuiText>
              {hero.body ? (
                <BuiText as="span" className="home-hero-meta">
                  {hero.body}
                </BuiText>
              ) : null}
              {heroActions.length ? (
                <div className="cta-row">
                  {heroActions.map((action) => (
                    <BuiLink key={action.href} variant="button" className="button-link" href={action.href}>
                      {action.label}
                    </BuiLink>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
      <section className="hero">
        <BuiText variant="eyebrow">{eyebrow}</BuiText>
        <BuiHeadline as="h1" data-sanity={titleAttr}>
          {title}
        </BuiHeadline>
        {pageIntro?.length ? (
          <div className="lede" data-sanity={introAttr}>
            <PortableText components={portableTextComponents} value={pageIntro} />
          </div>
        ) : null}
      </section>
      <ContentSeparator />
      {children}
    </main>
  );
}
