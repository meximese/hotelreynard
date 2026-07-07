import { ContentSeparator } from "@/components/content-separator";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="page-shell">
      <ContentSeparator />
      <section className="hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{intro}</p>
      </section>
      <ContentSeparator />
      {children}
    </main>
  );
}
