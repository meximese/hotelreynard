import { defineField, defineType } from "sanity";

export default defineType({
  name: "inquiryBlock",
  title: "Inquiry block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
});
