import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const value = slug?.current;
          const reserved = ["stay", "restaurant", "events", "private-events", "location", "rooms"];
          if (value && reserved.includes(value)) {
            return "This slug is reserved for a first-class route.";
          }

          return true;
        }),
    }),
    defineField({ name: "sections", title: "Sections", type: "pageSection" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
