import { PageShell } from "@/components/page-shell";
import { PageSections } from "@/components/page-sections";
import { getLocationPage } from "@/lib/content/loaders";

export default async function LocationPage() {
  const page = await getLocationPage();

  return (
    <PageShell
      eyebrow="Location"
      title={page.title}
      intro={page.intro}
    >
      {page.sections?.length ? <PageSections sections={page.sections} /> : null}
    </PageShell>
  );
}
