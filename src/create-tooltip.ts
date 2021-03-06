import { buildAppOnContainer } from '@components/App'
import {
  matchIsTextEditorContainsSelection,
  matchIsTypeAheadExists,
  matchIsValidSelection
} from '@helpers/linkedin-dom'
import {
  subscribeDocumentSelection,
  SubscriptionSelection
} from '@helpers/selection'
import { matchIsTextEmpty } from '@helpers/string'

function getNewContainerElement(): HTMLDivElement {
  const container = document.createElement('div')
  container.id = 'beautify-post-tooltip'
  container.setAttribute('role', 'tooltip')
  return container
}

function createTooltipOnBody(selection: Selection): void {
  const container = getNewContainerElement()
  document.body.appendChild(container)
  buildAppOnContainer({ selection }, container)
}

export function subscribeSelectionChange(): SubscriptionSelection {
  return subscribeDocumentSelection((selection: Selection | null) => {
    if (!selection?.rangeCount || matchIsTextEmpty(selection.toString())) {
      return
    }

    if (matchIsTypeAheadExists()) {
      return
    }

    if (!matchIsTextEditorContainsSelection(selection)) {
      return
    }

    if (!matchIsValidSelection(selection)) {
      return
    }

    createTooltipOnBody(selection)
  })
}
