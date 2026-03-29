import React, { Fragment } from "react";
import { Text } from "@react-email/components";
import type { PortableTextBlock } from "@portabletext/types";

const paragraphStyle = {
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 14px",
};

const headingStyle = {
  fontSize: "20px",
  lineHeight: "1.4",
  margin: "18px 0 12px",
  fontWeight: "700",
};

const blockquoteStyle = {
  ...paragraphStyle,
  borderLeft: "3px solid #d7cab2",
  paddingLeft: "14px",
  color: "#5e513f",
};

function renderText(block: PortableTextBlock) {
  return (block.children || [])
    .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
    .join("");
}

export function PortableTextEmail({ value = [] }: { value?: PortableTextBlock[] }) {
  return (
    <>
      {value.map((block, index) => {
        const text = renderText(block).trim();

        if (!text) {
          return null;
        }

        if ((block as { listItem?: string }).listItem) {
          return (
            <Text key={block._key || index} style={paragraphStyle}>
              • {text}
            </Text>
          );
        }

        if (block.style === "h1" || block.style === "h2" || block.style === "h3") {
          return (
            <Text key={block._key || index} style={headingStyle}>
              {text}
            </Text>
          );
        }

        if (block.style === "blockquote") {
          return (
            <Text key={block._key || index} style={blockquoteStyle}>
              {text}
            </Text>
          );
        }

        const lines = text.split("\n").filter(Boolean);

        return (
          <Fragment key={block._key || index}>
            {lines.map((line, lineIndex) => (
              <Text key={`${block._key || index}-${lineIndex}`} style={paragraphStyle}>
                {line}
              </Text>
            ))}
          </Fragment>
        );
      })}
    </>
  );
}
