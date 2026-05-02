import { NextResponse } from "next/server";
import {
  renderContactAutoReplyEmail,
  renderContactInquiryEmail,
} from "@hotelreynard/email";
import { Resend } from "resend";
import { getEmailTemplateByKey } from "@/lib/sanity/content";

const resendApiKey = process.env.RESEND_API_KEY;
const resendAudienceId = process.env.RESEND_AUDIENCE_ID;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const contactToEmail = process.env.CONTACT_TO_EMAIL;

function requireText(
  value: FormDataEntryValue | null,
  label: string,
  minLength = 1,
) {
  const text = String(value || "").trim();

  if (!text || text.length < minLength) {
    throw new Error(`${label} is required.`);
  }

  return text;
}

export async function POST(request: Request) {
  if (!resendApiKey || !fromEmail || !contactToEmail) {
    return NextResponse.json(
      { error: "Missing Resend configuration." },
      { status: 500 },
    );
  }

  const formData = await request.formData();

  try {
    const firstName = requireText(formData.get("firstName"), "First name", 2);
    const lastName = requireText(formData.get("lastName"), "Last name", 2);
    const email = requireText(formData.get("email"), "Email").toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const contactReason = requireText(
      formData.get("contactReason"),
      "Contact reason",
    );
    const message = requireText(formData.get("message"), "Message", 12);
    const consent = String(formData.get("consent") || "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required." },
        { status: 400 },
      );
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
      console.error(
        "Resend email error:",
        inquiryResult.error || autoReplyResult.error,
      );
      return NextResponse.json(
        { error: "Unable to send your inquiry right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to process your inquiry.",
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
