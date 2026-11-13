"use client";

import { useEffect, useRef } from "react";
import { BuiLink } from "@/components/ui/actions";

const openTableRestaurantId = "1497553";

export function OpenTableButton({
  label = "Reserve a table",
}: {
  label?: string;
}) {
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

  function handleOpen(attempt = 0) {
    const trigger = widgetContainerRef.current?.querySelector<HTMLElement>(
      "button, a",
    );

    if (trigger) {
      trigger.click();
      return;
    }

    if (attempt < 20) {
      window.setTimeout(() => handleOpen(attempt + 1), 100);
    }
  }

  return (
    <>
      <BuiLink
        href="#"
        onClick={(event) => {
          event.preventDefault();
          handleOpen();
        }}
        variant="inline"
      >
        {label}
      </BuiLink>
      <div
        ref={widgetContainerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
