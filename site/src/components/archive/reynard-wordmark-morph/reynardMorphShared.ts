export type MorphMode = "scroll" | "controlled";
export type MorphPhase = 0 | 1;
export type MorphDirection = "forward" | "reverse";
export type LetterId = "r1" | "e" | "y" | "n" | "a" | "r2" | "d";

export interface ReynardWordmarkMorphProps {
  className?: string;
  mode?: MorphMode;
  progress?: number;
  direction?: MorphDirection;
  onProgressChange?: (progress: number) => void;
  onAnimationComplete?: (direction: MorphDirection, progress: number) => void;
  onComplete?: (direction: MorphDirection, progress: number) => void;
  completionDirection?: MorphDirection;
}

export type LetterFrame = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  color: string;
};

export type LetterConfig = {
  id: LetterId;
  label: string;
  src: string;
  width: number;
  height: number;
};

export const LETTERS: LetterConfig[] = [
  {
    id: "r1",
    label: "R",
    src: "/archive/reynard-wordmark-morph/reynard-r-1.svg",
    width: 97,
    height: 193,
  },
  {
    id: "e",
    label: "E",
    src: "/archive/reynard-wordmark-morph/reynard-e.svg",
    width: 72,
    height: 186,
  },
  {
    id: "y",
    label: "Y",
    src: "/archive/reynard-wordmark-morph/reynard-y.svg",
    width: 85,
    height: 179,
  },
  {
    id: "n",
    label: "N",
    src: "/archive/reynard-wordmark-morph/reynard-n.svg",
    width: 90,
    height: 177,
  },
  {
    id: "a",
    label: "A",
    src: "/archive/reynard-wordmark-morph/reynard-a.svg",
    width: 79,
    height: 184,
  },
  {
    id: "r2",
    label: "R",
    src: "/archive/reynard-wordmark-morph/reynard-r-2.svg",
    width: 98,
    height: 182,
  },
  {
    id: "d",
    label: "D",
    src: "/archive/reynard-wordmark-morph/reynard-d.svg",
    width: 80,
    height: 178,
  },
];

export const KEYFRAMES: Record<MorphPhase, Record<LetterId, LetterFrame>> = {
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
    r1: { x: 7.9, y: 19, rotate: 4, scale: 1, color: "#F9A020" },
    e: { x: 22.2, y: 31, rotate: 0, scale: 1, color: "#BACBDF" },
    y: { x: 35, y: 40.7, rotate: 0, scale: 1, color: "#F9A020" },
    n: { x: 48.7, y: 52, rotate: 0, scale: 1, color: "#94B5AD" },
    a: { x: 63.4, y: 64, rotate: 0, scale: 1, color: "#F9A020" },
    r2: { x: 78.2, y: 73.4, rotate: 0, scale: 1, color: "#BACBDF" },
    d: { x: 93.5, y: 82.5, rotate: 0, scale: 1, color: "#94B5AD" },
  },
};

export function mix(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function mixColor(start: string, end: string, progress: number) {
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
