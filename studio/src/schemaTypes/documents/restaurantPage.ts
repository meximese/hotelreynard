import {BookIcon} from '@sanity/icons/Book'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurantPage',
  title: 'Restaurant page',
  icon: BookIcon,
  description: 'The core restaurant page, including its child menus and page sections.',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'page', title: 'Page'},
    {name: 'menus', title: 'Menus'},
    {name: 'sections', title: 'Sections'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Top hero',
      description: 'The hero image and optional content shown at the top of the restaurant page.',
      type: 'heroBlock',
      group: 'hero',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The restaurant page title.',
      type: 'string',
      group: 'page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page intro',
      description: 'The introductory copy for the restaurant page.',
      type: 'standardPortableText',
      group: 'page',
    }),
    defineField({
      name: 'menus',
      title: 'Menus',
      description: 'Choose and order the menus shown as child pages of the restaurant.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'menu'}],
          options: {disableNew: true},
        }),
      ],
      group: 'menus',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Add and arrange the sections for the restaurant page.',
      type: 'pageSection',
      group: 'sections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social sharing details for the restaurant page.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      menus: 'menus',
      media: 'hero.media',
    },
    prepare({media, menus, title}) {
      const count = Array.isArray(menus) ? menus.length : 0

      return {
        title: title || 'Restaurant',
        subtitle: `${count} menu${count === 1 ? '' : 's'}`,
        media,
      }
    },
  },
})
