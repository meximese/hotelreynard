import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote block',
  description: 'A highlighted quote with optional attribution.',
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
      description: 'An optional heading for the quote section.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      description: 'The quoted text you want to highlight.',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      description: 'Who said the quote, or where it came from.',
      type: 'string',
      group: 'content',
    }),
    defineSectionTextAlignField(),
  ],
  preview: {
    select: {
      title: 'title',
      quote: 'quote',
      attribution: 'attribution',
    },
    prepare({attribution, quote, title}) {
      return {
        title: title || quote || 'Quote block',
        subtitle: attribution || 'Quote',
      }
    },
  },
})
