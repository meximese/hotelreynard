"use client";

import { FullHeightSplash } from "@/components/splash/FullHeightSplash";

export function SplashLayoutScaffold({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FullHeightSplash layout="row" />
      <div className="site-content-shell">
        <div className="site-content-inner striped-cool">
          <div
            className="site-content-shell__sentinel"
            data-site-header-sentinel
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </>
  );
}
