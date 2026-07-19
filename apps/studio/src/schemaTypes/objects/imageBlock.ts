import {defineField, defineType} from 'sanity'
import {sectionGroupsWithMedia} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'imageBlock',
  title: 'Image block',
  type: 'object',
  groups: sectionGroupsWithMedia,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content'}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, group: 'content'}),
    defineSectionTextAlignField(),
    defineField({
      name: 'media',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),
  ],
})
