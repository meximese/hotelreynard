import { defineDocuments, defineLocations } from 'sanity/presentation'

export const locations = {
  page: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => {
      const slug = doc?.slug
      const href = !slug || slug === 'home' ? '/' : `/${slug}`

      return {
        locations: [{ title: doc?.title || 'Untitled page', href }],
      }
    },
  }),
  room: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled room',
          href: doc?.slug ? `/rooms/${doc.slug}` : '/rooms',
        },
      ],
    }),
  }),
} as const

export const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: `_type == "page" && slug.current == "home"`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
  {
    route: '/rooms/:slug',
    filter: `_type == "room" && slug.current == $slug`,
  },
])
