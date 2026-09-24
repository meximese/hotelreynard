import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'hoursBlock',
  title: 'Hours block',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content'}),
    defineSectionTextAlignField(),
    defineField({
      name: 'entries',
      title: 'Entries',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'hours', title: 'Hours', type: 'string'},
          ],
        }),
      ],
      group: 'content',
    }),
  ],
})
