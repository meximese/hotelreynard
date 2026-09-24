import { InstagramIcon } from "./svg/instagram";

export function InstagramLink({
  icon,
  className,
}: {
  icon: boolean;
  className?: string;
}) {
  const href = "https://www.instagram.com/hotelreynard/";
  const label = "Instagram";
  return (
    <a href={href} className={className}>
      {icon ? (
        <InstagramIcon
          className="social-icon social-icon--instagram"
          color="var(--color-ink)"
          aria-label="@hotelreynard on Instagram"
        />
      ) : (
        label
      )}
    </a>
  );
}
