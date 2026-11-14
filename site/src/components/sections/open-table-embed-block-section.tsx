import {OpenTableButton} from '@/components/opentable-button'
import OpenTableWidget from '@/components/opentable-widget'
import {BuiText} from '@/components/ui/typography'
import type {PageSection} from '@/lib/content/types'

export function OpenTableEmbedBlockSection({section}: {section: PageSection}) {
  return (
    <>
      {section.body ? <BuiText>{section.body}</BuiText> : null}
      <div className="cta-row">
        {section.openTableDisplay === 'button' ? (
          <OpenTableButton label={section.buttonLabel || 'Reserve a table'} />
        ) : (
          <OpenTableWidget />
        )}
      </div>
    </>
  )
}
