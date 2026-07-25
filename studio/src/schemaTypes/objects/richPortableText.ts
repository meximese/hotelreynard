import {BlockContentIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'richPortableText',
  title: 'Rich portable text',
  icon: BlockContentIcon,
  description: 'Full rich text with headings, quotes, bullets, and links.',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Intro', value: 'intro'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [{type: 'link'}],
      },
    }),
  ],
})
