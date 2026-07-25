import {BlockContentIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'simplePortableText',
  title: 'Simple portable text',
  icon: BlockContentIcon,
  description: 'A simple text field with basic formatting and links.',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
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
