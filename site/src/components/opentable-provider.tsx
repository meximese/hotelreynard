"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const openTableRestaurantId = "1497553";

type OpenTableContextValue = { open: () => void };
const OpenTableContext = createContext<OpenTableContextValue | null>(null);

export function OpenTableProvider({ children }: { children: React.ReactNode }) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    let modal: HTMLElement | null = null;
    let scrollPosition = 0;
    let wasStopped = false;

    function syncModal() {
      const nextModal = document.getElementById("ot-cfe-modal");

      if (nextModal && !modal) {
        modal = nextModal;
        // OpenTable has already fixed the body and stored its scroll offset in top.
        scrollPosition = Math.max(
          0,
          -Number.parseFloat(document.body.style.top) || window.scrollY,
        );
        wasStopped = lenis?.isStopped ?? false;
        lenis?.stop();
      } else if (!nextModal && modal) {
        modal = null;
        // OpenTable restores body.scrollTop, but this page scrolls on the window.
        // Restore instantly, then refresh Lenis and the scroll-driven splash fade.
        window.scrollTo({ top: scrollPosition, behavior: "instant" });
        lenis?.resize();
        if (!wasStopped) lenis?.start();
        if (!lenis) window.dispatchEvent(new Event("scroll"));
      }
    }

    const observer = new MutationObserver(syncModal);
    observer.observe(document.body, { childList: true });
    syncModal();

    return () => {
      observer.disconnect();
      if (modal && !wasStopped) lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container || container.querySelector("script[data-opentable-widget]")) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.opentableWidget = "true";
    script.src =
      `https://www.opentable.com/widget/reservation/loader?rid=${openTableRestaurantId}&type=button&theme=standard&color=1&dark=false&iframe=false&overlay=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website`;
    container.appendChild(script);
  }, []);

  function open(attempt = 0) {
    const trigger = widgetContainerRef.current?.querySelector<HTMLElement>(
      "button, a",
    );
    if (trigger) {
      trigger.click();
      return;
    }
    if (attempt < 20) {
      window.setTimeout(() => open(attempt + 1), 100);
    }
  }

  return (
    <OpenTableContext.Provider value={{ open }}>
      {children}
      <div
        ref={widgetContainerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </OpenTableContext.Provider>
  );
}

export function useOpenTable() {
  const context = useContext(OpenTableContext);
  if (!context) {
    throw new Error("useOpenTable must be used within OpenTableProvider");
  }
  return context;
}
