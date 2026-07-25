import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'eventFeedBlock',
  title: 'Event feed block',
  description: 'A section that shows upcoming events from the event content type.',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The smaller text that sits above the title to provide context.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the block.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Optional supporting copy shown above the event feed.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineSectionTextAlignField(),
    defineField({
      name: 'limit',
      title: 'Limit',
      description: 'How many upcoming events to show.',
      type: 'number',
      initialValue: 3,
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      limit: 'limit',
    },
    prepare({eyebrow, limit, title}) {
      return {
        title: title || eyebrow || 'Event feed block',
        subtitle: `${limit || 3} upcoming event${limit === 1 ? '' : 's'}`,
      }
    },
  },
})
