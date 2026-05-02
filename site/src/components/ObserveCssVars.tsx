"use client";

import { useEffect } from "react";

const observers = new WeakMap<HTMLElement, ResizeObserver>();

const resolveTarget = (selector?: string): HTMLElement | null => {
  if (!selector || selector === ":root") {
    return document.documentElement;
  }

  return document.querySelector(selector);
};

const measureDimension = (element: HTMLElement, dimension: string): number => {
  const rect = element.getBoundingClientRect();
  const fallback =
    dimension === "width" ? element.offsetWidth : element.offsetHeight;

  return dimension === "width" ? rect.width || fallback : rect.height || fallback;
};

export default function ObserveCssVars() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const observeCssVar = (element: HTMLElement) => {
      if (observers.has(element)) {
        return;
      }

      const varName = element.dataset.cssVarName;
      if (!varName) {
        return;
      }

      const dimension =
        element.dataset.cssVarDimension === "width" ? "width" : "height";
      const target = resolveTarget(element.dataset.cssVarTarget);
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const sync = () => {
        const value = Math.ceil(measureDimension(element, dimension));
        target.style.setProperty(varName, `${value}px`);
      };

      const observer = new ResizeObserver(sync);
      observers.set(element, observer);

      sync();
      requestAnimationFrame(sync);
      window.addEventListener("load", sync, { once: true });
      document.fonts?.ready.then(sync).catch(() => {});
      observer.observe(element);

      cleanups.push(() => observer.disconnect());
    };

    document
      .querySelectorAll<HTMLElement>("[data-css-var-name]")
      .forEach(observeCssVar);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
