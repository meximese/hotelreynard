import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {defineField, defineType} from 'sanity'
import {sectionGroups} from './shared/sectionGroups'

export default defineType({
  name: 'inquiryBlock',
  title: 'Inquiry block',
  icon: EnvelopeIcon,
  description: 'A section for private event inquiry copy and the inquiry form.',
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
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Supporting copy shown above the inquiry form.',
      type: 'sectionBody',
      group: 'content',
    }),
    defineField({
      name: 'callsToAction',
      title: 'Calls to action',
      description: 'Add up to two calls to action shown alongside the inquiry copy.',
      type: 'callsToAction',
      group: 'content',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text alignment',
      type: 'sectionTextAlign',
      group: 'layout',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      body: 'body',
    },
    prepare({body, eyebrow, title}) {
      return {
        title: title || eyebrow || 'Inquiry block',
        subtitle: body ? 'Inquiry form + supporting copy' : 'Inquiry form',
      }
    },
  },
})
