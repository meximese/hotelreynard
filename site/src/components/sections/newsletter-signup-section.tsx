"use client";

import { NewsletterForm } from "@/components/newsletter-form";
import type { PageSection } from "@/lib/content/types";
import { resolveSanityLinkHref } from "@/lib/content/links";

export function NewsletterSignupSection({
  section,
}: {
  section: PageSection;
}) {
  return (
    <NewsletterForm
      showLabel={section.showLabel}
      thankYouMessage={section.thankYouMessage}
      successRedirectHref={resolveSanityLinkHref(section.successRedirect)}
    />
  );
}
