import { NextResponse } from "next/server";
import {
  captureResendContact,
  hasResendContactConfig,
} from "@/lib/resendContacts";

export async function POST(request: Request) {
  if (!hasResendContactConfig()) {
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
    await captureResendContact({
      email,
      properties: {
        source: "newsletter",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend subscribe capture failure:", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now." },
      { status: 502 },
    );
  }
}
