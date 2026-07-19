import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string" }),
    defineField({ name: "announcement", title: "Announcement", type: "string" }),
    defineField({
      name: "booking",
      title: "Booking settings",
      type: "object",
      fields: [
        { name: "widgetProvider", title: "Widget provider", type: "string" },
        { name: "widgetConfigurationId", title: "Widget configuration ID", type: "string" },
        { name: "defaultCtaLabel", title: "Default CTA label", type: "string" },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
