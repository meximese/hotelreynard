"use client";

import { Accordion } from "@base-ui/react/accordion";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { BuiLink } from "@/components/ui/actions";
import { BuiText } from "@/components/ui/typography";
import { resolveSanityLinkHref } from "@/lib/content/links";
import type { PageSection, SanityLink } from "@/lib/content/types";

const answerComponents: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const link = value as SanityLink | undefined;
      const href = resolveSanityLinkHref(link);

      if (!href) return <>{children}</>;

      return (
        <BuiLink
          href={href}
          target={link?.openInNewTab ? "_blank" : undefined}
          rel={link?.openInNewTab ? "noreferrer" : undefined}
        >
          {children}
        </BuiLink>
      );
    },
  },
};

export function FaqBlockSection({ section }: { section: PageSection }) {
  const questions = section.questions?.filter((item) => item.question && item.answer?.length);

  if (!questions?.length) return null;

  return (
    <Accordion.Root className="content-accordion faq-list" multiple keepMounted>
      {questions.map((item, index) => (
        <Accordion.Item
          className="accordion-item"
          key={item._key || index}
          value={item._key || String(index)}
        >
          <Accordion.Header render={<h3 />}>
            <Accordion.Trigger className="accordion-trigger faq-question">
              <BuiText as="span">{item.question}</BuiText>
              <svg
                className="accordion-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M1.5 8h13M8 14.5v-13" />
              </svg>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="accordion-panel">
            <div className="accordion-panel-inner rich-body faq-answer">
              <PortableText components={answerComponents} value={item.answer || []} />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
