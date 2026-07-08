"use client";

import Image from "next/image";
import Link from "next/link";

export function FullHeightSplash() {
  return (
    <section className="splash-backdrop striped" aria-hidden="true">
      <div className="splash-backdrop__corner splash-backdrop__corner--top-left">
        <span>September 2026</span>
      </div>
      <div className="splash-backdrop__corner splash-backdrop__corner--top-right">
        <Link href="/stay">Reserve</Link>
      </div>
      <div className="splash-backdrop__center">
        <Image
          src="/logo-solid.svg"
          alt="Hotel Reynard"
          width={500}
          height={218}
          priority
          className="splash-backdrop__logo"
        />
        <Image
          src="/crest.svg"
          alt=""
          width={96}
          height={96}
          className="splash-backdrop__crest"
        />
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
