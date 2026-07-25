import {BlockContentIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'standardPortableText',
  title: 'Standard portable text',
  icon: BlockContentIcon,
  description: 'Standard text with a small set of heading options, bullets, and links.',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Intro', value: 'intro'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
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
