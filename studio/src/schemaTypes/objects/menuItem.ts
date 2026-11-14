import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The ingredients or short description shown beneath the item name.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      description: 'The standard price for this item.',
      type: 'menuPrice',
      hidden: ({parent}) => parent?.multiplePrices === true,
    }),
    defineField({
      name: 'multiplePrices',
      title: 'Multiple prices?',
      description: 'Enable this for different sizes, servings, or formats.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'prices',
      title: 'Prices',
      description: 'Add the price variants for this item.',
      type: 'array',
      of: [defineArrayMember({type: 'menuPrice'})],
      hidden: ({parent}) => parent?.multiplePrices !== true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            context.parent?.multiplePrices !== true ||
            (Array.isArray(value) && value.length > 0)
          ) {
            return true
          }

          return 'Add at least one price.'
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      description: 'description',
      price: 'price',
      multiplePrices: 'multiplePrices',
      prices: 'prices',
    },
    prepare({description, multiplePrices, price, prices, title}) {
      const priceSummary = multiplePrices
        ? Array.isArray(prices)
          ? prices
              .map((item) =>
                item?.amount != null
                  ? `$${item.amount}${item.label ? ` / ${item.label}` : ''}`
                  : '',
              )
              .filter(Boolean)
              .join(' ')
          : ''
        : price?.amount != null
          ? `$${price.amount}${price.label ? ` / ${price.label}` : ''}`
          : ''

      return {
        title: title || 'Menu item',
        subtitle: [priceSummary, description].filter(Boolean).join(' • '),
      }
    },
  },
})
