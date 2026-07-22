"use client";

import Link from "next/link";
import { Toolbar } from "@base-ui/react/toolbar";
import { BookNowButton } from "@/components/book-now-button";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";
import { BuiText } from "@/components/ui/typography";

export function FloatingSplashHeader({
  isVisible,
  isCompact,
}: {
  isVisible: boolean;
  isCompact?: boolean;
}) {
  return (
    <div
      className={`site-header-shell${isVisible ? " site-header-shell--visible" : ""}`}
    >
      <header
        className={`site-header${isCompact ? " site-header--compact" : ""}`}
      >
        <Toolbar.Root className="site-toolbar" aria-label="Primary">
          <Toolbar.Group
            className="toolbar-group"
            aria-label="Primary navigation"
          >
            <BuiText as="span" className="toolbar-corner-label date-desktop">
              September 2026
            </BuiText>
            <BuiText as="span" className="toolbar-corner-label date-mobile">
              Sept 2026
            </BuiText>
          </Toolbar.Group>
          <Toolbar.Group className="toolbar-nav" aria-label="Brand">
            <Toolbar.Link render={<Link href="/" />} className="toolbar-brand">
              <LogoSolidMark
                className="toolbar-brand-logo"
                color="var(--color-accent)"
              />
              <span className="sr-only">Hotel Reynard</span>
            </Toolbar.Link>
          </Toolbar.Group>
          <Toolbar.Group className="toolbar-group" aria-label="Booking">
            <BookNowButton />
          </Toolbar.Group>
        </Toolbar.Root>
      </header>
    </div>
  );
}
