"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { FloatingSplashHeader } from "@/components/splash/FloatingSplashHeader";

export function SiteHeaderShell() {
  const segment = useSelectedLayoutSegment();

  // The homepage splash owns its scroll-triggered header.
  return segment === null ? null : <FloatingSplashHeader isVisible isCompact />;
}
