import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import type { LinkProps } from "next/link";

type ActionVariant = "plain" | "inline" | "button" | "secondary";

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

export function UiLink({
  className,
  variant = "inline",
  ...props
}: LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: ActionVariant;
  }) {
  return <Link className={classes(getActionClass(variant), className)} {...props} />;
}

export function Button({
  className,
  variant = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionVariant;
}) {
  return <button className={classes(getActionClass(variant), className)} {...props} />;
}
