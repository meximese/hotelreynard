import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuPrice',
  title: 'Menu price',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      description: 'The numeric price, without the currency symbol.',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Optional serving or size label, such as half or whole.',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      amount: 'amount',
      label: 'label',
    },
    prepare({amount, label}) {
      return {
        title: amount != null ? `$${amount}${label ? ` / ${label}` : ''}` : 'Menu price',
      }
    },
  },
})
