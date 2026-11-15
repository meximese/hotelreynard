import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'faqBlock',
  title: 'FAQ block',
  icon: HelpCircleIcon,
  description: 'A reusable section of questions that guests can open to read the answers.',
  type: 'object',
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The smaller text that sits above the title to provide context.',
      type: 'sectionEyebrow',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the block.',
      type: 'sectionTitle',
      initialValue: 'Frequently asked questions',
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Heading alignment',
      description: 'Choose how the section heading is aligned. Questions and answers align left.',
      type: 'sectionTextAlign',
      group: 'layout',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      description: 'Add and reorder questions about arrival, parking, stairs, pets, or room arrangements.',
      type: 'array',
      of: [defineArrayMember({type: 'faqItem'})],
      group: 'content',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', questions: 'questions'},
    prepare({title, questions}) {
      const count = Array.isArray(questions) ? questions.length : 0

      return {
        title: title || 'FAQ block',
        subtitle: count ? `${count} question${count === 1 ? '' : 's'}` : 'No questions yet',
      }
    },
  },
})
