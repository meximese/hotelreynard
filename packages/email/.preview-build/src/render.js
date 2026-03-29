import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Hr, Text } from "@react-email/components";
import { render } from "@react-email/render";
import { EmailLayout } from "./EmailLayout.js";
import { PortableTextEmail } from "./PortableTextEmail.js";
const hotelName = "Hotel Reynard";
const defaultTemplates = {
    "contact-auto-reply": {
        title: "Thanks for reaching out, {firstName}.",
        subject: "We received your Hotel Reynard inquiry",
        previewText: "We received your Hotel Reynard inquiry",
        intro: "We received your note and will follow up as soon as we can.",
        body: [
            paragraphBlock("We have your inquiry about {contactReason}."),
            paragraphBlock(`${hotelName} is still taking shape, but the team is reviewing incoming requests and keeping in touch as plans evolve.`),
        ],
        outro: "If anything changes, just reply to this email and your message will stay threaded.",
    },
    "contact-internal-inquiry": {
        title: "New inquiry received",
        subject: "Hotel Reynard inquiry: {contactReason}",
        previewText: "New {contactReason} inquiry from {firstName} {lastName}",
        intro: "A new website inquiry was submitted from hotelreynard.com.",
        body: [
            paragraphBlock("A guest has submitted a new inquiry from the website."),
        ],
        outro: "Respond directly to the guest email to continue the conversation.",
    },
};
export function getDefaultEmailTemplate(key) {
    return {
        key,
        ...defaultTemplates[key],
    };
}
export function mergeEmailTemplate(key, overrides) {
    const base = getDefaultEmailTemplate(key);
    return {
        ...base,
        ...overrides,
        key,
        body: overrides?.body?.length ? overrides.body : base.body,
    };
}
export async function renderContactAutoReplyEmail(template, tokens) {
    const content = interpolateTemplate(mergeEmailTemplate("contact-auto-reply", template), tokens);
    return {
        subject: content.subject,
        html: await render(_jsx(EmailLayout, { intro: content.intro, outro: content.outro, previewText: content.previewText, title: content.title, children: _jsx(PortableTextEmail, { value: content.body }) })),
    };
}
export async function renderContactInquiryEmail(template, tokens) {
    const content = interpolateTemplate(mergeEmailTemplate("contact-internal-inquiry", template), tokens);
    return {
        subject: content.subject,
        html: await render(_jsxs(EmailLayout, { intro: content.intro, outro: content.outro, previewText: content.previewText, title: content.title, children: [_jsx(PortableTextEmail, { value: content.body }), _jsx(Hr, {}), _jsxs(Text, { children: [_jsx("strong", { children: "Name:" }), " ", tokens.firstName, " ", tokens.lastName] }), _jsxs(Text, { children: [_jsx("strong", { children: "Email:" }), " ", tokens.email] }), tokens.phone ? (_jsxs(Text, { children: [_jsx("strong", { children: "Phone:" }), " ", tokens.phone] })) : null, _jsxs(Text, { children: [_jsx("strong", { children: "Reason:" }), " ", tokens.contactReason] }), _jsx(Hr, {}), _jsx(Text, { children: tokens.message })] })),
    };
}
function interpolateTemplate(template, tokens) {
    return {
        ...template,
        title: interpolateText(template.title, tokens),
        subject: interpolateText(template.subject, tokens),
        previewText: interpolateText(template.previewText, tokens),
        intro: interpolateOptionalText(template.intro, tokens),
        outro: interpolateOptionalText(template.outro, tokens),
        body: interpolateBody(template.body, tokens),
    };
}
function interpolateBody(body, tokens) {
    if (!body) {
        return undefined;
    }
    return body.map((block) => ({
        ...block,
        children: (block.children || []).map((child) => "text" in child && typeof child.text === "string"
            ? { ...child, text: interpolateText(child.text, tokens) }
            : child),
    }));
}
function interpolateOptionalText(value, tokens) {
    return value ? interpolateText(value, tokens) : value;
}
function interpolateText(value, tokens) {
    const replacements = {
        firstName: tokens.firstName,
        lastName: tokens.lastName,
        email: tokens.email,
        phone: tokens.phone || "",
        contactReason: tokens.contactReason,
        message: tokens.message,
        hotelName: tokens.hotelName || hotelName,
    };
    return value.replace(/\{(\w+)\}/g, (_, key) => replacements[key] ?? "");
}
function paragraphBlock(text) {
    return {
        _type: "block",
        children: [
            {
                _type: "span",
                text,
            },
        ],
        markDefs: [],
        style: "normal",
    };
}
