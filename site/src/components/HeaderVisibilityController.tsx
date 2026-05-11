"use client";

import { useEffect } from "react";

const HEADER_REVEAL_VIEWPORTS = 2;

export default function HeaderVisibilityController() {
  useEffect(() => {
    const root = document.documentElement;

    const syncHeaderVisibility = () => {
      const threshold = window.innerHeight * HEADER_REVEAL_VIEWPORTS;
      root.dataset.headerVisible =
        window.scrollY >= threshold ? "true" : "false";
    };

    syncHeaderVisibility();
    window.addEventListener("scroll", syncHeaderVisibility, { passive: true });
    window.addEventListener("resize", syncHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", syncHeaderVisibility);
      window.removeEventListener("resize", syncHeaderVisibility);
    };
  }, []);

  return null;
}
