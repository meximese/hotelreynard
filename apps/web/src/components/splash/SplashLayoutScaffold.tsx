"use client";

import { FloatingSplashHeader } from "@/components/splash/FloatingSplashHeader";
import { FullHeightSplash } from "@/components/splash/FullHeightSplash";
import { useIntersectionState } from "@/lib/hooks/use-intersection-state";

export function SplashLayoutScaffold({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, isIntersecting } = useIntersectionState<HTMLDivElement>({
    rootMargin: "-20px 0px 0px 0px",
    threshold: 0,
    initialIsIntersecting: true,
  });

  const isHeaderVisible = !isIntersecting;

  return (
    <>
      <FullHeightSplash />
      <FloatingSplashHeader
        isVisible={isHeaderVisible}
        isCompact={isHeaderVisible}
      />
      <div className="site-content-shell">
        <div className="site-content-shell__fade striped" aria-hidden="true" />
        <div className="site-content-inner striped">
          <div
            ref={ref}
            className="site-content-shell__sentinel"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </>
  );
}
