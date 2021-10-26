import { debounce } from '@helpers/debounce'
import { buildAppOnContainer } from '@components/App'
import { matchIsTextEmpty } from '@helpers/string'
import {
  matchIsTextEditorContainsSelection,
  matchIsValidSelection
} from '@helpers/linkedin-dom'

function getNewContainerElement(): HTMLDivElement {
  const container = document.createElement('div')
  container.id = 'linkedin-formatter-tooltip'
  container.setAttribute('role', 'tooltip')
  return container
}

function createTooltipOnBody(selection: Selection) {
  const container = getNewContainerElement()
  document.body.appendChild(container)
  buildAppOnContainer({ selection }, container)
}

function handleSelectText() {
  const selection = document.getSelection()
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
}

const handleSelectDebounced = debounce(handleSelectText, 250)

function subscribeSelectionChange() {
  document.addEventListener('selectionchange', handleSelectDebounced)
}

function unsubscribeSelectionChange() {
  document.removeEventListener('selectionchange', handleSelectDebounced)
}

export { subscribeSelectionChange, unsubscribeSelectionChange }
