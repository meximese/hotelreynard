import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seoImage',
  title: 'SEO image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      description: 'Describe the image for accessibility and screen readers.',
      type: 'string',
    }),
  ],
})
