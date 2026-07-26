import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'imageTextBlock',
  title: 'Image + text block',
  icon: ImageIcon,
  description: 'A split section with an image and supporting text content.',
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
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Supporting copy shown next to the image.',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      description: 'The image shown alongside the text.',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      group: 'content',
    }),
    defineField({
      name: 'callsToAction',
      title: 'Calls to action',
      description: 'Add up to two calls to action shown with the text content.',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      validation: (Rule) => Rule.max(2),
      group: 'content',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      description: 'Choose how the image and text should be arranged.',
      type: 'string',
      initialValue: 'imageLeft',
      options: {
        list: [
          {title: 'Image left', value: 'imageLeft'},
          {title: 'Image right', value: 'imageRight'},
          {title: 'Image top', value: 'imageTop'},
          {title: 'Image bottom', value: 'imageBottom'},
        ],
        layout: 'radio',
      },
      group: 'layout',
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
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      body: 'body',
      layout: 'layout',
      media: 'media',
    },
    prepare({body, eyebrow, layout, media, title}) {
      const layoutLabel =
        layout === 'imageRight'
          ? 'Image right'
          : layout === 'imageTop'
            ? 'Image top'
            : layout === 'imageBottom'
              ? 'Image bottom'
              : 'Image left'

      return {
        title: title || eyebrow || 'Image + text block',
        subtitle: body ? layoutLabel : `${layoutLabel} • no body yet`,
        media,
      }
    },
  },
})
