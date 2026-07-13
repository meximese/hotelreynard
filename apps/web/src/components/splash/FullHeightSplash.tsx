"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { CrestMark } from "@/components/svg/crest-mark";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function FullHeightSplash() {
  const splashRef = useRef<HTMLElement | null>(null);

  const updateParallax = (scroll: number) => {
    const splash = splashRef.current;

    if (!splash) {
      return;
    }

    const progress = clamp(scroll / window.innerHeight);
    splash.style.setProperty("--splash-parallax-y", `${progress * -28}px`);
    splash.style.setProperty("--splash-parallax-scale", `${1 + progress * 0.018}`);
  };

  useLenis((lenis) => {
    updateParallax(lenis.scroll);
  });

  useEffect(() => {
    updateParallax(window.scrollY);

    function handleScroll() {
      updateParallax(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={splashRef} className="splash-backdrop striped-light" aria-hidden="true">
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
