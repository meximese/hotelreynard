import type { AstroCookies } from "astro";

const previewCookieName = "sanity-preview-perspective";
const previewCookieValue = "drafts";

export function getPreviewModeEnabled(cookies: AstroCookies) {
  // This is the main switch for Sanity Presentation / Visual Editing in the web app.
  // Studio turns it on by calling `/api/draft-mode/enable`, which sets the cookie below.
  return (
    import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true" &&
    cookies.get(previewCookieName)?.value === previewCookieValue
  );
}

export function getPreviewModeCookie() {
  return {
    name: previewCookieName,
    value: previewCookieValue,
    options: {
      httpOnly: true,
      path: "/",
      sameSite: "lax" as const,
      secure: import.meta.env.PROD,
    },
  };
}
