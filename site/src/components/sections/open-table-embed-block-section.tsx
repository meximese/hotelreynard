import {OpenTableButton} from '@/components/opentable-button'
import {BuiText} from '@/components/ui/typography'
import type {PageSection} from '@/lib/content/types'

export function OpenTableEmbedBlockSection({section}: {section: PageSection}) {
  return (
    <>
      {section.body ? <BuiText>{section.body}</BuiText> : null}
      <div className="cta-row">
        <OpenTableButton label={section.buttonLabel || 'Reserve a table'} />
      </div>
    </>
  )
}
