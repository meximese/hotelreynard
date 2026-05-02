"use client";

import { useEffect, useRef } from "react";
import { animate, scroll } from "motion";

const STAGE_BOUNDS = {
  width: 539,
  height: 455,
  centerX: 269.5,
  centerY: 227.5,
} as const;

const PHASES = {
  bouquetBurst: [0.08, 0.34],
  logoReveal: [0.0, 0.3],
  logoTravel: [0.34, 0.66],
  stickyLock: [0.58, 0.72],
  navReveal: [0.7, 0.88],
  stageFill: [0.68, 0.9],
  posterHandoff: [0.08, 0.18],
} as const;

const BOUQUET_SCALE = 0.75;
const BOUQUET_TIGHTNESS = 1.12;
const BOTANICAL_SIZE_BOOST = 1.344;
const showPoster = false;

const bouquetItems = [
  { id: "white-c", src: "/site-svg/white%20flower%20c.svg", width: 138.4, height: 134.6, centerX: 65.1, centerY: 305.6 },
  { id: "white-b", src: "/site-svg/white%20flower%20b.svg", width: 139.3, height: 131.2, centerX: 335.5, centerY: 374.6 },
  { id: "leaf-orange", src: "/site-svg/orange%20leaf%20a.svg", width: 123.6, height: 94.4, centerX: 277.2, centerY: 318.7 },
  { id: "leaf-green-c", src: "/site-svg/green%20leaf%20c.svg", width: 133.4, height: 134.5, centerX: 409.2, centerY: 179.9 },
  { id: "leaf-green-b", src: "/site-svg/green%20leaf%20b.svg", width: 128.5, height: 121.4, centerX: 155.5, centerY: 121.2 },
  { id: "leaf-green-a", src: "/site-svg/green%20leaf%20a.svg", width: 130.5, height: 134.6, centerX: 335.7, centerY: 64.7 },
  { id: "red-c", src: "/site-svg/red%20flower%20c.svg", width: 146.2, height: 119, centerX: 370.2, centerY: 296.1 },
  { id: "red-a", src: "/site-svg/red%20flower%20a.svg", width: 128.3, height: 125.2, centerX: 75.6, centerY: 191.8 },
  { id: "leaf-red", src: "/site-svg/red%20leaf%20a.svg", width: 149.4, height: 120.7, centerX: 146.6, centerY: 394.3 },
  { id: "orange-d", src: "/site-svg/orange%20flower%20d.svg", width: 126.8, height: 117.8, centerX: 174.3, centerY: 232.2 },
  { id: "orange-c", src: "/site-svg/orange%20flower%20c.svg", width: 146.1, height: 137.7, centerX: 251.2, centerY: 132 },
  { id: "orange-b", src: "/site-svg/orange%20flower%20b.svg", width: 157.3, height: 131.7, centerX: 474.6, centerY: 337.9 },
  { id: "orange-a", src: "/site-svg/orange%20flower%20a.svg", width: 123.6, height: 107.9, centerX: 452.1, centerY: 254.8 },
  { id: "white-a", src: "/site-svg/white%20flower%20a.svg", width: 148, height: 135.5, centerX: 311.7, centerY: 222.9 },
  { id: "red-b", src: "/site-svg/red%20flower%20b.svg", width: 133.1, height: 121.7, centerX: 189.3, centerY: 351.8 },
];

