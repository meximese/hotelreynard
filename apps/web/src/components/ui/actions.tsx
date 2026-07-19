import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { LinkProps } from "next/link";

type ActionVariant = "plain" | "inline" | "button" | "secondary";
type ActionHover = "full" | "weight";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getActionClass(variant: ActionVariant) {
  if (variant === "plain") {
    return "ui-action";
  }

  if (variant === "button") {
    return "ui-action ui-action--button";
  }

  if (variant === "secondary") {
    return "ui-action ui-action--secondary";
  }

  return "ui-action ui-action--inline";
}

export function BuiLink({
  className,
  hover = "full",
  variant = "inline",
  ...props
}: LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    hover?: ActionHover;
    variant?: ActionVariant;
  }) {
  return <Link className={classes(getActionClass(variant), `ui-action--hover-${hover}`, className)} {...props} />;
}

export function BuiButton({
  className,
  hover = "full",
  variant = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  hover?: ActionHover;
  variant?: ActionVariant;
}) {
  return <button className={classes(getActionClass(variant), `ui-action--hover-${hover}`, className)} {...props} />;
}
