import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'callsToAction',
  title: 'Calls to action',
  description: 'Add up to two buttons.',
  type: 'array',
  of: [defineArrayMember({type: 'button'})],
  validation: (Rule) => Rule.max(2),
})
