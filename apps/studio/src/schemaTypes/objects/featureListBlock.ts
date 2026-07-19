import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'featureListBlock',
  title: 'Feature list block',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content'}),
    defineSectionTextAlignField(),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'content',
    }),
  ],
})
