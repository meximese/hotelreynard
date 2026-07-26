import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'displayMode',
      title: 'Display mode',
      description: 'Choose how this gallery should be laid out on the website.',
      type: 'string',
      initialValue: 'grid',
      options: {
        layout: 'radio',
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Vertical', value: 'vertical'},
          {title: 'Custom', value: 'custom'},
          {title: 'Sticky scroll', value: 'stickyScroll'},
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'layout',
    }),
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
      name: 'showGalleryHeader',
      title: 'Show gallery header',
      description: 'Turn this on to show the eyebrow and title above the gallery.',
      type: 'boolean',
      initialValue: false,
      group: 'layout',
    }),
    defineField({
      name: 'showGalleryProgress',
      title: 'Show gallery progress',
      description: 'Used by sticky scroll galleries.',
      type: 'boolean',
      initialValue: true,
      group: 'layout',
      hidden: ({parent}) => parent?.displayMode !== 'stickyScroll',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Add the images for this gallery here.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alternative text',
              description: 'Describe the image for accessibility and screen readers.',
              type: 'string',
            },
            {
              name: 'fullWidth',
              title: 'Full width / wide',
              description:
                'Breaks the gallery row and uses the wider hero-style width where supported.',
              type: 'boolean',
              initialValue: false,
              options: {
                layout: 'checkbox',
              },
            },
            {
              name: 'layout',
              title: 'Custom layout',
              description: 'Used by Custom galleries. Full width / wide overrides this.',
              type: 'string',
              initialValue: 'center',
              options: {
                layout: 'radio',
                list: [
                  {title: 'Centered', value: 'center'},
                  {title: '2-Column', value: 'half'},
                ],
              },
            },
          ],
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'sectionTextAlign',
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      displayMode: 'displayMode',
      media: 'images.0',
    },
    prepare({title, displayMode, media}) {
      const modeLabels: Record<string, string> = {
        grid: 'Grid',
        vertical: 'Vertical',
        custom: 'Custom',
        stickyScroll: 'Sticky scroll',
      }

      return {
        title: title || 'Gallery',
        subtitle: modeLabels[displayMode] || 'Gallery',
        media,
      }
    },
  },
})
