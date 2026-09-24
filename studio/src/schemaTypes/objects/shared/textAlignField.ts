import {defineField} from 'sanity'

export const sectionTextAlignOptions = [
  {title: 'Left', value: 'left'},
  {title: 'Center', value: 'center'},
  {title: 'Right', value: 'right'},
]

export function defineSectionTextAlignField(group: string = 'layout') {
  return defineField({
    name: 'textAlign',
    title: 'Text alignment',
    type: 'string',
    initialValue: 'center',
    options: {
      list: sectionTextAlignOptions,
      layout: 'radio',
    },
    group,
  })
}
