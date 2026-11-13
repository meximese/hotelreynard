import {notFound} from "next/navigation";
import {MenuRenderer} from "@/components/menu-renderer";
import {PageShell} from "@/components/page-shell";
import {getMenuBySlug} from "@/lib/content/loaders";
import {metadataForSeo} from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: PageProps) {
  const {slug} = await params;
  const menu = await getMenuBySlug(slug);

  return metadataForSeo(menu?.seo);
}

export default async function MenuPage({params}: PageProps) {
  const {slug} = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="Menu"
      title={menu.title}
      documentId={menu._id}
      documentType={menu._type || "menu"}
    >
      <MenuRenderer menu={menu} />
    </PageShell>
  );
}
