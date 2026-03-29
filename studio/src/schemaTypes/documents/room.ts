import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'amenity' }],
        },
      ],
    }),
    defineField({
      name: 'mewsRoomCategoryId',
      title: 'Mews room category ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mewsRoomCategoryId',
      media: 'heroImage',
    },
  },
})
