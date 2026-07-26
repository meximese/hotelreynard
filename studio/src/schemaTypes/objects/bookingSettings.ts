import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookingSettings',
  title: 'Booking settings',
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
})
