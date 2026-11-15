import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ item',
  icon: HelpCircleIcon,
  description: 'A question and its answer for a frequently asked questions section.',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      description: 'The question guests can open to read the answer.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      description: 'The answer, with basic formatting and links to contact details or other pages.',
      type: 'simplePortableText',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'question', subtitle: 'answer.0.children.0.text'},
    prepare({title, subtitle}) {
      return {title: title || 'New question', subtitle}
    },
  },
})
