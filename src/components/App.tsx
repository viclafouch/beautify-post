/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
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

let currentContainer: null | HTMLDivElement = null
let currentSelection: null | Selection = null

function handleResize(): void {
  if (currentSelection && currentContainer) {
    const range = currentSelection.getRangeAt(0)
    const clientRectOfRange = range.getBoundingClientRect()
    const modalContent = getModalContent() as Element
    const minTop = modalContent.getBoundingClientRect().top
    let top = clientRectOfRange.top < minTop ? minTop : clientRectOfRange.top
    top = top - BUTTON_HEIGHT - SPACING_ABOVE_SELECTION
    currentContainer.setAttribute('class', tooltipClassName)
    currentContainer.style.top = `${top}px`
    currentContainer.style.left = `${clientRectOfRange.left}px`
  }
}

function handleKeyDown(event: KeyboardEvent): void {
  if (!event.metaKey && !event.ctrlKey) {
    clearCurrentAppContainer()
  }
  if (matchIsKeyboardEventBold(event) && currentSelection) {
    event.stopPropagation()
    formatSelectionByType(currentSelection, FormatType.bold)
    clearCurrentAppContainer()
  }
  if (matchIsKeyboardEventItalic(event) && currentSelection) {
    event.stopPropagation()
    formatSelectionByType(currentSelection, FormatType.italic)
    clearCurrentAppContainer()
  }
}

export function clearCurrentAppContainer(): void {
  if (currentContainer) {
    ReactDOM.unmountComponentAtNode(currentContainer)
    currentContainer.remove()
    currentContainer = null
    window.removeEventListener('keydown', handleKeyDown, false)
    window.removeEventListener('resize', handleResize, false)
  }
  currentSelection = null
}

export function buildAppOnContainer(
  initialProps: InitialProps,
  container: HTMLDivElement
): void {
  const { selection, ...props } = initialProps

  if (currentContainer) {
    clearCurrentAppContainer()
  }

  currentSelection = selection
  currentContainer = container

  handleResize()

  window.addEventListener('keydown', handleKeyDown, false)
  window.addEventListener('resize', handleResize, false)

  ReactDOM.render(
    <Tooltip
      selection={selection}
      clearTooltip={clearCurrentAppContainer}
      onFormat={clearCurrentAppContainer}
      {...props}
    />,
    container
  )
}
