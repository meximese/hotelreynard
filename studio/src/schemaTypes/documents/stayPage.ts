import { defineField, defineType } from "sanity";

export default defineType({
  name: "stayPage",
  title: "Stay page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "featuredRooms",
      title: "Featured rooms",
      type: "array",
      of: [{ type: "reference", to: [{ type: "room" }] }],
    }),
    defineField({ name: "sections", title: "Sections", type: "pageSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
