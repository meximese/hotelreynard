import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'richTextBlock',
  title: 'Rich text block',
  icon: BlockContentIcon,
  description: 'A section for longer formatted text with headings, links, and simple lists.',
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
      name: 'textAlign',
      title: 'Text alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      group: 'layout',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description: 'Large body text with headings, links, quotes, and bullet points.',
      type: 'richPortableText',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      content: 'content',
    },
    prepare({content, eyebrow, title}) {
      const blockCount = Array.isArray(content) ? content.length : 0

      return {
        title: title || eyebrow || 'Rich text block',
        subtitle: blockCount ? `${blockCount} content block${blockCount === 1 ? '' : 's'}` : 'No content yet',
      }
    },
  },
})