type BotanicalLayout = {
  burstRot: number;
  burstScale: number;
  burstX: number;
  burstY: number;
  startX: number;
  startY: number;
  width: number;
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

export default function HomeScrollScene() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = ref.current;
    if (!scene) {
      return;
    }

    const stage = scene.querySelector("[data-stage]");
    if (!(stage instanceof HTMLElement)) {
      return;
    }

    const botanicals = Array.from(
      scene.querySelectorAll<HTMLElement>("[data-botanical]"),
    );
    const groupedReference = scene.querySelector<HTMLElement>(
      ".home-scroll__grouped-reference img",
    );
    const sceneLogo = scene.querySelector<HTMLElement>(".home-scroll__logo-mark");
    const stageFill = scene.querySelector<HTMLElement>(".home-scroll__stage-fill");
    const headerBar = document.querySelector<HTMLElement>(
      "header > div[data-css-var-name='--site-header-height']",
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let cancelScroll: (() => void) | undefined;
    let botanicalAnimations: MotionController[] = [];
    let posterAnimations: MotionController[] = [];
    let fillAnimations: MotionController[] = [];
    let navUnlocked = false;

    const botanicalLayouts = new Map<string, BotanicalLayout>();

    const setReducedMotion = () => {
      scene.dataset.reducedMotion = "true";
      scene.style.setProperty("--scene-progress", "1");
      navUnlocked = true;

      if (groupedReference) {
        groupedReference.style.opacity = showPoster ? "1" : "0";
        groupedReference.style.transform = "scale(1)";
      }

      if (stageFill) {
        stageFill.style.opacity = "1";
      }

      if (sceneLogo) {
        sceneLogo.style.opacity = "1";
        sceneLogo.style.transform = "translateY(0) scale(1)";
      }

      botanicals.forEach((botanical) => {
        botanical.style.opacity = showPoster ? "0" : "1";
      });

      headerBar?.setAttribute("data-home-scroll-nav-state", "ready");
      headerBar?.style.setProperty("--home-header-shell-opacity", "1");
      headerBar?.style.setProperty("--home-header-logo-opacity", "1");
      headerBar?.style.setProperty("--home-nav-reveal", "1");
    };

    const measure = () => {
      const stageRect = stage.getBoundingClientRect();

      const groupedScale = Math.min(
        (stageRect.width * 0.72) / STAGE_BOUNDS.width,
        (stageRect.height * 0.72) / STAGE_BOUNDS.height,
      );

      if (groupedReference) {
        groupedReference.style.width = `${STAGE_BOUNDS.width * groupedScale}px`;
      }

      botanicalLayouts.clear();
      botanicals.forEach((botanical, index) => {
        const id = botanical.dataset.botanical ?? `botanical-${index}`;
        const centerX = readNumber(botanical, "centerX");
        const centerY = readNumber(botanical, "centerY");
        const width = readNumber(botanical, "width");

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

        const baseAngle = Math.atan2(startY, startX || 0.001);
        const distance = Math.hypot(startX, startY);
        const edgeBiasX = Math.sign(startX || seeded(index, 31) - 0.5 || 1);
        const edgeBiasY = Math.sign(startY || seeded(index, 32) - 0.5 || 1);
        const outward =
          Math.max(stageRect.width, stageRect.height) * 0.42 +
          distance * 0.68 +
          seeded(index, 1) * 220;
        const angle = baseAngle + (seeded(index, 2) - 0.5) * 0.72;
        const burstX =
          Math.cos(angle) * outward +
          edgeBiasX * (stageRect.width * 0.2 + seeded(index, 3) * 120);
        const burstY =
          Math.sin(angle) * outward +
          edgeBiasY * (stageRect.height * 0.18 + seeded(index, 4) * 110);
        const burstRot = (seeded(index, 5) - 0.5) * 220;
        const burstScale = 0.88 + seeded(index, 6) * 0.32;

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
            y: [layout.startY, layout.startY + layout.burstY],
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

    const createStageAnimations = () => {
      stopAnimations(fillAnimations);
      fillAnimations = [];

      if (stageFill) {
        fillAnimations.push(
          animate(
            stageFill,
            { opacity: [0, 1] },
            {
              duration: 1,
              ease: "linear",
              autoplay: false,
            },
          ),
        );
      }
    };

    const applyProgress = (progress: number) => {
      scene.style.setProperty("--scene-progress", progress.toFixed(4));

      const burstProgress = mapPhase(progress, PHASES.bouquetBurst);
      const logoRevealProgress = mapPhase(progress, PHASES.logoReveal);
      const logoTravelProgress = mapPhase(progress, PHASES.logoTravel);
      const stickyLockProgress = mapPhase(progress, PHASES.stickyLock);
      const navRevealProgress = mapPhase(progress, PHASES.navReveal);
      const stageFillProgress = mapPhase(progress, PHASES.stageFill);
      const posterProgress = showPoster
        ? mapPhase(progress, PHASES.posterHandoff)
        : 1;

      for (const animation of fillAnimations) {
        animation.time = stageFillProgress * animation.duration;
      }

      for (const animation of botanicalAnimations) {
        animation.time = burstProgress * animation.duration;
      }

      for (const animation of posterAnimations) {
        animation.time = posterProgress * animation.duration;
      }

      if (sceneLogo) {
        const lift = 118 * stickyLockProgress + 180 * logoTravelProgress;
        const scale = 1.06 - logoTravelProgress * 0.28 - stickyLockProgress * 0.12;
        const opacity =
          0.42 +
          logoRevealProgress * 0.4 -
          stickyLockProgress * 0.55 -
          navRevealProgress * 0.35;

        sceneLogo.style.opacity = String(clamp(opacity, 0, 1));
        sceneLogo.style.transform = `translateY(${-lift}px) scale(${scale})`;
      }

      if (headerBar) {
        const shellOpacity = clamp(stickyLockProgress * 1.2, 0, 1);
        const headerLogoOpacity = clamp(
          stickyLockProgress * 1.15 + navRevealProgress * 0.2,
          0,
          1,
        );
        const navReveal = clamp(navRevealProgress, 0, 1);

        headerBar.style.setProperty(
          "--home-header-shell-opacity",
          shellOpacity.toFixed(4),
        );
        headerBar.style.setProperty(
          "--home-header-logo-opacity",
          headerLogoOpacity.toFixed(4),
        );
        headerBar.style.setProperty("--home-nav-reveal", navReveal.toFixed(4));
      }

      headerBar?.setAttribute(
        "data-home-scroll-nav-state",
        navUnlocked ? "ready" : "hidden",
      );
    };

    const buildScene = () => {
      if (prefersReducedMotion.matches) {
        setReducedMotion();
        return;
      }

      scene.dataset.reducedMotion = "false";
      headerBar?.setAttribute(
        "data-home-scroll-nav-state",
        navUnlocked ? "ready" : "hidden",
      );
      measure();
      createStageAnimations();
      createBotanicalAnimations();
      createPosterAnimations();

      cancelScroll?.();
      cancelScroll = scroll(() => {
        const rect = scene.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = clamp(
          -rect.top / Math.max(rect.height - viewportHeight, 1),
          0,
          1,
        );

        if (!navUnlocked && progress >= PHASES.navReveal[0]) {
          navUnlocked = true;
        }

        applyProgress(progress);
      });
    };

    buildScene();
    window.addEventListener("resize", buildScene);
    prefersReducedMotion.addEventListener("change", buildScene);

    return () => {
      cancelScroll?.();
      stopAnimations(botanicalAnimations);
      stopAnimations(posterAnimations);
      stopAnimations(fillAnimations);
      window.removeEventListener("resize", buildScene);
      prefersReducedMotion.removeEventListener("change", buildScene);
    };
  }, []);

  return (
    <section
      className="home-scroll"
      data-home-scroll
      data-show-poster={showPoster ? "true" : "false"}
      ref={ref}
    >
      <div className="home-scroll__track">
        <div className="home-scroll__sticky" data-stage>
          <div className="home-scroll__wash"></div>
          <div className="home-scroll__stage-fill" aria-hidden="true"></div>
          <div className="home-scroll__stage-stripes" aria-hidden="true">
            <div className="home-scroll__stage-bar home-scroll__stage-bar--a"></div>
            <div className="home-scroll__stage-bar home-scroll__stage-bar--b"></div>
            <div className="home-scroll__stage-bar home-scroll__stage-bar--c"></div>
            <div className="home-scroll__stage-bar home-scroll__stage-bar--a"></div>
            <div className="home-scroll__stage-bar home-scroll__stage-bar--b"></div>
            <div className="home-scroll__stage-bar home-scroll__stage-bar--c"></div>
          </div>

          {showPoster ? (
            <div className="home-scroll__grouped-reference" aria-hidden="true">
              <img src="/site-svg/grouped-botanicals.svg" alt="" />
            </div>
          ) : null}

          <div className="home-scroll__logo-layer" aria-hidden="true" data-scene-logo>
            <div className="home-scroll__logo-mark">
              <img
                src="/site-svg/word-hotel.svg"
                alt=""
                className="home-scroll__logo-hotel"
              />
              <img
                src="/site-svg/word-reynard.svg"
                alt=""
                className="home-scroll__logo-reynard"
              />
            </div>
          </div>

          <div className="home-scroll__bouquet" aria-hidden="true">
            {bouquetItems.map((item) => (
              <figure
                key={item.id}
                className="home-scroll__botanical"
                data-botanical={item.id}
                data-center-x={item.centerX}
                data-center-y={item.centerY}
                data-width={item.width}
                data-height={item.height}
              >
                <img src={item.src} alt="" loading="eager" />
              </figure>
            ))}
          </div>

          <div className="home-scroll__reduced" aria-hidden="true">
            <img src="/site-svg/grouped-botanicals.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
