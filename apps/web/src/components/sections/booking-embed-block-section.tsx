import { BookNowButton } from "@/components/book-now-button";
import { BuiText } from "@/components/ui/typography";
import type { PageSection } from "@/lib/content/types";

export function BookingEmbedBlockSection({
  section,
}: {
  section: PageSection;
}) {
  return (
    <>
      {section.body ? <BuiText>{section.body}</BuiText> : null}
      <div className="cta-row">
        <BookNowButton label={section.cta?.label || "Book Now"} />
      </div>
    </>
  );
}
