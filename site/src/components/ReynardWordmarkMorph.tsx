"use client";

import { animate, useMotionValue, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type MorphMode = "scroll" | "controlled";
type MorphPhase = 0 | 1 | 2;
type LetterId = "r1" | "e" | "y" | "n" | "a" | "r2" | "d";

interface ReynardWordmarkMorphProps {
  className?: string;
  mode?: MorphMode;
  progress?: number;
  direction?: "forward" | "reverse";
  onProgressChange?: (progress: number) => void;
  onAnimationComplete?: (
    direction: "forward" | "reverse",
    progress: number,
  ) => void;
  onComplete?: (direction: "forward" | "reverse", progress: number) => void;
  completionDirection?: "forward" | "reverse";
}

type LetterFrame = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
};

type LetterConfig = {
  id: LetterId;
  label: string;
  src: string;
  width: number;
  height: number;
};

const LETTERS: LetterConfig[] = [
  {
    id: "r1",
    label: "R",
    src: "/site-svg/reynard-r-1.svg",
    width: 97,
    height: 193,
  },
  {
    id: "e",
    label: "E",
    src: "/site-svg/reynard-e.svg",
    width: 72,
    height: 186,
  },
  {
    id: "y",
    label: "Y",
    src: "/site-svg/reynard-y.svg",
    width: 85,
    height: 179,
  },
  {
    id: "n",
    label: "N",
    src: "/site-svg/reynard-n.svg",
    width: 90,
    height: 177,
  },
  {
    id: "a",
    label: "A",
    src: "/site-svg/reynard-a.svg",
    width: 79,
    height: 184,
  },
  {
    id: "r2",
    label: "R",
    src: "/site-svg/reynard-r-2.svg",
    width: 98,
    height: 182,
  },
  {
    id: "d",
    label: "D",
    src: "/site-svg/reynard-d.svg",
    width: 80,
    height: 178,
  },
];

const KEYFRAMES: Record<MorphPhase, Record<LetterId, LetterFrame>> = {
  0: {
    r1: { x: 7.9, y: 50, rotate: 0, scale: 1, color: "#F9A020" },
    e: { x: 22.2, y: 54, rotate: 0, scale: 1, color: "#BACBDF" },
    y: { x: 35, y: 47.8, rotate: 0, scale: 1, color: "#F9A020" },
    n: { x: 48.7, y: 52.5, rotate: 0, scale: 1, color: "#94B5AD" },
    a: { x: 63.4, y: 51.5, rotate: 0, scale: 1, color: "#F9A020" },
    r2: { x: 78.2, y: 46, rotate: 0, scale: 1, color: "#BACBDF" },
    d: { x: 93.5, y: 51, rotate: 0, scale: 1, color: "#94B5AD" },
  },
  1: {
    r1: { x: 10, y: 22, rotate: -7, scale: 1, color: "#BACBDF" },
    e: { x: 22, y: 27, rotate: 2, scale: 1, color: "#BACBDF" },
    y: { x: 33, y: 31, rotate: 1, scale: 1, color: "#F9A020" },
    n: { x: 45, y: 35, rotate: -2, scale: 1, color: "#94B5AD" },
    a: { x: 56, y: 38, rotate: 2, scale: 1, color: "#F9A020" },
    r2: { x: 68, y: 41, rotate: 3, scale: 1, color: "#BACBDF" },
    d: { x: 80, y: 45, rotate: 4, scale: 1, color: "#94B5AD" },
  },
  2: {
    r1: { x: 7.9, y: 19, rotate: 4, scale: 1, color: "#BACBDF" },
    e: { x: 22.2, y: 31, rotate: 0, scale: 1, color: "#BACBDF" },
    y: { x: 35, y: 40.7, rotate: 0, scale: 1, color: "#BACBDF" },
    n: { x: 48.7, y: 52, rotate: 0, scale: 1, color: "#BACBDF" },
    a: { x: 63.4, y: 64, rotate: 0, scale: 1, color: "#BACBDF" },
    r2: { x: 78.2, y: 73.4, rotate: 0, scale: 1, color: "#BACBDF" },
    d: { x: 93.5, y: 82.5, rotate: 0, scale: 1, color: "#BACBDF" },
  },
};

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
    offset: ["start 75%", "end 25%"],
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

  const phaseProgress = clampedProgress * 2;
  const startPhase = Math.floor(phaseProgress) as MorphPhase;
  const endPhase = Math.min(startPhase + 1, 2) as MorphPhase;
  const localProgress = phaseProgress - startPhase;

  const styles = useMemo(() => {
    return LETTERS.map((letter) => {
      const start = KEYFRAMES[startPhase][letter.id];
      const end = KEYFRAMES[endPhase][letter.id];

      return {
        ...letter,
        x: mix(start.x, end.x, localProgress),
        y: mix(start.y, end.y, localProgress),
        rotate: mix(start.rotate, end.rotate, localProgress),
        scale: mix(start.scale, end.scale, localProgress),
        color: mixColor(start.color, end.color, localProgress),
      };
    });
  }, [endPhase, localProgress, startPhase]);

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

function mix(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mixColor(start: string, end: string, progress: number) {
  const startRgb = hexToRgb(start);
  const endRgb = hexToRgb(end);

  return `rgb(${Math.round(mix(startRgb.r, endRgb.r, progress))} ${Math.round(
    mix(startRgb.g, endRgb.g, progress),
  )} ${Math.round(mix(startRgb.b, endRgb.b, progress))})`;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}
