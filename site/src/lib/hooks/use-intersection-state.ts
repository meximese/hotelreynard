"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersectionState<T extends Element>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  initialIsIntersecting = true,
}: {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  initialIsIntersecting?: boolean;
} = {}) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [initialIsIntersecting, root, rootMargin, threshold]);

  return { ref, isIntersecting };
}
