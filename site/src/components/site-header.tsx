"use client";

import Link from "next/link";
import { Toolbar } from "@base-ui/react/toolbar";
import { BookNowButton } from "@/components/book-now-button";
import { BuiText } from "@/components/ui/typography";

const navItems = [
  { href: "/stay", label: "Stay" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/events", label: "Events" },
  { href: "/private-events", label: "Private Events" },
  { href: "/location", label: "Location" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Toolbar.Root className="site-toolbar" aria-label="Primary">
        <Toolbar.Group className="toolbar-group" aria-label="Brand">
          <Toolbar.Link render={<Link href="/" />} className="toolbar-brand">
            <BuiText as="span" className="toolbar-brand-display">
              Hotel Reynard
            </BuiText>
          </Toolbar.Link>
        </Toolbar.Group>
        <Toolbar.Group className="toolbar-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Toolbar.Link
              key={item.href}
              render={<Link href={item.href} />}
              className="toolbar-link"
            >
              <BuiText as="span">{item.label}</BuiText>
            </Toolbar.Link>
          ))}
        </Toolbar.Group>
        <Toolbar.Separator className="toolbar-divider" />
        <Toolbar.Group className="toolbar-group" aria-label="Booking">
          <BookNowButton />
        </Toolbar.Group>
      </Toolbar.Root>
    </header>
  );
}
