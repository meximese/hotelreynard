"use client";

import { Separator } from "@base-ui/react/separator";

export function ContentSeparator({ className = "" }: { className?: string }) {
  const classes = className ? `section-divider ${className}` : "section-divider";

  return <Separator className={classes} />;
}
