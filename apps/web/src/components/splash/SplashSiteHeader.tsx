"use client";

import Link from "next/link";
import { Toolbar } from "@base-ui/react/toolbar";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";

export function SplashSiteHeader() {
  return (
    <header className="site-header">
      <Toolbar.Root className="site-toolbar" aria-label="Primary">
        <Toolbar.Group
          className="toolbar-group"
          aria-label="Primary navigation"
        >
          <span>September 2026</span>
        </Toolbar.Group>
        <Toolbar.Group className="toolbar-nav" aria-label="Brand">
          <Toolbar.Link render={<Link href="/" />} className="toolbar-brand">
            <LogoSolidMark className="toolbar-brand-logo" />
            <span className="sr-only">Hotel Reynard</span>
          </Toolbar.Link>
        </Toolbar.Group>
        <Toolbar.Group className="toolbar-group" aria-label="Booking">
          <Toolbar.Link
            render={<Link href="/stay" />}
            className="toolbar-link toolbar-link-book"
          >
            Reserve
          </Toolbar.Link>
        </Toolbar.Group>
      </Toolbar.Root>
    </header>
  );
}
