import { debounce } from '@helpers/debounce'
import buildAppOnContainer from '@components/App'
import { matchIsTextEditorContainsSelection } from '@helpers/dom'
import { matchIsSelectionTextEmpty } from '@helpers/string'
import { css } from '@emotion/css'

function getTooltipClassName(domRect: DOMRect): string {
  return css`
    position: fixed;
    z-index: 9999999;
    top: ${domRect.top - 40}px;
    left: ${domRect.left}px;
    padding: 0 4px;
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 13px 7px -5px rgb(26 38 49 / 9%),
      6px 15px 34px -6px rgb(33 48 73 / 29%);
  `
}

function createTooltipElement(selection: Selection) {
  const range = selection.getRangeAt(0)
  const domRect = range.getBoundingClientRect()
  const div = document.createElement('div')
  div.textContent = 'bold'
  div.id = 'linkedin-formatter-tooltip'
  div.classList.add(getTooltipClassName(domRect))
  buildAppOnContainer(div)
  return div
}

function handleSelectText() {
  const selection = document.getSelection()
  if (!selection || matchIsSelectionTextEmpty(selection)) {
    return
  }

  const selectedText = selection.toString()
  console.log(selection, selectedText)
  const range = selection.getRangeAt(0)
  if (matchIsTextEditorContainsSelection(range)) {
    createTooltipElement(selection)
  }
}

function initTootlip() {
  document.addEventListener('selectionchange', debounce(handleSelectText, 250))
}

export { initTootlip }
