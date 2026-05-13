import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { getSanityClient, sanityReadToken } from "@/lib/sanity/client";

export async function GET(request: Request) {
  if (!sanityReadToken) {
    return new NextResponse("Missing SANITY_API_READ_TOKEN.", { status: 500 });
  }

  const clientWithToken = getSanityClient().withConfig({ token: sanityReadToken });

  let isValid = false;
  let redirectTo = "/";

  try {
    const result = await validatePreviewUrl(clientWithToken, request.url);
    isValid = result.isValid;
    redirectTo = result.redirectTo || "/";
  } catch (error) {
    console.warn("Preview mode enable rejected:", error);
    return new NextResponse("Missing or invalid preview secret.", { status: 400 });
  }

  if (!isValid) {
    return new NextResponse("Invalid secret.", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectTo, request.url), 307);
}
