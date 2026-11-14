import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'openTableEmbedBlock',
  title: 'OpenTable widget block',
  icon: CalendarIcon,
  description: 'A section with copy and an inline OpenTable widget or reservation button.',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'sectionEyebrow',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'sectionTitle',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Supporting copy shown with the OpenTable control.',
      type: 'sectionBody',
      group: 'content',
    }),
    defineField({
      name: 'openTableDisplay',
      title: 'Reservation display',
      type: 'string',
      initialValue: 'widget',
      options: {
        layout: 'radio',
        list: [
          {title: 'Inline widget', value: 'widget'},
          {title: 'Button that opens the reservation modal', value: 'button'},
        ],
      },
      group: 'content',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button label',
      hidden: ({parent}) => parent?.openTableDisplay !== 'button',
      type: 'string',
      initialValue: 'Reserve a table',
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'sectionTextAlign',
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      openTableDisplay: 'openTableDisplay',
    },
    prepare({eyebrow, title, openTableDisplay}) {
      return {
        title: title || eyebrow || 'OpenTable widget',
        subtitle: openTableDisplay === 'button'
          ? 'OpenTable reservation button'
          : 'Inline OpenTable reservation widget',
      }
    },
  },
})
