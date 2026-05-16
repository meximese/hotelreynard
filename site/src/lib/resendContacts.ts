import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const audienceId = process.env.RESEND_AUDIENCE_ID;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function hasResendContactConfig() {
  return Boolean(resend && audienceId);
}

export async function captureResendContact({
  email,
  firstName,
  lastName,
  properties,
}: {
  email: string;
  firstName?: string;
  lastName?: string;
  properties?: Record<string, string | number | null>;
}) {
  if (!resend || !audienceId) {
    throw new Error("Missing Resend configuration.");
  }

  const createResult = await resend.contacts.create({
    audienceId,
    email,
    firstName,
    lastName,
    unsubscribed: false,
    properties,
  });

  if (!createResult.error) {
    return createResult.data;
  }

  const updateResult = await resend.contacts.update({
    audienceId,
    email,
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    unsubscribed: false,
    properties,
  });

  if (updateResult.error) {
    throw new Error(
      createResult.error.message || updateResult.error.message || "Unable to capture contact.",
    );
  }

  return updateResult.data;
}
