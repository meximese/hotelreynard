import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero block',
  type: 'object',
  groups: [
    {name: 'media', title: 'Media', default: true},
    {name: 'content', title: 'Call to Action'},
  ],
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      group: 'media',
    }),
    defineField({
      name: 'mobileMedia',
      title: 'Mobile media',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      description: 'Optional alternate image used for the page-level hero on smaller screens.',
      group: 'media',
    }),
    defineField({name: 'caption', title: 'Caption', type: 'text', rows: 1, group: 'media'}),
    defineField({
      name: 'enableContent',
      title: 'Show Call to Action',
      type: 'boolean',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta', group: 'content'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'cta', group: 'content'}),
  ],
})
