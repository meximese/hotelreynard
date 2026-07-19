import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Intro'},
    {name: 'sections', title: 'Sections'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'hero', title: 'Top hero', type: 'heroBlock', group: 'hero'}),
    defineField({name: 'title', title: 'Title', type: 'string', group: 'intro'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 4, group: 'intro'}),
    defineField({name: 'primaryCta', title: 'Primary CTA', type: 'cta', group: 'intro'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'cta', group: 'intro'}),
    defineField({name: 'sections', title: 'Sections', type: 'pageSection', group: 'sections'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
})
