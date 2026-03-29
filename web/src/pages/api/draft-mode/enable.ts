import type { APIRoute } from "astro";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { sanityClient } from "sanity:client";

import { getPreviewModeCookie } from "../../../utils/previewMode";

// Presentation mode calls this route with a Sanity-generated preview secret.
// It must stay server-rendered so Astro preserves the request query string.
export const prerender = false;

const token = import.meta.env.SANITY_API_READ_TOKEN;

export const GET: APIRoute = async ({ cookies, redirect, request, url }) => {
  if (!token) {
    return new Response("Missing SANITY_API_READ_TOKEN.", { status: 500 });
  }

  const clientWithToken = sanityClient.withConfig({ token });
  const requestUrl = url;

  let isValid = false;
  let redirectTo = "/";

  try {
    const result = await validatePreviewUrl(clientWithToken, requestUrl.toString());
    isValid = result.isValid;
    redirectTo = result.redirectTo || "/";
  } catch (error) {
    console.warn("Preview mode enable rejected:", error);
    return new Response("Missing or invalid preview secret.", { status: 400 });
  }

  if (!isValid) {
    return new Response("Invalid secret.", { status: 401 });
  }

  const previewCookie = getPreviewModeCookie();
  cookies.set(previewCookie.name, previewCookie.value, previewCookie.options);

  return redirect(redirectTo, 307);
};
