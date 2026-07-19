import type { PageSection } from "@/lib/content/types";

export function FeatureListSection({
  section,
}: {
  section: PageSection;
}) {
  if (!section.items?.length) {
    return null;
  }

  return (
    <ul className="tag-list">
      {section.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
