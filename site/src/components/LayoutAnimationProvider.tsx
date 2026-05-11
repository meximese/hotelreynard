"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MorphDirection = "forward" | "reverse";

type LayoutAnimationContextValue = {
  isIntroMorphComplete: boolean;
  introMorphDirection: MorphDirection | null;
  setIntroMorphComplete: (
    isComplete: boolean,
    direction?: MorphDirection | null,
  ) => void;
};

const LayoutAnimationContext =
  createContext<LayoutAnimationContextValue | null>(null);

export function LayoutAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isIntroMorphComplete, setIsIntroMorphComplete] = useState(false);
  const [introMorphDirection, setIntroMorphDirection] =
    useState<MorphDirection | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.introMorphComplete = String(isIntroMorphComplete);

    if (introMorphDirection) {
      root.dataset.introMorphDirection = introMorphDirection;
      return;
    }

    delete root.dataset.introMorphDirection;
  }, [introMorphDirection, isIntroMorphComplete]);

  const value = useMemo<LayoutAnimationContextValue>(
    () => ({
      isIntroMorphComplete,
      introMorphDirection,
      setIntroMorphComplete(isComplete, direction = null) {
        setIsIntroMorphComplete(isComplete);
        setIntroMorphDirection(isComplete ? direction : null);
      },
    }),
    [introMorphDirection, isIntroMorphComplete],
  );

  return (
    <LayoutAnimationContext.Provider value={value}>
      {children}
    </LayoutAnimationContext.Provider>
  );
}

export function useLayoutAnimation() {
  const context = useContext(LayoutAnimationContext);

  if (!context) {
    throw new Error(
      "useLayoutAnimation must be used within a LayoutAnimationProvider",
    );
  }

  return context;
}
