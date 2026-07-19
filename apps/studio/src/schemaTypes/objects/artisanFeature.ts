import { defineField, defineType } from "sanity";

export default defineType({
  name: "artisanFeature",
  title: "Artisan feature",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "craft", title: "Craft", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});
