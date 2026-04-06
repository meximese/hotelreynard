import type { APIRoute } from "astro";
import {
  renderContactAutoReplyEmail,
  renderContactInquiryEmail,
} from "@hotelreynard/email";
import { Resend } from "resend";

import { getEmailTemplateByKey } from "../../utils/sanity";

const resendApiKey = import.meta.env.RESEND_API_KEY;
const resendAudienceId = import.meta.env.RESEND_AUDIENCE_ID;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
const contactToEmail = import.meta.env.CONTACT_TO_EMAIL;

// Hybrid Astro apps prerender routes by default. This endpoint handles live
// form submissions, so it must stay server-rendered at request time.
export const prerender = false;

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function requireText(value: FormDataEntryValue | null, label: string, minLength = 1) {
  const text = String(value || "").trim();

  if (!text || text.length < minLength) {
    throw new Error(`${label} is required.`);
  }

  return text;
}

export const POST: APIRoute = async ({ request }) => {
  if (!resendApiKey || !fromEmail || !contactToEmail) {
    return jsonResponse(500, { error: "Missing Resend configuration." });
  }

  const formData = await request.formData();

  try {
    const firstName = requireText(formData.get("firstName"), "First name", 2);
    const lastName = requireText(formData.get("lastName"), "Last name", 2);
    const email = requireText(formData.get("email"), "Email").toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const contactReason = requireText(formData.get("contactReason"), "Contact reason");
    const message = requireText(formData.get("message"), "Message", 12);
    const consent = String(formData.get("consent") || "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(400, { error: "Enter a valid email address." });
    }

    if (!consent) {
      return jsonResponse(400, { error: "Consent is required." });
    }

    const resend = new Resend(resendApiKey);
    const [internalTemplate, autoReplyTemplate] = await Promise.all([
      getEmailTemplateByKey("contact-internal-inquiry"),
      getEmailTemplateByKey("contact-auto-reply"),
    ]);
    const tokens = {
      firstName,
      lastName,
      email,
      phone,
      contactReason,
      message,
      hotelName: "Hotel Reynard",
    };

    if (resendAudienceId) {
      const contactResult = await resend.contacts.create({
        email,
        audienceId: resendAudienceId,
        firstName,
        lastName,
        unsubscribed: false,
      });

      if (contactResult.error) {
        console.error("Resend contact error:", contactResult.error);
      }
    }

    const [inquiryEmail, autoReplyEmail] = await Promise.all([
      renderContactInquiryEmail(internalTemplate, tokens),
      renderContactAutoReplyEmail(autoReplyTemplate, tokens),
    ]);

    const [inquiryResult, autoReplyResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: contactToEmail,
        replyTo: email,
        subject: inquiryEmail.subject,
        html: inquiryEmail.html,
      }),
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: autoReplyEmail.subject,
        html: autoReplyEmail.html,
      }),
    ]);

    if (inquiryResult.error || autoReplyResult.error) {
      console.error("Resend email error:", inquiryResult.error || autoReplyResult.error);
      return jsonResponse(502, { error: "Unable to send your inquiry right now." });
    }

    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return jsonResponse(400, {
      error: error instanceof Error ? error.message : "Unable to process your inquiry.",
    });
  }
};

export const GET: APIRoute = async () =>
  jsonResponse(405, { error: "Method not allowed." });
