"use client";

import Link from "next/link";
import { Toolbar } from "@base-ui/react/toolbar";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";

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
            <span className="toolbar-corner-label date-desktop">
              September 2026
            </span>
            <span className="toolbar-corner-label date-mobile">Sept 2026</span>
          </Toolbar.Group>
          <Toolbar.Group className="toolbar-nav" aria-label="Brand">
            <Toolbar.Link render={<Link href="/" />} className="toolbar-brand">
              <LogoSolidMark
                className="toolbar-brand-logo"
                color="var(--brown)"
              />
              <span className="sr-only">Hotel Reynard</span>
            </Toolbar.Link>
          </Toolbar.Group>
          <Toolbar.Group className="toolbar-group" aria-label="Booking">
            <Toolbar.Link
              render={<Link href="/stay" />}
              className="toolbar-link toolbar-link-book toolbar-corner-link"
            >
              Reserve Now
            </Toolbar.Link>
          </Toolbar.Group>
        </Toolbar.Root>
      </header>
    </div>
  );
}
