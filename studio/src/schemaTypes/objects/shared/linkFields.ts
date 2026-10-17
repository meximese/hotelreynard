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
  {title: 'Special Actions', value: 'special'},
]

export const specialActionOptions = [
  {title: 'Booking widget', value: 'bookingWidget'},
  {title: 'OpenTable widget', value: 'openTableWidget'},
]

export const linkFields = [
  defineField({
    name: 'linkType',
    title: 'Link type',
    description:
      'Choose a link destination or a special action widget.',
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
    hidden: ({parent}) => parent?.linkType === 'internal' || parent?.linkType === 'special',
  }),
  defineField({
    name: 'specialAction',
    title: 'Special action',
    description: 'Choose an interactive widget to render instead of a link.',
    type: 'string',
    options: {
      list: specialActionOptions,
    },
    hidden: ({parent}) => parent?.linkType !== 'special',
    validation: (Rule) =>
      Rule.custom((value, context) =>
        context.parent?.linkType === 'special' && !value ? 'Choose a special action.' : true,
      ),
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
