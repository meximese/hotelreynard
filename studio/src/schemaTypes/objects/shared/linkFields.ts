import {defineField} from 'sanity'

export const internalLinkTargetTypes = [
  {type: 'homePage'},
  {type: 'eventsPage'},
  {type: 'page'},
  {type: 'event'},
  {type: 'room'},
]

export const linkTypeOptions = [
  {title: 'Internal reference', value: 'internal'},
  {title: 'Relative path', value: 'relative'},
  {title: 'External URL', value: 'external'},
]

export const linkFields = [
  defineField({
    name: 'label',
    title: 'Label',
    description: 'The text shown for this link when it is used as a button or call to action.',
    type: 'string',
  }),
  defineField({
    name: 'linkType',
    title: 'Link type',
    description: 'Choose whether this links to another item in Sanity, a path on this website, or another website.',
    type: 'string',
    initialValue: 'internal',
    options: {
      layout: 'radio',
      list: linkTypeOptions,
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'reference',
    title: 'Reference',
    description: 'Choose another page or content item from this website.',
    type: 'reference',
    to: [...internalLinkTargetTypes],
    hidden: ({parent}) => parent?.linkType !== 'internal',
  }),
  defineField({
    name: 'href',
    title: 'URL or path',
    description:
      'Use a path like /events for this website, or a full URL like https://example.com for another website.',
    type: 'string',
    hidden: ({parent}) => parent?.linkType === 'internal',
  }),
  defineField({
    name: 'openInNewTab',
    title: 'Open in new tab',
    description: 'Turn this on when you want to open the destination in a new browser tab.',
    type: 'boolean',
    initialValue: false,
    hidden: ({parent}) => parent?.linkType !== 'external',
  }),
]
