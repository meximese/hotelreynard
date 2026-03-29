import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from "react";
import { Text } from "@react-email/components";
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
function renderText(block) {
    return (block.children || [])
        .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
        .join("");
}
export function PortableTextEmail({ value = [] }) {
    return (_jsx(_Fragment, { children: value.map((block, index) => {
            const text = renderText(block).trim();
            if (!text) {
                return null;
            }
            if (block.listItem) {
                return (_jsxs(Text, { style: paragraphStyle, children: ["\u2022 ", text] }, block._key || index));
            }
            if (block.style === "h1" || block.style === "h2" || block.style === "h3") {
                return (_jsx(Text, { style: headingStyle, children: text }, block._key || index));
            }
            if (block.style === "blockquote") {
                return (_jsx(Text, { style: blockquoteStyle, children: text }, block._key || index));
            }
            const lines = text.split("\n").filter(Boolean);
            return (_jsx(Fragment, { children: lines.map((line, lineIndex) => (_jsx(Text, { style: paragraphStyle, children: line }, `${block._key || index}-${lineIndex}`))) }, block._key || index));
        }) }));
}
