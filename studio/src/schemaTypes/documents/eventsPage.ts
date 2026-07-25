import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'eventsPage',
  title: 'Events page',
  icon: CalendarIcon,
  description: 'The landing page content for the public events page.',
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
      description: 'The hero image and optional content shown at the top of the events page.',
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
      description: 'The introductory copy for the events page. Use the Intro style when you want larger lead text.',
      type: 'standardPortableText',
      group: 'page',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Add and arrange the events page sections here.',
      type: 'pageSection',
      group: 'sections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social sharing details for the events page.',
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
        title: title || 'Events page',
        subtitle: count ? `${count} section${count === 1 ? '' : 's'}` : 'No sections yet',
        media,
      }
    },
  },
})
