import type { APIRoute } from "astro";

import { getPreviewModeCookie } from "../../../utils/previewMode";

// This route clears the preview-mode cookie when Presentation exits preview.
export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect, request }) => {
  const previewCookie = getPreviewModeCookie();
  cookies.delete(previewCookie.name, {
    path: previewCookie.options.path,
  });

  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") || "/";

  return redirect(returnTo, 307);
};
