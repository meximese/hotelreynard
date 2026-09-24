import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'pageSection',
  title: 'Page sections',
  description: 'Add and arrange the sections that make up this page.',
  type: 'array',
  of: [
    defineArrayMember({type: 'galleryBlock'}),
    defineArrayMember({type: 'imageBlock'}),
    defineArrayMember({type: 'imageTextBlock'}),
    defineArrayMember({type: 'quoteBlock'}),
    defineArrayMember({type: 'roomFeedBlock'}),
    defineArrayMember({type: 'bookingEmbedBlock'}),
    defineArrayMember({type: 'newsletterSignup'}),
    defineArrayMember({type: 'eventFeedBlock'}),
    defineArrayMember({type: 'inquiryBlock'}),
    defineArrayMember({type: 'richTextBlock'}),
  ],
})
