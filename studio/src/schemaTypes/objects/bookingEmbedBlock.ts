import {BoltIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'bookingEmbedBlock',
  title: 'Booking embed block',
  icon: BoltIcon,
  description: 'A section for booking copy and the reusable booking button component.',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The smaller text that sits above the title to provide context.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the block.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Supporting copy shown with the booking control.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'bookingButton',
      title: 'Booking button',
      description: 'Configure the reusable booking button shown in this section.',
      type: 'bookingButton',
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      body: 'body',
      buttonLabel: 'bookingButton.label',
    },
    prepare({body, buttonLabel, eyebrow, title}) {
      return {
        title: title || eyebrow || 'Booking block',
        subtitle: buttonLabel
          ? `Booking button: ${buttonLabel}`
          : body
            ? 'Booking copy + button'
            : 'Booking button',
      }
    },
  },
})
