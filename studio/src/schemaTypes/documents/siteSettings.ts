import {CogIcon} from '@sanity/icons'
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
      name: 'booking',
      title: 'Booking settings',
      description: 'Shared booking widget settings used by booking controls across the site.',
      type: 'object',
      fields: [
        defineField({
          name: 'widgetProvider',
          title: 'Widget provider',
          description: 'The booking system provider name.',
          type: 'string',
        }),
        defineField({
          name: 'widgetConfigurationId',
          title: 'Widget configuration ID',
          description: 'The booking widget configuration ID used by the website.',
          type: 'string',
        }),
        defineField({
          name: 'defaultCtaLabel',
          title: 'Default button label',
          description: 'Fallback text for booking buttons when no custom label is provided.',
          type: 'string',
        }),
      ],
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
