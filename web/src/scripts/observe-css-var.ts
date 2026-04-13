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

  if (dimension === "width") {
    return rect.width || fallback;
  }

  return rect.height || fallback;
};

const observeCssVar = (element: HTMLElement) => {
  if (observers.has(element)) {
    return;
  }

  const varName = element.dataset.cssVarName;
  if (!varName) {
    return;
  }

  const dimension = element.dataset.cssVarDimension === "width" ? "width" : "height";
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
};

const initObservedCssVars = () => {
  document
    .querySelectorAll<HTMLElement>("[data-css-var-name]")
    .forEach(observeCssVar);
};

initObservedCssVars();
document.addEventListener("astro:page-load", initObservedCssVars);
