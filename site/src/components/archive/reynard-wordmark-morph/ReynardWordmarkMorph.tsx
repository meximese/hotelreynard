"use client";

import { animate, useMotionValue, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  clamp,
  KEYFRAMES,
  LETTERS,
  mix,
  mixColor,
  type ReynardWordmarkMorphProps,
} from "@/components/archive/reynard-wordmark-morph/reynardMorphShared";

export default function ReynardWordmarkMorph({
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
      };
    });
  }, [clampedProgress]);

  return (
    <div className={`reynard-morph ${className ?? ""}`.trim()} ref={ref}>
      <div className="reynard-morph__viewport" aria-label="REYNARD">
        {styles.map((letter) => (
          <span
            key={letter.id}
            className={`reynard-morph__letter letter-${letter.id}`}
            aria-label={letter.label}
            style={
              {
                "--letter-width": letter.width,
                "--letter-height": letter.height,
                "--letter-x": `${letter.x}%`,
                "--letter-y": `${letter.y}%`,
                "--letter-rotate": `${letter.rotate}deg`,
                "--letter-scale": letter.scale,
                "--letter-color": letter.color,
                "--letter-mask": `url("${letter.src}")`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export function ReynardWordmarkMorphDemo() {
  const progress = useMotionValue(0);
  const [value, setValue] = useState(0);
  const [playDirection, setPlayDirection] = useState<"forward" | "reverse">(
    "forward",
  );
  const [completionMessage, setCompletionMessage] = useState("");

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setValue(latest);
    });

    return unsubscribe;
  }, [progress]);

  const setFrame = (target: number) => {
    progress.set(target);
  };

  const play = (direction: "forward" | "reverse") => {
    setPlayDirection(direction);
    progress.set(0);
    animate(progress, 1, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  return (
    <section className="reynard-demo" aria-labelledby="reynard-demo-title">
      <div className="reynard-demo__copy">
        <p className="reynard-demo__eyebrow">Letter motion study</p>
        <h2 id="reynard-demo-title">Scroll it, trigger it, reverse it.</h2>
        <p>
          The same letter rig can be driven by scroll progress or by an
          imperative trigger, which is what we&apos;ll want later for loading
          states.
        </p>
      </div>

      <ReynardWordmarkMorph
        className="reynard-demo__stage"
        progress={value}
        direction={playDirection}
        onComplete={(direction, progressValue) => {
          setCompletionMessage(
            direction === "forward"
              ? `Forward animation finished at ${progressValue}.`
              : `Reverse animation finished at ${progressValue}.`,
          );
        }}
      />

      <div className="reynard-demo__controls">
        <button
          type="button"
          onClick={() => {
            setPlayDirection("forward");
            setFrame(0);
          }}
        >
          Stair Start
        </button>
        <button
          type="button"
          onClick={() => {
            setPlayDirection("forward");
            setFrame(0.5);
          }}
        >
          Mid Frame
        </button>
        <button
          type="button"
          onClick={() => {
            setPlayDirection("forward");
            setFrame(1);
          }}
        >
          Row End
        </button>
        <button type="button" onClick={() => play("forward")}>
          Play Forward
        </button>
        <button type="button" onClick={() => play("reverse")}>
          Play Reverse
        </button>
      </div>

      {completionMessage ? (
        <p className="reynard-demo__status" role="status">
          {completionMessage}
        </p>
      ) : null}
    </section>
  );
}
