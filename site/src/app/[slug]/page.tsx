import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getPageBySlug } from "@/lib/sanity/content";
import { getVisualEditingEnabled } from "@/lib/sanity/preview";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const draftModeState = await draftMode();
  const visualEditingEnabled =
    getVisualEditingEnabled() && draftModeState.isEnabled;

  if (!slug || slug === "api") {
    redirect("/");
  }

  const page = await getPageBySlug(slug, { visualEditingEnabled });

  if (!page) {
    redirect("/");
  }

  return (
    <section className="rich-text-section">
      <p className="section-eyebrow">Page</p>
      <h1>{page.title}</h1>
      <div className="rich-text-section__body">
        <PortableText value={page.body || []} />
      </div>
    </section>
  );
}
