import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'imageTextBlock',
  title: 'Image + text block',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 5, group: 'content'}),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      group: 'content',
    }),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta', group: 'content'}),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'imageLeft',
      options: {
        list: [
          {title: 'Image left', value: 'imageLeft'},
          {title: 'Image right', value: 'imageRight'},
          {title: 'Image top', value: 'imageTop'},
          {title: 'Image bottom', value: 'imageBottom'},
        ],
        layout: 'radio',
      },
      group: 'layout',
    }),
    defineSectionTextAlignField(),
  ],
})
