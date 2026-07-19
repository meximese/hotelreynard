import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'quoteBlock',
  title: 'Quote block',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content'}),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({name: 'attribution', title: 'Attribution', type: 'string', group: 'content'}),
    defineSectionTextAlignField(),
  ],
})
