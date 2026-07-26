import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroupsWithMedia} from './shared/sectionGroups'

export default defineType({
  name: 'heroBlock',
  title: 'Hero block',
  icon: ImageIcon,
  description: 'The hero media and optional copy shown at the top of a page.',
  type: 'object',
  groups: sectionGroupsWithMedia,
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      description: 'The main image shown in the hero area.',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      group: 'media',
    }),
    defineField({
      name: 'mobileMedia',
      title: 'Mobile media',
      description: 'Optional alternate image used for the page-level hero on smaller screens.',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
      group: 'media',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Optional small text used as an image caption.',
      type: 'text',
      rows: 1,
      group: 'media',
    }),
    defineField({
      name: 'enableContent',
      title: 'Show hero content',
      description: 'Turn this on to show the hero title and body on top of the image.',
      type: 'boolean',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The main hero title shown over the image when hero content is enabled.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Supporting copy shown in the hero when hero content is enabled.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'callsToAction',
      title: 'Calls to action',
      description: 'Add up to two calls to action shown with the hero content.',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      validation: (Rule) => Rule.max(2),
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
  ],
  preview: {
    select: {
      title: 'title',
      caption: 'caption',
      body: 'body',
      media: 'media',
      enableContent: 'enableContent',
    },
    prepare({body, caption, enableContent, media, title}) {
      return {
        title: title || caption || 'Hero block',
        subtitle: enableContent
          ? body
            ? 'Hero content enabled'
            : 'Hero content enabled, no body yet'
          : 'Image-focused hero',
        media,
      }
    },
  },
})
