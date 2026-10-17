import { BookNowButton } from "@/components/book-now-button";
import OpenTableWidget from "@/components/opentable-widget";
import { BuiLink } from "@/components/ui/actions";
import { resolveSanityLinkHref } from "@/lib/content/links";
import type { SanityLink } from "@/lib/content/types";

export function CtaActions({
  actions,
  variant = "button",
  className = "cta-row",
}: {
  actions?: SanityLink[];
  variant?: "button" | "inline";
  className?: string;
}) {
  if (!actions?.length) {
    return null;
  }

  return (
    <div className={className}>
      {actions.map((action, index) => {
        const key = `${action.specialAction || action.href || action.reference?._id || "action"}-${index}`;

        if (action.linkType === "special") {
          if (action.specialAction === "bookingWidget") {
            return <BookNowButton key={key} label={action.label || "Book Now"} />;
          }

          if (action.specialAction === "openTableWidget") {
            return <OpenTableWidget key={key} />;
          }

          return null;
        }

        const href = resolveSanityLinkHref(action);

        if (!href) {
          return null;
        }

        return (
          <BuiLink
            key={key}
            className={variant === "button" ? "button-link" : "text-link"}
            href={href}
            rel={action.openInNewTab ? "noreferrer" : undefined}
            target={action.openInNewTab ? "_blank" : undefined}
            variant={variant}
          >
            {action.label || "Learn more"}
          </BuiLink>
        );
      })}
    </div>
  );
}
