import {BoltIcon} from '@sanity/icons/Bolt'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookingButton',
  title: 'Booking button',
  icon: BoltIcon,
  description: 'A reusable booking button that renders the website booking component.',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'The text shown on the booking button.',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({label}) {
      return {
        title: label || 'Booking button',
        subtitle: 'Booking control',
      }
    },
  },
})
