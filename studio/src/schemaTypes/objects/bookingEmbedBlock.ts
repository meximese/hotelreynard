import { defineField, defineType } from "sanity";

export default defineType({
  name: "bookingEmbedBlock",
  title: "Booking embed block",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
});
