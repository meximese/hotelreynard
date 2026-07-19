import { ContentSeparator } from "@/components/content-separator";
import { SanityImageView } from "@/components/sanity-image";
import { Headline, Text } from "@/components/ui/typography";
import type { PageHero } from "@/lib/content/types";
import { createSanityDataAttribute } from "@/lib/sanity/preview";

export function PageShell({
  hero,
  eyebrow,
  title,
  intro,
  documentId,
  documentType,
  children,
}: {
  hero?: PageHero;
  eyebrow: string;
  title: string;
  intro: string;
  documentId?: string;
  documentType?: string;
  children?: React.ReactNode;
}) {
  const titleAttr =
    documentId && documentType
      ? createSanityDataAttribute({ id: documentId, type: documentType, path: ["title"] })
      : undefined;
  const introAttr =
    documentId && documentType
      ? createSanityDataAttribute({ id: documentId, type: documentType, path: ["intro"] })
      : undefined;
  const heroAttr =
    documentId && documentType
      ? createSanityDataAttribute({ id: documentId, type: documentType, path: ["hero"] })
      : undefined;

  return (
    <main className="page-shell">
      {hero?.media || hero?.eyebrow || hero?.title || hero?.body ? (
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
          {hero.eyebrow || hero.title || hero.body ? (
            <div className="page-top-hero__caption">
              <span className="home-hero-name">{hero.title || hero.eyebrow}</span>
              {hero.body ? <span className="home-hero-meta">{hero.body}</span> : null}
            </div>
          ) : null}
        </section>
      ) : null}
      <section className="hero">
        <Text variant="eyebrow">{eyebrow}</Text>
        <Headline as="h1" data-sanity={titleAttr}>
          {title}
        </Headline>
        <Text variant="body" className="lede" data-sanity={introAttr}>
          {intro}
        </Text>
      </section>
      <ContentSeparator />
      {children}
    </main>
  );
}
