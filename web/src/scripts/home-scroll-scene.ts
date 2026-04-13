const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const initHomeScrollScene = (scene: HTMLElement) => {
  const stage = scene.querySelector("[data-stage]");
  const showPoster = scene.dataset.showPoster === "true";
  const wordSlots = Array.from(scene.querySelectorAll("[data-slot]"));
  const botanicals = Array.from(scene.querySelectorAll("[data-botanical]"));
  const letters = Array.from(scene.querySelectorAll("[data-letter]"));
  const groupedReference = scene.querySelector(
    ".home-scroll__grouped-reference img",
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const letterTargets = new Map<string, { x: number; y: number }>();
  const botanicalLayouts = new Map<
    string,
    {
      startX: number;
      startY: number;
      width: number;
      burstX: number;
      burstY: number;
      burstRot: number;
      burstScale: number;
    }
  >();
  let ticking = false;

  const readNumber = (element: Element, key: string, fallback = 0): number => {
    if (!(element instanceof HTMLElement)) {
      return fallback;
    }

    const raw = element.dataset[key];
    return raw ? Number(raw) : fallback;
  };

  const seeded = (index: number, offset: number): number => {
    const value = Math.sin(index * 91.13 + offset * 17.17) * 43758.5453;
    return value - Math.floor(value);
  };

  const measure = () => {
    if (!(stage instanceof HTMLElement)) {
      return;
    }

    const stageRect = stage.getBoundingClientRect();
    const stageCenterX = stageRect.left + stageRect.width / 2;
    const stageCenterY = stageRect.top + stageRect.height / 2;
    const groupedScale = Math.min(
      (stageRect.width * 0.72) / 539,
      (stageRect.height * 0.72) / 455,
    );
    // Bouquet setup controls: overall layout scale, spacing tightness, and per-item size boost.
    const bouquetScale = groupedScale * 0.65;
    const bouquetTightness = 1.12;
    const botanicalSizeBoost = 1.344;

    if (groupedReference instanceof HTMLImageElement) {
      groupedReference.style.width = `${539 * groupedScale}px`;
    }

    letterTargets.clear();
    for (const slot of wordSlots) {
      if (!(slot instanceof HTMLElement)) {
        continue;
      }

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
      if (!(botanical instanceof HTMLElement)) {
        return;
      }

      const id = botanical.dataset.botanical ?? `botanical-${index}`;
      const centerX = readNumber(botanical, "centerX");
      const centerY = readNumber(botanical, "centerY");
      const width = readNumber(botanical, "width");

      // Starting positions come from the grouped bouquet composition.
      const startX = (centerX - 269.5) * bouquetScale * bouquetTightness;
      const startY = (centerY - 227.5) * bouquetScale * bouquetTightness;

      // Explosion parameters: outward distance, angle variance, spin, and end scale.
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
        width: width * bouquetScale * botanicalSizeBoost,
        burstX,
        burstY,
        burstRot,
        burstScale,
      });
    });
  };

  const setReducedMotion = () => {
    scene.dataset.reducedMotion = "true";
    scene.style.setProperty("--scene-progress", "1");
  };

  const render = () => {
    ticking = false;

    if (!(stage instanceof HTMLElement)) {
      return;
    }

    if (prefersReducedMotion.matches) {
      setReducedMotion();
      return;
    }

    scene.dataset.reducedMotion = "false";

    const rect = scene.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = clamp(
      -rect.top / Math.max(rect.height - viewportHeight, 1),
      0,
      1,
    );

    scene.style.setProperty("--scene-progress", progress.toFixed(4));

    // Main scroll phases:
    // - burstProgress: bouquet breaks apart
    // - letterProgress: letters begin appearing
    // - letterTravelProgress: letters start moving outward toward the word earlier
    // - settleProgress: final easing into the guide slots
    //
    // To make letters begin sooner or overlap more with the bouquet burst,
    // lower the first value in `letterTravelProgress`.
    // To delay them, raise that first value.
    const burstProgress = clamp((progress - 0.08) / 0.46, 0, 1);
    const letterProgress = clamp((progress - 0.18) / 0.44, 0, 1);
    const letterTravelProgress = clamp((progress - 0.18) / 0.34, 0, 1);
    const settleProgress = clamp((progress - 0.56) / 0.18, 0, 1);
    const handoffProgress = showPoster
      ? clamp((progress - 0.1) / 0.1, 0, 1)
      : 1;

    if (showPoster && groupedReference instanceof HTMLImageElement) {
      groupedReference.style.opacity = String(1 - handoffProgress);
      groupedReference.style.transform = `scale(${lerp(1, 1.04, burstProgress)})`;
    }

    botanicals.forEach((botanical, index) => {
      if (!(botanical instanceof HTMLElement)) {
        return;
      }

      const id = botanical.dataset.botanical ?? `botanical-${index}`;
      const layout = botanicalLayouts.get(id);
      if (!layout) {
        return;
      }

      // Bouquet motion: move each botanical from its clustered start point to its exploded end point.
      // This stays monotonic so the pieces never appear to drift back inward.
      const sideDrift = (seeded(index, 20) - 0.5) * 36 * burstProgress;
      const x =
        lerp(layout.startX, layout.startX + layout.burstX, burstProgress) +
        sideDrift;
      const y =
        lerp(layout.startY, layout.startY + layout.burstY, burstProgress) -
        burstProgress * burstProgress * 26;
      const rotation = lerp(0, layout.burstRot, burstProgress);
      const scale = lerp(1, layout.burstScale, burstProgress);
      // Botanicals now stay out and visible: no late fade and no inward return.
      const opacity = handoffProgress;

      botanical.style.width = `${layout.width}px`;
      botanical.style.opacity = String(opacity);
      botanical.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
    });

    letters.forEach((letter, index) => {
      if (!(letter instanceof HTMLElement)) {
        return;
      }

      const id = letter.dataset.letter ?? "";
      const target = letterTargets.get(id) ?? { x: 0, y: 0 };

      // Letter motion:
      // 1. begin close to center
      // 2. travel outward toward the final word while the bouquet is still bursting
      // 3. settle cleanly into the guide slots
      const angle =
        (index / Math.max(letters.length, 1)) * Math.PI * 2 + seeded(index, 10);
      const radius = 22 + seeded(index, 11) * 28;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      const travelX = lerp(startX, target.x, letterTravelProgress);
      const travelY = lerp(startY, target.y, letterTravelProgress);
      const x = lerp(travelX, target.x, settleProgress);
      const y = lerp(travelY, target.y, settleProgress);
      const rotation = lerp(
        (seeded(index, 12) - 0.5) * 10,
        0,
        letterTravelProgress,
      );
      const scale = lerp(
        0.72 + seeded(index, 13) * 0.08,
        1,
        letterTravelProgress,
      );
      // Keep letters fully hidden over the intact bouquet, then ramp once to full opacity.
      const revealOpacity = clamp((letterProgress - 0.08) / 0.92, 0, 1);
      const opacity = clamp(revealOpacity * 0.55 + settleProgress * 0.45, 0, 1);

      letter.style.opacity = String(opacity);
      letter.style.filter = "none";
      letter.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
    });
  };

  const queueRender = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(render);
  };

  measure();
  queueRender();

  window.addEventListener("scroll", queueRender, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    queueRender();
  });
  prefersReducedMotion.addEventListener("change", () => {
    measure();
    queueRender();
  });
};

document
  .querySelectorAll<HTMLElement>("[data-home-scroll]")
  .forEach(initHomeScrollScene);
