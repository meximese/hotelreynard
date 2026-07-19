import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'pageSection',
  title: 'Page sections',
  type: 'array',
  of: [
    defineArrayMember({type: 'galleryBlock'}),
    defineArrayMember({type: 'imageBlock'}),
    defineArrayMember({type: 'imageTextBlock'}),
    defineArrayMember({type: 'quoteBlock'}),
    defineArrayMember({type: 'roomFeedBlock'}),
    defineArrayMember({type: 'featureListBlock'}),
    defineArrayMember({type: 'bookingEmbedBlock'}),
    defineArrayMember({type: 'eventFeedBlock'}),
    defineArrayMember({type: 'hoursBlock'}),
    defineArrayMember({type: 'inquiryBlock'}),
    defineArrayMember({type: 'richTextBlock'}),
  ],
})
