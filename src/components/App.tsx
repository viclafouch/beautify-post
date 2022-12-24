/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { FormatType } from '@constants/format-type'
import { BUTTON_HEIGHT, SPACING_ABOVE_SELECTION } from '@constants/style'
import { css } from '@emotion/css'
import {
  matchIsKeyboardEventBold,
  matchIsKeyboardEventItalic
} from '@helpers/keyboard'
import { getModalContent } from '@helpers/linkedin-dom'
import { formatSelectionByType } from '@helpers/selection'
import Tooltip from './Tooltip/tooltip'

type InitialProps = {
  selection: Selection
}

const tooltipClassName = css`
  position: fixed;
  z-index: 9999999;
  padding: 0 4px;
  background-color: #ffffff;
  user-select: none;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  box-shadow: 0 13px 7px -5px rgb(26 38 49 / 9%),
    6px 15px 34px -6px rgb(33 48 73 / 29%);
`

function initContainerStyles(
  selection: Selection,
  container: HTMLDivElement
): void {
  const range = selection.getRangeAt(0)
  const clientRectOfRange = range.getBoundingClientRect()
  const modalContent = getModalContent() as Element
  const minTop = modalContent.getBoundingClientRect().top
  let top = clientRectOfRange.top < minTop ? minTop : clientRectOfRange.top
  top = top - BUTTON_HEIGHT - SPACING_ABOVE_SELECTION
  container.setAttribute('class', tooltipClassName)
  // eslint-disable-next-line no-param-reassign
  container.style.top = `${top}px`
  // eslint-disable-next-line no-param-reassign
  container.style.left = `${clientRectOfRange.left}px`
}

let currentRoot: null | ReactDOM.Root = null
let currentContainer: null | HTMLDivElement = null
let currentSelection: null | Selection = null

function handleKeyDown(event: KeyboardEvent): void {
  if (matchIsKeyboardEventBold(event) && currentSelection) {
    event.stopPropagation()
    formatSelectionByType(currentSelection, FormatType.bold)
  }
  if (matchIsKeyboardEventItalic(event) && currentSelection) {
    event.stopPropagation()
    formatSelectionByType(currentSelection, FormatType.italic)
  }
  clearCurrentAppContainer()
}

export function clearCurrentAppContainer(): void {
  currentRoot?.unmount()
  currentContainer?.remove()
  currentRoot = null
  currentContainer = null
  window.removeEventListener('keydown', handleKeyDown, false)
  currentSelection = null
}

export function buildAppOnContainer(
  initialProps: InitialProps,
  container: HTMLDivElement
): void {
  const { selection, ...props } = initialProps

  clearCurrentAppContainer()

  currentContainer = container
  currentSelection = selection
  currentRoot = ReactDOM.createRoot(currentContainer)

  initContainerStyles(selection, currentContainer)

  window.addEventListener('keydown', handleKeyDown, false)

  currentRoot.render(
    <Tooltip
      selection={selection}
      clearTooltip={clearCurrentAppContainer}
      onFormat={clearCurrentAppContainer}
      {...props}
    />
  )
}
