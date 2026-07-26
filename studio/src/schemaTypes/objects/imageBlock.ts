import {defineField, defineType} from 'sanity'
import {sectionGroupsWithMedia} from './shared/sectionGroups'

export default defineType({
  name: 'imageBlock',
  title: 'Image block',
  description: 'A simple image section with optional supporting copy.',
  type: 'object',
  groups: sectionGroupsWithMedia,
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
      description: 'Optional supporting copy shown with the image.',
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
      name: 'media',
      title: 'Image',
      description: 'The image shown in this section.',
      type: 'sectionImage',
      validation: (Rule) => Rule.required(),
      group: 'media',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      body: 'body',
      media: 'media',
    },
    prepare({body, eyebrow, media, title}) {
      return {
        title: title || eyebrow || 'Image block',
        subtitle: body ? 'Image + supporting copy' : 'Image only',
        media,
      }
    },
  },
})
