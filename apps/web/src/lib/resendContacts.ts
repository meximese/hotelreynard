import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const segmentId = process.env.RESEND_SEGMENT_ID;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export function hasResendContactConfig() {
  return Boolean(resend && segmentId);
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
  if (!resend || !segmentId) {
    throw new Error("Missing Resend configuration.");
  }

  const createPayload = {
    email,
    firstName,
    lastName,
    unsubscribed: false,
    properties,
    segments: [{ id: segmentId }],
  };

  let createResult = await resend.contacts.create(createPayload);

  if (hasMissingPropertyError(createResult.error)) {
    createResult = await resend.contacts.create({
      ...createPayload,
      properties: undefined,
    });
  }

  if (!createResult.error) {
    return createResult.data;
  }

  const updatePayload = {
    email,
    firstName: firstName ?? null,
    lastName: lastName ?? null,
    unsubscribed: false,
    properties,
  };

  let updateResult = await resend.contacts.update(updatePayload);

  if (hasMissingPropertyError(updateResult.error)) {
    updateResult = await resend.contacts.update({
      ...updatePayload,
      properties: undefined,
    });
  }

  if (updateResult.error) {
    throw new Error(
      createResult.error.message || updateResult.error.message || "Unable to capture contact.",
    );
  }

  const segmentResult = await resend.contacts.segments.add({
    email,
    segmentId,
  });

  if (segmentResult.error) {
    throw new Error(segmentResult.error.message || "Unable to add contact to segment.");
  }

  return updateResult.data;
}

function hasMissingPropertyError(
  error: { message?: string | null } | null | undefined,
) {
  return error?.message?.includes("properties do not exist") ?? false;
}
