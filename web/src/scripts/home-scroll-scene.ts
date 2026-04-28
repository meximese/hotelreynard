import { animate, scroll } from "motion";

const STAGE_BOUNDS = {
  width: 539,
  height: 455,
  centerX: 269.5,
  centerY: 227.5,
} as const;

// These are the main timing knobs to edit.
// Each tuple is [startProgress, endProgress] on the overall scene scroll range.
const PHASES = {
  bouquetBurst: [0.0, 0.54],
  letterFade: [0.1, 0.5],
  letterTravel: [0.1, 0.5],
  letterSettle: [0.5, 0.54],
  posterHandoff: [0.1, 0.2],
} as const;

// Bouquet sizing controls.
const BOUQUET_SCALE = 0.65;
const BOUQUET_TIGHTNESS = 1.12;
const BOTANICAL_SIZE_BOOST = 1.344;

type BotanicalLayout = {
  burstRot: number;
  burstScale: number;
  burstX: number;
  burstY: number;
  startX: number;
  startY: number;
  width: number;
};

type LetterTarget = {
  x: number;
  y: number;
};

type MotionController = ReturnType<typeof animate>;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mapPhase = (progress: number, [start, end]: readonly [number, number]) =>
  clamp((progress - start) / (end - start), 0, 1);

const seeded = (index: number, offset: number): number => {
  const value = Math.sin(index * 91.13 + offset * 17.17) * 43758.5453;
  return value - Math.floor(value);
};

const readNumber = (element: Element, key: string, fallback = 0): number => {
  if (!(element instanceof HTMLElement)) {
    return fallback;
  }

  const raw = element.dataset[key];
  return raw ? Number(raw) : fallback;
};

const stopAnimations = (animations: MotionController[]) => {
  for (const animation of animations) {
    animation.cancel();
  }
};

