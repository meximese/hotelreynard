import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'roomFeedBlock',
  title: 'Room feed block',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content'}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, group: 'content'}),
    defineSectionTextAlignField(),
    defineField({
      name: 'rooms',
      title: 'Rooms',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'room'}],
        }),
      ],
      group: 'content',
    }),
  ],
})
