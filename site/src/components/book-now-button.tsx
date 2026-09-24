import { BookNowButtonClient } from "@/components/book-now-button-client";

export function BookNowButton({
  className,
  label = "Book Now",
}: {
  className?: string;
  label?: string;
}) {
  return <BookNowButtonClient className={className} label={label} />;
}
