"use client";

import Link from "next/link";
import { Toolbar } from "@base-ui/react/toolbar";
import { BookNowButton } from "@/components/book-now-button";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";
import { BuiText } from "@/components/ui/typography";

export function SplashSiteHeader() {
  return (
    <header className="site-header">
      <Toolbar.Root className="site-toolbar" aria-label="Primary">
        <Toolbar.Group
          className="toolbar-group"
          aria-label="Primary navigation"
        >
          <BuiText as="span">September 2026</BuiText>
        </Toolbar.Group>
        <Toolbar.Group className="toolbar-nav" aria-label="Brand">
          <Toolbar.Link render={<Link href="/" />} className="toolbar-brand">
            <LogoSolidMark className="toolbar-brand-logo" />
            <span className="sr-only">Hotel Reynard</span>
          </Toolbar.Link>
        </Toolbar.Group>
        <Toolbar.Group className="toolbar-group" aria-label="Booking">
          <BookNowButton />
        </Toolbar.Group>
      </Toolbar.Root>
    </header>
  );
}
