import {defineType} from 'sanity'

export default defineType({
  name: 'sectionTextAlign',
  title: 'Section text alignment',
  type: 'string',
  initialValue: 'center',
  options: {
    list: [
      {title: 'Left', value: 'left'},
      {title: 'Center', value: 'center'},
      {title: 'Right', value: 'right'},
    ],
    layout: 'radio',
  },
})
