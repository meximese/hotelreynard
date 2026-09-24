import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  icon: CogIcon,
  description: 'Global website settings shared across the site.',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      description: 'The default site name used across the website.',
      type: 'string',
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      description: 'Optional short announcement text shown in shared site UI.',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Default search and social sharing details for the site.',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'announcement',
    },
  },
})
