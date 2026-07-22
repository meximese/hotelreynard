"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { BookNowButton } from "@/components/book-now-button";
import { CrestMark } from "@/components/svg/crest-mark";
import { LogoSolidMark } from "@/components/svg/logo-solid-mark";
import { BuiHeadline, BuiText } from "../ui/typography";

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
            <BuiText as="span" className="date-desktop">
              September 2026
            </BuiText>
            <BuiText as="span" className="date-mobile">
              Sept 2026
            </BuiText>
          </div>
          <div className="splash-backdrop__corner splash-backdrop__corner--top-right">
            <BookNowButton />
          </div>
        </>
      ) : null}
      <div className="splash-backdrop__center">
        <h1 className="splash-backdrop__composite">
          <LogoSolidMark
            className="splash-backdrop__logo"
            color="var(--color-accent)"
            aria-label="Hotel Reynard"
          />
          <CrestMark
            className="splash-backdrop__crest"
            color="var(--color-accent)"
            aria-label="In Flumine Columbia"
          />
        </h1>
        {isRowLayout ? (
          <>
            <BuiHeadline as="h2" className="splash-backdrop__headline">
              Rooms and Tavern
            </BuiHeadline>
            <div className="splash-backdrop__detail-row">
              <BuiText as="span">
                <BuiText as="span" className="date-desktop">
                  September 2026
                </BuiText>
                <BuiText as="span" className="date-mobile">
                  Sept 2026
                </BuiText>
              </BuiText>
              <BookNowButton />

              <BuiText as="span">Keep in Touch</BuiText>
            </div>
          </>
        ) : null}
      </div>
      {!isRowLayout ? (
        <>
          <div className="splash-backdrop__corner splash-backdrop__corner--bottom-left">
            <BuiText as="span">Hotel and Tavern</BuiText>
          </div>
          <div className="splash-backdrop__corner splash-backdrop__corner--bottom-right">
            <BuiText as="span">Keep in Touch</BuiText>
          </div>
        </>
      ) : null}
    </section>
  );
}
