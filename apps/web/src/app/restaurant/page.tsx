import { PageShell } from "@/components/page-shell";
import { PageSections } from "@/components/page-sections";
import { getRestaurantPage } from "@/lib/content/loaders";

export default async function RestaurantPage() {
  const page = await getRestaurantPage();

  return (
    <PageShell
      eyebrow="Restaurant"
      title={page.title}
      intro={page.intro}
    >
      {page.sections?.length ? <PageSections sections={page.sections} /> : null}
    </PageShell>
  );
}
