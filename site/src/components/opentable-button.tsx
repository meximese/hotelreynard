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
      `https://www.opentable.com/widget/reservation/loader?rid=${openTableRestaurantId}&type=button&theme=standard&color=1&dark=false&iframe=true&overlay=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website`;
    container.appendChild(script);
  }, []);

  return (
    <span className="opentable-native-trigger">
      <BuiLink
        href="#"
        className="opentable-native-trigger__label"
        variant="inline"
      >
        {label}
      </BuiLink>
      <div
        ref={widgetContainerRef}
        className="opentable-native-trigger__widget"
        aria-hidden="true"
      />
    </span>
  );
}
