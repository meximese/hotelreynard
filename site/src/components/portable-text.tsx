import type {PortableTextComponents} from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  block: {
    intro: ({children}) => <p className="type-intro">{children}</p>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
}
