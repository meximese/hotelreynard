import { PageShell } from "@/components/page-shell";
import { PageSections } from "@/components/page-sections";
import { getStayPage } from "@/lib/content/loaders";

export default async function StayPage() {
  const page = await getStayPage();

  return (
    <PageShell
      hero={page.hero}
      eyebrow="Stay"
      title={page.title}
      intro={page.intro}
      documentId={page._id}
      documentType={page._type}
    >
      {page.sections?.length ? (
        <PageSections sections={page.sections} documentId={page._id} documentType={page._type} />
      ) : null}
    </PageShell>
  );
}
