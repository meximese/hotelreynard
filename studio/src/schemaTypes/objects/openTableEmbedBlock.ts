import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'openTableEmbedBlock',
  title: 'OpenTable widget block',
  icon: CalendarIcon,
  description: 'A section with copy and a button that opens the OpenTable reservation widget.',
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
      name: 'buttonLabel',
      title: 'Button label',
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
      buttonLabel: 'buttonLabel',
    },
    prepare({buttonLabel, eyebrow, title}) {
      return {
        title: title || eyebrow || 'OpenTable widget',
        subtitle: buttonLabel || 'OpenTable reservation control',
      }
    },
  },
})
