"use client";

import { useEffect, useState } from "react";

const svgCache = new Map<string, string>();

function decorateSvgMarkup({
  markup,
  className,
  title,
  decorative,
}: {
  markup: string;
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const sanitizedTitle = title
    ? title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    : "";
  const titleMarkup = title ? `<title>${sanitizedTitle}</title>` : "";
  const openingTag = markup.match(/<svg\b[^>]*>/)?.[0];

  if (!openingTag) {
    return markup;
  }

  const decoratedOpeningTag = openingTag
    .replace(/\s(width|height)="[^"]*"/g, "")
    .replace(/\sfill="[^"]*"/, "")
    .replace(
      "<svg",
      `<svg class="${className || ""}" fill="none" ${decorative ? 'aria-hidden="true"' : 'role="img"'}${
        decorative ? "" : ' focusable="false"'
      }`,
    );

  return markup
    .replace(openingTag, `${decoratedOpeningTag}${titleMarkup}`)
    .replaceAll(/fill="(#231F20|black|white)"/g, 'fill="currentColor"');
}

export function InlineSvgAsset({
  src,
  className,
  title,
  decorative = false,
}: {
  src: string;
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const [markup, setMarkup] = useState<string | null>(svgCache.get(src) || null);

  useEffect(() => {
    let cancelled = false;

    async function loadSvg() {
      const cachedMarkup = svgCache.get(src);

      if (cachedMarkup) {
        setMarkup(cachedMarkup);
        return;
      }

      const response = await fetch(src);
      const rawMarkup = await response.text();

      if (cancelled) {
        return;
      }

      svgCache.set(src, rawMarkup);
      setMarkup(rawMarkup);
    }

    void loadSvg();

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!markup) {
    return <span className={className} aria-hidden={decorative} />;
  }

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: decorateSvgMarkup({ markup, className, title, decorative }),
      }}
    />
  );
}
