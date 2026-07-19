"use client";

import { useEffect, useRef, useState } from "react";

export function useStuckState({
  rootMargin = "0px 0px 0px 0px",
  threshold = 0,
}: {
  rootMargin?: string;
  threshold?: number;
} = {}) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return { isStuck, sentinelRef };
}
