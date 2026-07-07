import { PageShell } from "@/components/page-shell";
import { PageSections } from "@/components/page-sections";
import { PrivateEventsInquiry } from "@/components/private-events-inquiry";
import { getPrivateEventsPage } from "@/lib/content/loaders";

export default async function PrivateEventsPage() {
  const page = await getPrivateEventsPage();

  return (
    <PageShell
      eyebrow="Private Events"
      title={page.title}
      intro={page.intro}
    >
      {page.sections?.length ? <PageSections sections={page.sections} /> : null}
      <PrivateEventsInquiry />
    </PageShell>
  );
}
