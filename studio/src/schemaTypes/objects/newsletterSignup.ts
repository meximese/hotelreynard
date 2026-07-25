import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterSignup',
  title: 'Newsletter signup',
  icon: EnvelopeIcon,
  description: 'A reusable newsletter form that renders the website signup component.',
  type: 'object',
  fields: [
    defineField({
      name: 'showLabel',
      title: 'Show label',
      description: 'Turn this on to show the small label above the email field.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank you message',
      description: 'The message shown after someone successfully signs up.',
      type: 'string',
    }),
    defineField({
      name: 'successRedirect',
      title: 'Redirect on success',
      description: 'Optionally send someone to another page after a successful signup.',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      showLabel: 'showLabel',
      thankYouMessage: 'thankYouMessage',
    },
    prepare({showLabel, thankYouMessage}) {
      return {
        title: 'Newsletter signup',
        subtitle: thankYouMessage
          ? 'Custom thank you message'
          : showLabel
            ? 'Shows label'
            : 'Minimal form',
      }
    },
  },
})
