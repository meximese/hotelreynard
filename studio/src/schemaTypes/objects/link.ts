import {LinkIcon} from '@sanity/icons/Link'
import {defineType} from 'sanity'
import {linkFields} from './shared/linkFields'

export default defineType({
  name: 'link',
  title: 'Link',
  icon: LinkIcon,
  description:
    'A reusable link that can point to internal content, a path on this website, or an external URL.',
  type: 'object',
  fields: linkFields,
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      internalTitle: 'reference.title',
      href: 'href',
    },
    prepare({href, internalTitle, label, linkType}) {
      const destination = label || internalTitle || href || 'Choose a destination'

      const typeLabel =
        linkType === 'internal'
          ? 'Internal'
          : linkType === 'relative'
            ? 'Relative'
            : linkType === 'external'
              ? 'External'
              : 'Link'

      return {
        title: destination,
        subtitle:
          label && (internalTitle || href) ? `${typeLabel} • ${internalTitle || href}` : typeLabel,
      }
    },
  },
})
