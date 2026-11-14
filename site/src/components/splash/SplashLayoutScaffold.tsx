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
          {children}
        </div>
      </div>
    </>
  );
}
