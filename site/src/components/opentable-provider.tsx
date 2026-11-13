"use client";

import { createContext, useContext, useEffect, useRef } from "react";

const openTableRestaurantId = "1497553";

type OpenTableContextValue = { open: () => void };
const OpenTableContext = createContext<OpenTableContextValue | null>(null);

export function OpenTableProvider({ children }: { children: React.ReactNode }) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

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
