import { PageShell } from "@/components/page-shell";
import { PageSections } from "@/components/page-sections";
import { getPrivateEventsPage } from "@/lib/content/loaders";

export default async function PrivateEventsPage() {
  const page = await getPrivateEventsPage();

  return (
    <PageShell
      hero={page.hero}
      eyebrow="Private Events"
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
