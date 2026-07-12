"use client";

import Link from "next/link";
import { CrestMark } from "@/components/svg/crest-mark";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";

export function FullHeightSplash() {
  return (
    <section className="splash-backdrop striped-light" aria-hidden="true">
      <div className="splash-backdrop__corner splash-backdrop__corner--top-left">
        <span className="date-desktop">September 2026</span>
        <span className="date-mobile">Sept 2026</span>
      </div>
      <div className="splash-backdrop__corner splash-backdrop__corner--top-right">
        <Link href="/stay">Reserve</Link>
      </div>
      <div className="splash-backdrop__center">
        <LogoSolidMark className="splash-backdrop__logo" color="var(--brown)" />
        <CrestMark className="splash-backdrop__crest" color="var(--brown)" />
      </div>
      <div className="splash-backdrop__corner splash-backdrop__corner--bottom-left">
        <span>Hotel and Tavern</span>
      </div>
      <div className="splash-backdrop__corner splash-backdrop__corner--bottom-right">
        <span>Keep in Touch</span>
      </div>
    </section>
  );
}
