"use client";

import { useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  clamp,
  KEYFRAMES,
  LETTERS,
  mix,
  mixColor,
  type LetterId,
  type ReynardWordmarkMorphProps,
} from "@/components/archive/reynard-wordmark-morph/reynardMorphShared";

const SVG_PATHS: Record<LetterId, string> = {
  r1: "M0 1.20402C0.07 1.40402 26.72 0.124004 37.89 0.00400404C70.72 -0.305996 99.53 17.384 96.33 53.264C93.97 79.714 73.69 103.194 46.92 106.894C54.38 108.624 66.38 111.214 73.8 113.124C73.76 113.524 93.9 190.904 94.27 192.014C93.53 192.014 60.41 189.064 60.2 188.954C60.04 188.684 38.4 108.324 38.08 107.804C37.62 135.044 35.72 192.634 35.68 192.894C26.2 192.584 18.55 192.484 9.06001 192.444C9.26001 192.164 0 0.824006 0 1.19401V1.20402ZM61.73 54.784C62.42 40.714 57.29 21.284 39.86 21.394C39.29 45.324 38.78 69.254 38.34 93.194C54.29 88.064 60.99 70.084 61.74 54.794L61.73 54.784Z",
  e: "M0 2.66C0.4 2.52 41.35 0.51 62.66 0C63.05 0.56 66.4 20.47 66.37 21.4C55.92 21.65 48.1 21.72 37.66 22.22C37.66 24.27 37.38 62.32 37.45 64.23C45.75 63.84 51.61 63.51 59.91 63.27C60.12 69.88 60.33 76.49 60.54 83.1C52.39 83.33 46.69 83.65 38.54 84.04C38.49 86.03 39.61 163.3 39.61 163.3C39.61 163.3 70.82 161.25 70.78 161.27C70.9 168.4 71.01 175.54 71.11 182.67C52.96 183.09 34.84 183.98 16.73 185.34C16.75 184.13 0.04 2.91 0 2.66Z",
  y: "M23.48 111.02C16.29 73.88 8.46 36.87 0 0C10.32 0.05 20.64 0.190002 30.96 0.440002C34.13 27.4 40.61 52.33 43.41 79.34C48.44 52.58 59.51 1.78 59.51 1.78L84.21 2.88C84.21 2.88 62.34 68.66 52.34 105.3C51.22 127.35 49.32 156.08 48.31 178.13C39.55 177.75 30.79 177.45 22.03 177.23C22.46 155.16 22.95 133.09 23.49 111.02H23.48Z",
  n: "M0 5.7613C0.39 5.6413 31.72 -0.0987085 32.28 0.00129153C43.19 36.6313 58.68 91.3513 65.88 115.771C64.53 78.0213 64.82 41.7013 63.05 3.96128C71.63 3.69128 80.22 3.48128 88.81 3.33128C90.4 60.4113 88.83 113.511 89.45 170.611C88.89 170.611 61.69 171.351 61.69 171.351C51.81 134.341 35.64 79.4913 30.12 63.7013C32.61 100.821 34.89 137.951 36.98 175.101C29.43 175.521 21.89 176.001 14.35 176.551C10.05 119.581 5.27999 62.6513 0.019989 5.7613H0Z",
  a: "M23.04 0C37.83 0.25 52.62 0.710005 67.4 1.38C71.92 62.08 75.66 122.83 78.62 183.64C69.64 183.08 60.66 182.6 51.67 182.22C51.09 170.79 50.5 159.36 49.88 147.92C42.95 147.66 36.02 147.45 29.09 147.29C27.82 158.66 26.58 170.04 25.38 181.42C16.92 181.27 8.46 181.2 0 181.19C6.39 120.62 14.07 60.21 23.04 0ZM49.66 129.73C47.96 98.03 46.1 66.35 44.11 34.67C39.94 66.15 36.04 97.66 32.43 129.21C38.18 129.36 43.92 129.53 49.66 129.73Z",
  r2: "M0.0100098 3.86816C9.50001 2.64816 19 1.50814 28.5 0.438139C57.65 -2.83186 84.79 12.2381 86.9 44.4381C88.51 68.9181 74.95 94.2781 50.67 100.788C57.62 101.548 64.57 102.348 71.52 103.188C80.82 127.318 89.25 150.468 97.67 174.948C88.23 175.678 78.8 176.488 69.37 177.388C60.83 151.918 52.26 127.788 42.82 102.668C45.69 128.588 48.19 152.288 50.77 178.238C41.79 179.238 32.82 180.318 23.85 181.478C16.62 121.408 8.82 63.6982 0 3.85815L0.0100098 3.86816ZM55.7 48.0782C54.97 35.0482 48.87 16.5981 33.46 17.5081C35.17 40.3581 36.77 63.2182 38.26 86.0782C52.37 80.4882 56.48 62.1182 55.7 48.0782Z",
  d: "M4.10004 0C14.35 0.28 24.6 0.660005 34.85 1.13C82.05 3.57 81.79 57.6 78.49 92.79C75.6 123.58 68.62 179.58 26.15 177.44C17.44 177.04 8.72 176.72 0 176.48C1.22 117.65 2.59004 58.83 4.10004 0ZM49.89 90.37C50.75 77.64 59.69 23.51 35.96 22.45C35.59 22.43 24.87 158.85 24.67 159.21C33.07 159.59 39.52 147.94 41.75 141.54C47.42 125.3 48.75 107.29 49.89 90.37Z",
};

