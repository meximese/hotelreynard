import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home page',
  icon: HomeIcon,
  description: 'The main homepage content and section order for the website.',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'page', title: 'Page'},
    {name: 'sections', title: 'Sections'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Top hero',
      description: 'The hero image and optional content shown at the top of the homepage.',
      type: 'heroBlock',
      group: 'hero',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The internal title for this page.',
      type: 'string',
      group: 'page',
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page intro',
      description: 'The introductory copy for the homepage. Use the Intro style when you want larger lead text.',
      type: 'standardPortableText',
      group: 'page',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Add and arrange the homepage sections here.',
      type: 'pageSection',
      group: 'sections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social sharing details for the homepage.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
      media: 'hero.media',
    },
    prepare({media, sections, title}) {
      const count = Array.isArray(sections) ? sections.length : 0

      return {
        title: title || 'Home page',
        subtitle: count ? `${count} section${count === 1 ? '' : 's'}` : 'No sections yet',
        media,
      }
    },
  },
})
