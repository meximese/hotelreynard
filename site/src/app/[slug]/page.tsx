import { notFound } from "next/navigation";
import { PageSections } from "@/components/page-sections";
import { PageShell } from "@/components/page-shell";
import { getGenericPageBySlug } from "@/lib/content/loaders";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const reservedSlugs = new Set([
  "events",
  "rooms",
]);

export default async function GenericPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || reservedSlugs.has(slug)) {
    notFound();
  }

  const page = await getGenericPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <PageShell
      hero={page.hero}
      eyebrow="Page"
      title={page.title}
      pageIntro={page.pageIntro}
      documentId={page._id}
      documentType={page._type}
    >
      {page.sections?.length ? (
        <PageSections sections={page.sections} documentId={page._id} documentType={page._type} />
      ) : null}
    </PageShell>
  );
}
