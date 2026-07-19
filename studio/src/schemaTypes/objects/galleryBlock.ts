import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'
import {defineSectionTextAlignField} from './shared/textAlignField'

export default defineType({
  name: 'galleryBlock',
  title: 'Gallery',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'displayMode',
      title: 'Display mode',
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
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content'}),
    defineField({
      name: 'showGalleryHeader',
      title: 'Show gallery header',
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
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alternative text', type: 'string'},
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
    defineSectionTextAlignField(),
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
