import { buildAppOnContainer } from '@components/App'
import { matchIsTextEmpty } from '@helpers/string'
import {
  matchIsTextEditorContainsSelection,
  matchIsValidSelection
} from '@helpers/linkedin-dom'
import {
  subscribeDocumentSelection,
  SubscriptionSelection
} from '@helpers/selection'

function getNewContainerElement(): HTMLDivElement {
  const container = document.createElement('div')
  container.id = 'linkedin-formatter-tooltip'
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

    if (!matchIsTextEditorContainsSelection(selection)) {
      return
    }

    if (!matchIsValidSelection(selection)) {
      return
    }

    createTooltipOnBody(selection)
  })
}
