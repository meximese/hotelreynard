import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
  icon: DocumentTextIcon,
  description: 'A readable menu made up of ordered sections and items.',
  type: 'document',
  groups: [
    {name: 'menu', title: 'Menu', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The internal and display name for this menu.',
      type: 'string',
      group: 'menu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The path used for this menu in the website URL, if it has a dedicated page.',
      type: 'slug',
      group: 'menu',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      description: 'Optional short copy shown above the menu.',
      type: 'text',
      rows: 3,
      group: 'menu',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Add sections in the order they should appear on the menu.',
      type: 'array',
      of: [defineArrayMember({type: 'menuSection'})],
      group: 'menu',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Search and social sharing details for this menu.',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
    },
    prepare({sections, title}) {
      const sectionCount = Array.isArray(sections) ? sections.length : 0

      return {
        title: title || 'Menu',
        subtitle: `${sectionCount} section${sectionCount === 1 ? '' : 's'}`,
      }
    },
  },
})
