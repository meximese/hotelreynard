"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FloatingSplashHeader } from "@/components/splash/FloatingSplashHeader";

const HOME_HEADER_SENTINEL_SELECTOR = "[data-site-header-sentinel]";

export function SiteHeaderShell() {
  const pathname = usePathname();

  return pathname === "/" ? <HomePageHeaderShell /> : <StaticHeaderShell />;
}

function HomePageHeaderShell() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector(HOME_HEADER_SENTINEL_SELECTOR);

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-20px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <FloatingSplashHeader isVisible={isVisible} isCompact={isVisible} />;
}

function StaticHeaderShell() {
  return <FloatingSplashHeader isVisible isCompact />;
}
