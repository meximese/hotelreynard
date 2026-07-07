import { ContentSeparator } from "@/components/content-separator";
import { createSanityDataAttribute } from "@/lib/sanity/preview";

export function PageShell({
  eyebrow,
  title,
  intro,
  documentId,
  documentType,
  children,
}: {
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

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1 data-sanity={titleAttr}>{title}</h1>
        <p className="lede" data-sanity={introAttr}>
          {intro}
        </p>
      </section>
      <ContentSeparator />
      {children}
    </main>
  );
}
