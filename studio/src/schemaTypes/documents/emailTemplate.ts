import { defineField, defineType } from 'sanity'

const templateKeys = [
  { title: 'Contact auto reply', value: 'contact-auto-reply' },
  { title: 'Contact internal inquiry', value: 'contact-internal-inquiry' },
]

const tokenHint =
  'Available tokens: {firstName}, {lastName}, {email}, {phone}, {contactReason}, {message}, {hotelName}'

export default defineType({
  name: 'emailTemplate',
  title: 'Email template',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Template key',
      type: 'string',
      options: {
        list: templateKeys,
        layout: 'radio',
      },
      description: 'Used by the app to choose which transactional email copy to load.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject line',
      type: 'string',
      description: tokenHint,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewText',
      title: 'Preview text',
      type: 'string',
      description: tokenHint,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailTitle',
      title: 'Email title',
      type: 'string',
      description: tokenHint,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description: tokenHint,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: `${tokenHint}. Layout stays in code; this field controls editable copy blocks.`,
    }),
    defineField({
      name: 'outro',
      title: 'Outro',
      type: 'text',
      rows: 3,
      description: tokenHint,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'key',
    },
  },
})
