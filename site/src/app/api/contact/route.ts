import { NextResponse } from "next/server";
import { captureResendContact, hasResendContactConfig } from "@/lib/resendContacts";

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
  if (!hasResendContactConfig()) {
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

    await captureResendContact({
      email,
      firstName,
      lastName,
      properties: {
        source: "contact_form",
        phone: phone || null,
        contactReason,
        message,
        consent: "true",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to capture your inquiry.",
      },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
