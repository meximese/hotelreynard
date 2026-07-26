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
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                description: 'Optional link text for cases where the renderer uses it.',
                type: 'string',
              },
              {
                name: 'linkType',
                title: 'Link type',
                description:
                  'Choose whether this links to another item in Sanity, a path on this website, or another website.',
                type: 'string',
                initialValue: 'internal',
                options: {
                  layout: 'radio',
                  list: [
                    {title: 'Internal reference', value: 'internal'},
                    {title: 'Relative path', value: 'relative'},
                    {title: 'External URL', value: 'external'},
                  ],
                },
              },
              {
                name: 'reference',
                title: 'Reference',
                description: 'Choose another page or content item from this website.',
                type: 'reference',
                to: [
                  {type: 'homePage'},
                  {type: 'eventsPage'},
                  {type: 'page'},
                  {type: 'event'},
                  {type: 'room'},
                ],
              },
              {
                name: 'href',
                title: 'URL or path',
                description:
                  'Use a path like /events for this website, or a full URL like https://example.com for another website.',
                type: 'string',
              },
              {
                name: 'openInNewTab',
                title: 'Open in new tab',
                description:
                  'Turn this on when you want to open the destination in a new browser tab.',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
  ],
})
