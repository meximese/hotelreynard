"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { BookNowButtonClient } from "@/components/book-now-button-client";
import { CrestMark } from "@/components/svg/crest-mark";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function FullHeightSplash({
  layout = "corners",
}: {
  layout?: "corners" | "row";
}) {
  const splashRef = useRef<HTMLElement | null>(null);
  const isRowLayout = layout === "row";

  const updateSplashState = (scroll: number) => {
    const splash = splashRef.current;

    if (!splash) {
      return;
    }

    const colorProgress = clamp(scroll / window.innerHeight);
    const contentProgress = clamp(scroll / (window.innerHeight * 0.62));

    splash.style.setProperty("--splash-cool-opacity", `${colorProgress}`);
    splash.style.setProperty(
      "--splash-content-opacity",
      `${1 - contentProgress}`,
    );
  };

  useLenis((lenis) => {
    updateSplashState(lenis.scroll);
  });

  useEffect(() => {
    updateSplashState(window.scrollY);

    function handleScroll() {
      updateSplashState(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={splashRef}
      className={`splash-backdrop splash-backdrop--${layout}`}
    >
      {!isRowLayout ? (
        <>
          <div className="splash-backdrop__corner splash-backdrop__corner--top-left">
            <span className="date-desktop">September 2026</span>
            <span className="date-mobile">Sept 2026</span>
          </div>
          <div className="splash-backdrop__corner splash-backdrop__corner--top-right">
            <BookNowButtonClient className="splash-book-button" />
          </div>
        </>
      ) : null}
      <div className="splash-backdrop__center">
        <LogoSolidMark className="splash-backdrop__logo" color="var(--brown)" />
        <CrestMark className="splash-backdrop__crest" color="var(--brown)" />
        {isRowLayout ? (
          <>
            <h4>Rooms and Tavern</h4>
            <div className="splash-backdrop__detail-row">
              <span>
                <span className="date-desktop">September 2026</span>
                <span className="date-mobile">Sept 2026</span>
              </span>
              <BookNowButtonClient className="splash-book-button" />

              <span>Keep in Touch</span>
            </div>
          </>
        ) : null}
      </div>
      {!isRowLayout ? (
        <>
          <div className="splash-backdrop__corner splash-backdrop__corner--bottom-left">
            <span>Hotel and Tavern</span>
          </div>
          <div className="splash-backdrop__corner splash-backdrop__corner--bottom-right">
            <span>Keep in Touch</span>
          </div>
        </>
      ) : null}
    </section>
  );
}
