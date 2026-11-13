import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Optional accessible label or account name.',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      label: 'label',
      url: 'url',
    },
    prepare({label, platform, url}) {
      return {
        title: label || platform || 'Social link',
        subtitle: url,
      }
    },
  },
})
