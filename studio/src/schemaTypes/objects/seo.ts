import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  icon: EarthGlobeIcon,
  description: 'Search engine and social sharing settings.',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      description: 'The title used in search results and browser tabs.',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      description: 'The summary shown in search results and social shares.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph image',
      description: 'The social sharing image used when this page is shared.',
      type: 'seoImage',
    }),
    defineField({
      name: 'noIndex',
      title: 'No index',
      description: 'Turn this on to ask search engines not to index this content.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
      media: 'openGraphImage',
    },
    prepare({media, subtitle, title}) {
      return {
        title: title || 'SEO settings',
        subtitle: subtitle || 'No description yet',
        media,
      }
    },
  },
})
