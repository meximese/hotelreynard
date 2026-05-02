const initFooterWordmark = (wordmark: HTMLElement) => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const reveal = () => {
    wordmark.dataset.revealed = "true";
  };

  if (prefersReducedMotion.matches) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);
      if (!isVisible) {
        return;
      }

      reveal();
      observer.disconnect();
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.28,
    },
  );

  observer.observe(wordmark);
};

document
  .querySelectorAll<HTMLElement>("[data-footer-wordmark]")
  .forEach(initFooterWordmark);