export default function ReynardWordmarkMorphSvg({
  className,
  mode = "controlled",
  progress,
  direction = "forward",
  onProgressChange,
  onAnimationComplete,
  onComplete,
  completionDirection,
}: ReynardWordmarkMorphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 25%", "end 75%"],
  });

  useEffect(() => {
    if (mode !== "scroll") {
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (value) => {
      setScrollProgress(value);
      onProgressChange?.(value);
    });

    return unsubscribe;
  }, [mode, onProgressChange, scrollYProgress]);

  const lastCompletedRef = useRef<{
    direction: "forward" | "reverse";
    progress: number;
  } | null>(null);

  const rawProgress = clamp(
    mode === "scroll" ? scrollProgress : (progress ?? 0),
    0,
    1,
  );
  const clampedProgress =
    direction === "reverse" ? 1 - rawProgress : rawProgress;
  const resolvedOnComplete = onComplete ?? onAnimationComplete;

  useEffect(() => {
    if (mode !== "controlled" || !resolvedOnComplete) {
      return;
    }

    const completedDirection = completionDirection ?? direction;
    const isTerminal = rawProgress >= 1;

    if (!isTerminal) {
      lastCompletedRef.current = null;
      return;
    }

    const terminalProgress = completedDirection === "reverse" ? 0 : 1;
    const lastCompleted = lastCompletedRef.current;

    if (
      lastCompleted &&
      lastCompleted.direction === completedDirection &&
      lastCompleted.progress === terminalProgress
    ) {
      return;
    }

    lastCompletedRef.current = {
      direction: completedDirection,
      progress: terminalProgress,
    };

    resolvedOnComplete(completedDirection, terminalProgress);
  }, [completionDirection, direction, mode, rawProgress, resolvedOnComplete]);

  const styles = useMemo(() => {
    return LETTERS.map((letter) => {
      const start = KEYFRAMES[0][letter.id];
      const end = KEYFRAMES[1][letter.id];

      return {
        ...letter,
        x: mix(start.x, end.x, clampedProgress),
        y: mix(start.y, end.y, clampedProgress),
        rotate: mix(start.rotate, end.rotate, clampedProgress),
        scale: mix(start.scale, end.scale, clampedProgress),
        color: mixColor(start.color, end.color, clampedProgress),
        path: SVG_PATHS[letter.id],
      };
    });
  }, [clampedProgress]);

  return (
    <div
      className={`reynard-morph reynard-morph--svg ${className ?? ""}`.trim()}
      ref={ref}
    >
      <div
        className="reynard-morph__viewport reynard-morph__viewport--svg"
        aria-label="REYNARD"
      >
        {styles.map((letter) => (
          <svg
            key={letter.id}
            className={`reynard-morph-svg__letter letter-${letter.id}`}
            aria-label={letter.label}
            viewBox={`0 0 ${letter.width} ${letter.height}`}
            style={
              {
                "--letter-width": letter.width,
                "--letter-height": letter.height,
                "--letter-x": `${letter.x}%`,
                "--letter-y": `${letter.y}%`,
                "--letter-rotate": `${letter.rotate}deg`,
                "--letter-scale": letter.scale,
                "--letter-color": letter.color,
              } as React.CSSProperties
            }
          >
            <path d={letter.path} fill="currentColor" />
          </svg>
        ))}
      </div>
    </div>
  );
}
