"use client";

import type { CSSProperties } from "react";

type SplashVenetianBlindsProps = {
  count?: number;
  color?: string;
  className?: string;
};

type BlindsStyle = CSSProperties & {
  "--splash-blind-color"?: string;
};

export function SplashVenetianBlinds({
  count = 9,
  color = "#143033",
  className = "",
}: SplashVenetianBlindsProps) {
  const safeCount = Math.max(1, Math.round(count));

  return (
    <div
      className={`splash-venetian-blinds ${className}`.trim()}
      aria-hidden="true"
      style={
        {
          "--splash-blind-color": color,
          gridTemplateRows: `repeat(${safeCount}, minmax(0, 1fr))`,
        } satisfies BlindsStyle
      }
    >
      {Array.from({ length: safeCount }).map((_, index) => (
        <span key={index} className="splash-venetian-blinds__bar" />
      ))}
    </div>
  );
}
