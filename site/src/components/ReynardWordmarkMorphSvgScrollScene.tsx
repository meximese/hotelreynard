"use client";

import { useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLayoutAnimation } from "@/components/LayoutAnimationProvider";
import ReynardWordmarkMorphSvg from "@/components/ReynardWordmarkMorphSvg";

type ReynardWordmarkMorphSvgScrollSceneProps = {
  className?: string;
  morphClassName?: string;
  direction?: "forward" | "reverse";
  holdStart?: number;
  holdEnd?: number;
  trackViewportHeights?: number;
  onComplete?: (direction: "forward" | "reverse", progress: number) => void;
  children?: React.ReactNode;
};

export default function ReynardWordmarkMorphSvgScrollScene({
  className,
  morphClassName,
  direction = "forward",
  holdStart = 0.25,
  holdEnd = 0.75,
  trackViewportHeights = 2,
  onComplete,
  children,
}: ReynardWordmarkMorphSvgScrollSceneProps) {
  const trackRef = useRef<HTMLElement>(null);
  const lastCompletedRef = useRef<"forward" | "reverse" | null>(null);
  const { isIntroMorphComplete, setIntroMorphComplete } = useLayoutAnimation();
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const nextProgress = remapProgress(value, holdStart, holdEnd);

      setProgress(nextProgress);

      if (nextProgress < 1) {
        lastCompletedRef.current = null;
        setIntroMorphComplete(false);
        return;
      }

      if (lastCompletedRef.current === direction) {
        return;
      }

      lastCompletedRef.current = direction;
      setIntroMorphComplete(true, direction);
      onComplete?.(direction, direction === "reverse" ? 0 : 1);
    });

    return unsubscribe;
  }, [direction, holdEnd, holdStart, onComplete, scrollYProgress, setIntroMorphComplete]);

  const sceneClassName = `morph-scroll-track ${className ?? ""}${
    isIntroMorphComplete ? " site-footer--morph-complete" : ""
  }`.trim();

  return (
    <section
      className={sceneClassName}
      ref={trackRef}
      style={
        {
          "--morph-track-height": `${trackViewportHeights * 100}vh`,
        } as React.CSSProperties
      }
    >
      <div className="morph-scroll-sticky">
        <ReynardWordmarkMorphSvg
          className={morphClassName}
          mode="controlled"
          progress={progress}
          direction={direction}
        />
        {children}
      </div>
    </section>
  );
}

function remapProgress(value: number, holdStart: number, holdEnd: number) {
  if (holdEnd <= holdStart) {
    return value >= holdEnd ? 1 : 0;
  }

  if (value <= holdStart) {
    return 0;
  }

  if (value >= holdEnd) {
    return 1;
  }

  return (value - holdStart) / (holdEnd - holdStart);
}
