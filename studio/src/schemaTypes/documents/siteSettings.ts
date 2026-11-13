import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  icon: CogIcon,
  description: 'Global website settings shared across the site.',
  type: 'document',
  groups: [
    {name: 'site', title: 'Site', default: true},
    {name: 'hotel', title: 'Hotel'},
    {name: 'restaurant', title: 'Restaurant'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      description: 'The default site name used across the website.',
      type: 'string',
      group: 'site',
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      description: 'Optional short announcement text shown in shared site UI.',
      type: 'string',
      group: 'site',
    }),
    defineField({
      name: 'hotel',
      title: 'Hotel details',
      description: 'Public-facing hotel contact details, hours, and social links.',
      type: 'businessDetails',
      group: 'hotel',
    }),
    defineField({
      name: 'restaurant',
      title: 'Restaurant details',
      description: 'Public-facing restaurant contact details, service hours, and social links.',
      type: 'businessDetails',
      group: 'restaurant',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Default search and social sharing details for the site.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'announcement',
    },
  },
})
