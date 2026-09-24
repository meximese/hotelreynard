import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'roomFeedBlock',
  title: 'Room feed block',
  description: 'A curated list of rooms shown as a feed section.',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The smaller text that sits above the title to provide context.',
      type: 'sectionEyebrow',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the block.',
      type: 'sectionTitle',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Optional supporting copy shown above the room feed.',
      type: 'sectionBody',
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'sectionTextAlign',
      group: 'layout',
    }),
    defineField({
      name: 'rooms',
      title: 'Rooms',
      description: 'Choose the rooms to feature in this section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'room'}],
        }),
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      rooms: 'rooms',
    },
    prepare({eyebrow, rooms, title}) {
      const count = Array.isArray(rooms) ? rooms.length : 0

      return {
        title: title || eyebrow || 'Room feed block',
        subtitle: count ? `${count} room${count === 1 ? '' : 's'}` : 'No rooms selected',
      }
    },
  },
})
