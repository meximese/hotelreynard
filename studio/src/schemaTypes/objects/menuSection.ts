import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuSection',
  title: 'Menu section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'For example, First, Mains, Sides, Cocktails, or Wine.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional note or introduction for this section.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({type: 'menuItem'})],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({items, title}) {
      const count = Array.isArray(items) ? items.length : 0

      return {
        title: title || 'Menu section',
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
