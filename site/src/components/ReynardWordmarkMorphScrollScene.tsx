"use client";

import { useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReynardWordmarkMorph from "@/components/ReynardWordmarkMorph";

type ReynardWordmarkMorphScrollSceneProps = {
  className?: string;
  morphClassName?: string;
  direction?: "forward" | "reverse";
  holdStart?: number;
  holdEnd?: number;
  trackViewportHeights?: number;
  onComplete?: (direction: "forward" | "reverse", progress: number) => void;
  children?: React.ReactNode;
};

export default function ReynardWordmarkMorphScrollScene({
  className,
  morphClassName,
  direction = "forward",
  holdStart = 0.25,
  holdEnd = 0.75,
  trackViewportHeights = 2,
  onComplete,
  children,
}: ReynardWordmarkMorphScrollSceneProps) {
  const trackRef = useRef<HTMLElement>(null);
  const lastCompletedRef = useRef<"forward" | "reverse" | null>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setProgress(remapProgress(value, holdStart, holdEnd));
    });

    return unsubscribe;
  }, [holdEnd, holdStart, scrollYProgress]);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (progress < 1) {
      setIsComplete(false);
      lastCompletedRef.current = null;
      return;
    }

    if (lastCompletedRef.current === direction) {
      return;
    }

    lastCompletedRef.current = direction;
    setIsComplete(true);
    console.log("complete!!");
    onComplete?.(direction, direction === "reverse" ? 0 : 1);
  }, [direction, onComplete, progress]);

  const sceneClassName = `morph-scroll-track ${className ?? ""}${
    isComplete ? " site-footer--morph-complete" : ""
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
        <ReynardWordmarkMorph
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
