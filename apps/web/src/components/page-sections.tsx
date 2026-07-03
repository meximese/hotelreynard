import { PortableText } from "@portabletext/react";
import type { PageSection } from "@/lib/content/types";

export function PageSections({ sections }: { sections: PageSection[] }) {
  return (
    <div className="section-stack">
      {sections.map((section, index) => {
        const key = `${section._type}-${index}`;

        if (section._type === "heroBlock") {
          return (
            <section className="card" key={key}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              {section.title ? <h2>{section.title}</h2> : null}
              {section.body ? <p>{section.body}</p> : null}
            </section>
          );
        }

        if (section._type === "featureListBlock") {
          return (
            <section className="card" key={key}>
              {section.title ? <h2>{section.title}</h2> : null}
              {section.items?.length ? (
                <ul className="tag-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        }

        if (section._type === "hoursBlock") {
          return (
            <section className="card" key={key}>
              {section.title ? <h2>{section.title}</h2> : <h2>Hours</h2>}
              {section.entries?.length ? (
                <ul className="hours-list">
                  {section.entries.map((entry) => (
                    <li key={`${entry.label}-${entry.hours}`}>
                      <strong>{entry.label}</strong>
                      <span>{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          );
        }

        if (section._type === "richTextBlock") {
          return (
            <section className="rich-body" key={key}>
              <PortableText value={section.content || []} />
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
