import { BuiText } from "@/components/ui/typography";
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
          <BuiText as="strong">{entry.label}</BuiText>
          <BuiText as="span">{entry.hours}</BuiText>
        </li>
      ))}
    </ul>
  );
}
