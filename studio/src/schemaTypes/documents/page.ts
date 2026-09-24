import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  icon: DocumentTextIcon,
  description: 'A flexible page for editorial or secondary website content.',
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
      description: 'The hero image and optional content shown at the top of the page.',
      type: 'heroBlock',
      group: 'hero',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The page title used in the editor and on the website.',
      type: 'string',
      group: 'page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The path used for this page in the website URL.',
      type: 'slug',
      group: 'page',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const value = slug?.current
          const reserved = ['events', 'rooms']
          if (value && reserved.includes(value)) {
            return 'This slug is reserved for a first-class route.'
          }

          return true
        }),
    }),
    defineField({
      name: 'pageIntro',
      title: 'Page intro',
      description: 'The introductory copy for this page. Use the Intro style when you want larger lead text.',
      type: 'standardPortableText',
      group: 'page',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Add and arrange the sections for this page here.',
      type: 'pageSection',
      group: 'sections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social sharing details for this page.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      sections: 'sections',
      media: 'hero.media',
    },
    prepare({media, sections, slug, title}) {
      const count = Array.isArray(sections) ? sections.length : 0

      return {
        title: title || slug || 'Page',
        subtitle: slug ? `/${slug} • ${count} section${count === 1 ? '' : 's'}` : `${count} section${count === 1 ? '' : 's'}`,
        media,
      }
    },
  },
})
