import { debounce } from '@helpers/debounce'
import buildAppOnContainer from '@components/App'
import { css } from '@emotion/css'
import { matchIsTextEmpty } from '@helpers/string'
import { matchIsTextEditorContainsSelection } from '@helpers/linkedin-dom'

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

function createTooltipOnBody(selection: Selection) {
  const range = selection.getRangeAt(0)
  const domRect = range.getBoundingClientRect()
  const container = document.createElement('div')
  container.id = 'linkedin-formatter-tooltip'
  container.classList.add(getTooltipClassName(domRect))
  document.body.appendChild(container)
  buildAppOnContainer({ selection }, container)
}

function handleSelectText() {
  const selection = document.getSelection()
  if (!selection || matchIsTextEmpty(selection.toString())) {
    return
  }
  if (!matchIsTextEditorContainsSelection(selection)) {
    return
  }
  createTooltipOnBody(selection)
}

function initTootlip() {
  document.addEventListener('selectionchange', debounce(handleSelectText, 250))
}

export { initTootlip }
