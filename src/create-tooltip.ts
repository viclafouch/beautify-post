import { debounce } from '@helpers/debounce'
import ReactDOM from 'react-dom'
import buildAppOnContainer from '@components/App'
import {
  matchIsClickInside,
  matchIsTextEditorContainsSelection
} from '@helpers/dom'
import { css } from '@emotion/css'
import { matchIsSelectionTextEmpty } from '@helpers/boolean'

let currentIdentifierSelect: string | null = null
let previousContainer: HTMLDivElement | null = null

function getTooltipClassName(domRect: DOMRect): string {
  return css`
    position: fixed;
    z-index: 9999999;
    top: ${domRect.top - 40}px;
    left: ${domRect.left}px;
    padding: 0 4px;
    background-color: #ffffff;
    user-select: none;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 13px 7px -5px rgb(26 38 49 / 9%),
      6px 15px 34px -6px rgb(33 48 73 / 29%);
  `
}

function clearTooltip(container: HTMLDivElement) {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  previousContainer = null
  currentIdentifierSelect = null
}

function createTooltipOnBody(selection: Selection): HTMLDivElement {
  const range = selection.getRangeAt(0)
  const domRect = range.getBoundingClientRect()
  const container = document.createElement('div')
  container.id = 'linkedin-formatter-tooltip'
  container.classList.add(getTooltipClassName(domRect))

  function handleDocumentClick(event: MouseEvent) {
    const hasClickInside = matchIsClickInside(container, event.target)
    if (!hasClickInside) {
      document.removeEventListener('click', handleDocumentClick, false)
      clearTooltip(container)
    }
  }

  document.addEventListener('click', handleDocumentClick, false)
  document.body.appendChild(container)
  buildAppOnContainer(
    {
      selection,
      onFormat: () => clearTooltip(container)
    },
    container
  )
  return container
}

function handleSelectText() {
  const selection = document.getSelection()
  if (!selection || matchIsSelectionTextEmpty(selection)) {
    return
  }

  const range = selection.getRangeAt(0)

  if (!matchIsTextEditorContainsSelection(range)) {
    return
  }

  const identifierSelect = selection.toString()

  if (identifierSelect !== currentIdentifierSelect) {
    if (previousContainer) {
      clearTooltip(previousContainer)
    }
    currentIdentifierSelect = selection.toString()
    previousContainer = createTooltipOnBody(selection)
  }
}

function initTootlip() {
  document.addEventListener('selectionchange', debounce(handleSelectText, 250))
}

export { initTootlip }
