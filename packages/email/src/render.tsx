import React from "react";
import { Hr, Text } from "@react-email/components";
import { render } from "@react-email/render";
import type { PortableTextBlock } from "@portabletext/types";

import { EmailLayout } from "./EmailLayout.js";
import { PortableTextEmail } from "./PortableTextEmail.js";
import type { ContactEmailTokens, EmailTemplateContent, ManagedEmailTemplateKey } from "./types.js";

const hotelName = "Hotel Reynard";

const defaultTemplates: Record<ManagedEmailTemplateKey, Omit<EmailTemplateContent, "key">> = {
  "contact-auto-reply": {
    title: "Thanks for reaching out, {firstName}.",
    subject: "We received your Hotel Reynard inquiry",
    previewText: "We received your Hotel Reynard inquiry",
    intro: "We received your note and will follow up as soon as we can.",
    body: [
      paragraphBlock("We have your inquiry about {contactReason}."),
      paragraphBlock(
        `${hotelName} is still taking shape, but the team is reviewing incoming requests and keeping in touch as plans evolve.`,
      ),
    ],
    outro:
      "If anything changes, just reply to this email and your message will stay threaded.",
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

export function getDefaultEmailTemplate(
  key: ManagedEmailTemplateKey,
): EmailTemplateContent {
  return {
    key,
    ...defaultTemplates[key],
  };
}

export function mergeEmailTemplate(
  key: ManagedEmailTemplateKey,
  overrides?: Partial<EmailTemplateContent> | null,
): EmailTemplateContent {
  const base = getDefaultEmailTemplate(key);

  return {
    ...base,
    ...overrides,
    key,
    body: overrides?.body?.length ? overrides.body : base.body,
  };
}

export async function renderContactAutoReplyEmail(
  template: Partial<EmailTemplateContent> | null | undefined,
  tokens: ContactEmailTokens,
) {
  const content = interpolateTemplate(mergeEmailTemplate("contact-auto-reply", template), tokens);

  return {
    subject: content.subject,
    html: await render(
      <EmailLayout
        intro={content.intro}
        outro={content.outro}
        previewText={content.previewText}
        title={content.title}
      >
        <PortableTextEmail value={content.body} />
      </EmailLayout>,
    ),
  };
}

export async function renderContactInquiryEmail(
  template: Partial<EmailTemplateContent> | null | undefined,
  tokens: ContactEmailTokens,
) {
  const content = interpolateTemplate(
    mergeEmailTemplate("contact-internal-inquiry", template),
    tokens,
  );

  return {
    subject: content.subject,
    html: await render(
      <EmailLayout
        intro={content.intro}
        outro={content.outro}
        previewText={content.previewText}
        title={content.title}
      >
        <PortableTextEmail value={content.body} />
        <Hr />
        <Text>
          <strong>Name:</strong> {tokens.firstName} {tokens.lastName}
        </Text>
        <Text>
          <strong>Email:</strong> {tokens.email}
        </Text>
        {tokens.phone ? (
          <Text>
            <strong>Phone:</strong> {tokens.phone}
          </Text>
        ) : null}
        <Text>
          <strong>Reason:</strong> {tokens.contactReason}
        </Text>
        <Hr />
        <Text>{tokens.message}</Text>
      </EmailLayout>,
    ),
  };
}

function interpolateTemplate(
  template: EmailTemplateContent,
  tokens: ContactEmailTokens,
): EmailTemplateContent {
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

function interpolateBody(
  body: PortableTextBlock[] | undefined,
  tokens: ContactEmailTokens,
) {
  if (!body) {
    return undefined;
  }

  return body.map((block) => ({
    ...block,
    children: (block.children || []).map((child) =>
      "text" in child && typeof child.text === "string"
        ? { ...child, text: interpolateText(child.text, tokens) }
        : child,
    ),
  }));
}

function interpolateOptionalText(
  value: string | undefined,
  tokens: ContactEmailTokens,
) {
  return value ? interpolateText(value, tokens) : value;
}

function interpolateText(value: string, tokens: ContactEmailTokens) {
  const replacements: Record<string, string> = {
    firstName: tokens.firstName,
    lastName: tokens.lastName,
    email: tokens.email,
    phone: tokens.phone || "",
    contactReason: tokens.contactReason,
    message: tokens.message,
    hotelName: tokens.hotelName || hotelName,
  };

  return value.replace(/\{(\w+)\}/g, (_, key: string) => replacements[key] ?? "");
}

function paragraphBlock(text: string): PortableTextBlock {
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
