import { defineField, defineType } from "sanity";

export default defineType({
  name: "restaurantPage",
  title: "Restaurant page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Top hero", type: "heroBlock" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({ name: "sections", title: "Sections", type: "pageSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
