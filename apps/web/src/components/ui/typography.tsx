import type { ElementType, ComponentPropsWithoutRef } from "react";

type TextVariant = "body" | "intro" | "eyebrow" | "caption" | "action";
type HeadlineVariant = "headline" | "display";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type PolymorphicProps<T extends ElementType, Variant extends string> = {
  as?: T;
  className?: string;
  variant?: Variant;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function BuiHeadline<T extends ElementType = "h2">({
  as,
  className,
  variant = "headline",
  ...props
}: PolymorphicProps<T, HeadlineVariant>) {
  const Component = as || "h2";

  return (
    <Component
      className={classes("type-headline", variant === "display" && "type-display", className)}
      {...props}
    />
  );
}

export function BuiText<T extends ElementType = "p">({
  as,
  className,
  variant = "body",
  ...props
}: PolymorphicProps<T, TextVariant>) {
  const Component = as || "p";

  return <Component className={classes(`type-${variant}`, className)} {...props} />;
}
