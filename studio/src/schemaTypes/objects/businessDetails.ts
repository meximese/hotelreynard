import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'businessDetails',
  title: 'Business details',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({name: 'street', title: 'Street', type: 'string'}),
        defineField({name: 'locality', title: 'City / locality', type: 'string'}),
        defineField({name: 'region', title: 'State / region', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal code', type: 'string'}),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'businessHours',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
  ],
})
