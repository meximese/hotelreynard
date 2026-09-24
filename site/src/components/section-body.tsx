import type { ReactNode } from "react";

export function SectionBody({
  alignClassName = "",
  stack = false,
  children,
}: {
  alignClassName?: string;
  stack?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`section__content ${stack ? "section-stack " : ""}${alignClassName}`.trim()}
    >
      {children}
    </div>
  );
}
