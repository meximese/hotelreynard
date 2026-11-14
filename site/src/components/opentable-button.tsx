"use client";

import { BuiLink } from "@/components/ui/actions";
import { useOpenTable } from "@/components/opentable-provider";

export function OpenTableButton({
  label = "Reserve a table",
}: {
  label?: string;
}) {
  const { open } = useOpenTable();

  return (
    <BuiLink
      href="#"
      onClick={(event) => {
        event.preventDefault();
        open();
      }}
      variant="inline"
    >
      {label}
    </BuiLink>
  );
}
