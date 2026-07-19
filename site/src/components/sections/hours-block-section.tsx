import type { PageSection } from "@/lib/content/types";

export function HoursBlockSection({
  section,
}: {
  section: PageSection;
}) {
  if (!section.entries?.length) {
    return null;
  }

  return (
    <ul className="hours-list">
      {section.entries.map((entry) => (
        <li key={`${entry.label}-${entry.hours}`}>
          <strong>{entry.label}</strong>
          <span>{entry.hours}</span>
        </li>
      ))}
    </ul>
  );
}
