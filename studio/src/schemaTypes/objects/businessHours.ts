import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'businessHours',
  title: 'Business hours',
  type: 'object',
  fields: [
    defineField({
      name: 'entries',
      title: 'Hours entries',
      description: 'Add entries in the order they should be displayed.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'For example, Open daily, Lunch, Dinner, or Weekend brunch.',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'days',
              title: 'Days',
              description: 'Optional day range, such as Monday–Friday or Saturday–Sunday.',
              type: 'string',
            }),
            defineField({
              name: 'hours',
              title: 'Hours',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'note',
              title: 'Note',
              description: 'Optional service note, such as kitchen closes at 9:30 p.m.',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              days: 'days',
              hours: 'hours',
            },
            prepare({days, hours, label}) {
              return {
                title: label || 'Hours entry',
                subtitle: [days, hours].filter(Boolean).join(' • '),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'note',
      title: 'Hours note',
      description: 'Optional note about seasonal or upcoming hours changes.',
      type: 'text',
      rows: 2,
    }),
  ],
})
