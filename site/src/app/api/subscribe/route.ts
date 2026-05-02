import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  if (!resendApiKey || !audienceId || !fromEmail) {
    return NextResponse.json(
      { error: "Missing Resend configuration." },
      { status: 500 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch (error) {
    console.error("Newsletter form parsing failed:", error);
    return NextResponse.json(
      { error: "Submit the newsletter form as form data." },
      { status: 400 },
    );
  }

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Valid email is required." },
      { status: 400 },
    );
  }

  try {
    const contactResult = await resend.contacts.create({
      email,
      audienceId,
    });

    if (contactResult.error) {
      console.error("Resend contact error:", contactResult.error);
      return NextResponse.json({ error: "Unable to add contact." }, { status: 502 });
    }

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: email,
      template: {
        id: "meximese-reynard",
        variables: {
          HEADLINE: "Thanks for your interest in Hotel Reynard!",
          SUBHEADLINE: "As things evolve, we'll keep you updated.",
        },
      },
    });

    if (emailResult.error) {
      console.error("Resend email error:", emailResult.error);
      return NextResponse.json(
        { error: "Unable to send welcome email." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend subscribe failure:", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
