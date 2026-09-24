import { BuiHeadline, BuiText } from "@/components/ui/typography";

export function SectionHeader({
  eyebrow,
  title,
  alignClassName = "",
  titleAs = "h2",
  titleId,
}: {
  eyebrow?: string;
  title?: string;
  alignClassName?: string;
  titleAs?: "h1" | "h2" | "h3" | "span";
  titleId?: string;
}) {
  if (!eyebrow && !title) {
    return null;
  }

  return (
    <header className={`section__head ${alignClassName}`.trim()}>
      {eyebrow ? (
        <BuiText as="span" variant="eyebrow" className="section__eyebrow">
          {eyebrow}
        </BuiText>
      ) : null}
      {title ? (
        <BuiHeadline as={titleAs} className="section__title" id={titleId}>
          {title}
        </BuiHeadline>
      ) : null}
    </header>
  );
}
