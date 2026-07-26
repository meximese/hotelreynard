import {EnvelopeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'inquiryBlock',
  title: 'Inquiry block',
  icon: EnvelopeIcon,
  description: 'A section for private event inquiry copy and the inquiry form.',
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
      description: 'Supporting copy shown above the inquiry form.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'callsToAction',
      title: 'Calls to action',
      description: 'Add up to two calls to action shown alongside the inquiry copy.',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      validation: (Rule) => Rule.max(2),
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
    },
    prepare({body, eyebrow, title}) {
      return {
        title: title || eyebrow || 'Inquiry block',
        subtitle: body ? 'Inquiry form + supporting copy' : 'Inquiry form',
      }
    },
  },
})
