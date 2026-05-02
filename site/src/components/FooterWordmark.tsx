"use client";

import { useEffect, useRef } from "react";

const letters = [
  { id: "r1", label: "R", src: "/site-svg/reynard-r-1.svg", width: 97, pair: 0 },
  { id: "e", label: "E", src: "/site-svg/reynard-e.svg", width: 72, pair: 0 },
  { id: "y", label: "Y", src: "/site-svg/reynard-y.svg", width: 85, pair: 1 },
  { id: "n", label: "N", src: "/site-svg/reynard-n.svg", width: 90, pair: 1 },
  { id: "a", label: "A", src: "/site-svg/reynard-a.svg", width: 79, pair: 2 },
  { id: "r2", label: "R", src: "/site-svg/reynard-r-2.svg", width: 98, pair: 2 },
  { id: "d", label: "D", src: "/site-svg/reynard-d.svg", width: 80, pair: 3 },
];

export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wordmark = ref.current;
    if (!wordmark) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const reveal = () => {
      wordmark.dataset.revealed = "true";
    };

    if (prefersReducedMotion.matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible) {
          return;
        }

        reveal();
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.28,
      },
    );

    observer.observe(wordmark);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="footer-wordmark" data-footer-wordmark ref={ref}>
      {letters.map((letter) => (
        <span
          key={letter.id}
          className="footer-wordmark__letter"
          data-pair={letter.pair}
          aria-label={letter.label}
        >
          <img src={letter.src} alt="" style={{ width: `${letter.width}px` }} />
        </span>
      ))}
    </div>
  );
}
