export function getVisualEditingEnabled() {
  return process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
}
