import type { APIRoute } from "astro";
import { Resend } from "resend";

const resendApiKey = import.meta.env.RESEND_API_KEY;
const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
const resend = new Resend(resendApiKey);

// Hybrid Astro apps prerender routes by default. This endpoint needs to stay
// server-rendered so POST bodies and form submissions are handled at runtime.
export const prerender = false;

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!resendApiKey || !audienceId || !fromEmail) {
    return jsonResponse(500, { error: "Missing Resend configuration." });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch (error) {
    console.error("Newsletter form parsing failed:", error);
    return jsonResponse(400, {
      error: "Submit the newsletter form as form data.",
    });
  }

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  if (!email || !email.includes("@")) {
    return jsonResponse(400, { error: "Valid email is required." });
  }

  try {
    const contactResult = await resend.contacts.create({
      email,
      audienceId,
    });

    if (contactResult.error) {
      console.error("Resend contact error:", contactResult.error);
      return jsonResponse(502, { error: "Unable to add contact." });
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
      return jsonResponse(502, { error: "Unable to send welcome email." });
    }

    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error("Resend subscribe failure:", error);
    return jsonResponse(500, { error: "Unable to subscribe right now." });
  }
};
