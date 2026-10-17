import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'
import {linkFields} from './shared/linkFields'

export default defineType({
  name: 'button',
  title: 'Button',
  icon: LinkIcon,
  description:
    'A reusable button that can link to internal content, a path on this website, or an external URL.',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'The button text, like a call to action.',
      type: 'string',
    }),
    ...linkFields,
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      internalTitle: 'reference.title',
      href: 'href',
      specialAction: 'specialAction',
    },
    prepare({href, internalTitle, label, linkType, specialAction}) {
      const destination =
        label ||
        internalTitle ||
        href ||
        (specialAction === 'bookingWidget'
          ? 'Booking widget'
          : specialAction === 'openTableWidget'
            ? 'OpenTable widget'
            : 'Choose a destination')

      const typeLabel =
        linkType === 'internal'
          ? 'Internal'
          : linkType === 'relative'
            ? 'Relative'
            : linkType === 'external'
              ? 'External'
              : linkType === 'special'
                ? 'Special action'
              : 'Link'

      return {
        title: destination,
        subtitle:
          label && (internalTitle || href) ? `${typeLabel} • ${internalTitle || href}` : typeLabel,
      }
    },
  },
})
