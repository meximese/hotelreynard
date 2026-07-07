import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageTextBlock",
  title: "Image + text block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
    defineField({
      name: "media",
      title: "Media",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "imageLeft",
      options: {
        list: [
          { title: "Image left", value: "imageLeft" },
          { title: "Image right", value: "imageRight" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "cta" }),
  ],
});
