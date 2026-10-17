"use client";

import { useEffect, useRef } from "react";

export default function OpenTableWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || container.querySelector("script[data-opentable-widget]")) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.opentableWidget = "true";
    script.src =
      "https://www.opentable.com/widget/reservation/loader?rid=1497553&type=standard&theme=standard&color=1&dark=false&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website&cfe=true";
    container.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="opentable-container" />
  );
}