const initHomeScrollScene = (scene: HTMLElement) => {
  const stage = scene.querySelector("[data-stage]");
  if (!(stage instanceof HTMLElement)) {
    return;
  }

  const showPoster = scene.dataset.showPoster === "true";
  const wordSlots = Array.from(
    scene.querySelectorAll<HTMLElement>("[data-slot]"),
  );
  const botanicals = Array.from(
    scene.querySelectorAll<HTMLElement>("[data-botanical]"),
  );
  const letters = Array.from(
    scene.querySelectorAll<HTMLElement>("[data-letter]"),
  );
  const groupedReference = scene.querySelector<HTMLElement>(
    ".home-scroll__grouped-reference img",
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  let cancelScroll: (() => void) | undefined;
  let botanicalAnimations: MotionController[] = [];
  let letterAnimations: MotionController[] = [];
  let posterAnimations: MotionController[] = [];

  const letterTargets = new Map<string, LetterTarget>();
  const botanicalLayouts = new Map<string, BotanicalLayout>();

  const setReducedMotion = () => {
    scene.dataset.reducedMotion = "true";
    scene.style.setProperty("--scene-progress", "1");

    if (groupedReference) {
      groupedReference.style.opacity = showPoster ? "1" : "0";
      groupedReference.style.transform = "scale(1)";
    }

    botanicals.forEach((botanical) => {
      botanical.style.opacity = showPoster ? "0" : "1";
    });

    letters.forEach((letter) => {
      letter.style.opacity = "1";
      letter.style.filter = "none";
    });
  };

  const measure = () => {
    const stageRect = stage.getBoundingClientRect();
    const stageCenterX = stageRect.left + stageRect.width / 2;
    const stageCenterY = stageRect.top + stageRect.height / 2;

    const groupedScale = Math.min(
      (stageRect.width * 0.72) / STAGE_BOUNDS.width,
      (stageRect.height * 0.72) / STAGE_BOUNDS.height,
    );

    if (groupedReference) {
      groupedReference.style.width = `${STAGE_BOUNDS.width * groupedScale}px`;
    }

    letterTargets.clear();
    for (const slot of wordSlots) {
      const id = slot.dataset.slot;
      if (!id) {
        continue;
      }

      const rect = slot.getBoundingClientRect();
      letterTargets.set(id, {
        x: rect.left + rect.width / 2 - stageCenterX,
        y: rect.top + rect.height / 2 - stageCenterY,
      });
    }

    botanicalLayouts.clear();
    botanicals.forEach((botanical, index) => {
      const id = botanical.dataset.botanical ?? `botanical-${index}`;
      const centerX = readNumber(botanical, "centerX");
      const centerY = readNumber(botanical, "centerY");
      const width = readNumber(botanical, "width");

      // These define the bouquet's opening clustered layout.
      const startX =
        (centerX - STAGE_BOUNDS.centerX) *
        groupedScale *
        BOUQUET_SCALE *
        BOUQUET_TIGHTNESS;
      const startY =
        (centerY - STAGE_BOUNDS.centerY) *
        groupedScale *
        BOUQUET_SCALE *
        BOUQUET_TIGHTNESS;

      // These define the outward burst direction and how dramatic each piece feels.
      const baseAngle = Math.atan2(startY, startX || 0.001);
      const distance = Math.hypot(startX, startY);
      const outward = 165 + distance * 0.72 + seeded(index, 1) * 190;
      const angle = baseAngle + (seeded(index, 2) - 0.5) * 1.1;
      const burstX = Math.cos(angle) * outward + (seeded(index, 3) - 0.5) * 110;
      const burstY = Math.sin(angle) * outward + (seeded(index, 4) - 0.5) * 90;
      const burstRot = (seeded(index, 5) - 0.5) * 180;
      const burstScale = 0.92 + seeded(index, 6) * 0.36;

      botanicalLayouts.set(id, {
        startX,
        startY,
        width: width * groupedScale * BOUQUET_SCALE * BOTANICAL_SIZE_BOOST,
        burstX,
        burstY,
        burstRot,
        burstScale,
      });
    });
  };

  const createBotanicalAnimations = () => {
    stopAnimations(botanicalAnimations);
    botanicalAnimations = botanicals.map((botanical, index) => {
      const id = botanical.dataset.botanical ?? `botanical-${index}`;
      const layout = botanicalLayouts.get(id);
      if (!layout) {
        return animate(
          botanical,
          { opacity: 1 },
          { duration: 1, autoplay: false },
        );
      }

      const sideDrift = (seeded(index, 20) - 0.5) * 36;

      botanical.style.width = `${layout.width}px`;

      return animate(
        botanical,
        {
          x: [layout.startX, layout.startX + layout.burstX + sideDrift],
          y: [layout.startY, layout.startY + layout.burstY - 26],
          rotate: [0, layout.burstRot],
          scale: [1, layout.burstScale],
          opacity: [showPoster ? 0 : 1, 1],
        },
        {
          duration: 1,
          ease: "linear",
          autoplay: false,
        },
      );
    });
  };

  const createLetterAnimations = () => {
    stopAnimations(letterAnimations);
    letterAnimations = letters.map((letter, index) => {
      const id = letter.dataset.letter ?? "";
      const target = letterTargets.get(id) ?? { x: 0, y: 0 };

      // These define where letters originate near the center before spreading.
      const angle =
        (index / Math.max(letters.length, 1)) * Math.PI * 2 + seeded(index, 10);
      const radius = 22 + seeded(index, 11) * 28;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      const startRotate = (seeded(index, 12) - 0.5) * 10;
      const startScale = 0.72 + seeded(index, 13) * 0.08;

      return animate(
        letter,
        {
          x: [startX, target.x, target.x],
          y: [startY, target.y, target.y],
          rotate: [startRotate, 0, 0],
          scale: [startScale, 1, 1],
          opacity: [0, 0.55, 1],
        },
        {
          times: [0, 0.7, 1],
          duration: 1,
          ease: "linear",
          autoplay: false,
        },
      );
    });
  };

  const createPosterAnimations = () => {
    stopAnimations(posterAnimations);
    posterAnimations = [];

    if (!showPoster || !groupedReference) {
      return;
    }

    posterAnimations.push(
      animate(
        groupedReference,
        { opacity: [1, 0], scale: [1, 1.04] },
        { duration: 1, ease: "linear", autoplay: false },
      ),
    );
  };

  const applyProgress = (progress: number) => {
    scene.style.setProperty("--scene-progress", progress.toFixed(4));

    const burstProgress = mapPhase(progress, PHASES.bouquetBurst);
    const letterFadeProgress = mapPhase(progress, PHASES.letterFade);
    const letterTravelProgress = mapPhase(progress, PHASES.letterTravel);
    const settleProgress = mapPhase(progress, PHASES.letterSettle);
    const posterProgress = showPoster
      ? mapPhase(progress, PHASES.posterHandoff)
      : 1;

    // Bouquet scrub: how quickly the flowers/leaves travel outward.
    for (const animation of botanicalAnimations) {
      animation.time = burstProgress * animation.duration;
    }

    // Letter scrub:
    // - `letterFadeProgress` controls when letters stop being hidden
    // - `letterTravelProgress` controls how soon they begin leaving the center
    // - `settleProgress` handles the final snap into the wordmark
    const letterCompositeProgress = clamp(
      Math.max(
        letterFadeProgress * 0.45,
        letterTravelProgress * 0.75,
        settleProgress,
      ),
      0,
      1,
    );

    for (const animation of letterAnimations) {
      animation.time = letterCompositeProgress * animation.duration;
    }

    for (const animation of posterAnimations) {
      animation.time = posterProgress * animation.duration;
    }
  };

  const buildScene = () => {
    if (prefersReducedMotion.matches) {
      setReducedMotion();
      return;
    }

    scene.dataset.reducedMotion = "false";
    measure();
    createBotanicalAnimations();
    createLetterAnimations();
    createPosterAnimations();

    cancelScroll?.();
    cancelScroll = scroll(() => {
      // Use the scene's actual viewport position instead of Motion's target progress.
      // This preserves the earlier fix for layouts where transforms/offsets/negative tops
      // make the built-in element progress start too far through the animation.
      const rect = scene.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = clamp(
        -rect.top / Math.max(rect.height - viewportHeight, 1),
        0,
        1,
      );

      applyProgress(progress);
    });
  };

  buildScene();

  window.addEventListener("resize", buildScene);
  prefersReducedMotion.addEventListener("change", buildScene);
};

document
  .querySelectorAll<HTMLElement>("[data-home-scroll]")
  .forEach(initHomeScrollScene);
