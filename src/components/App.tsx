import { FormatType } from '@constants/format-type'
import {
  matchIsKeyboardEventBold,
  matchIsKeyboardEventItalic
} from '@helpers/keyboard'
import { css } from '@emotion/css'
import { formatSelectionByType } from '@helpers/selection'
import React from 'react'
import ReactDOM from 'react-dom'
import Tooltip from './Tooltip/tooltip'

type InitialProps = {
  selection: Selection
}

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

let currentContainer: null | Element = null
let currentSelection: null | Selection = null

function handleResize(): void {
  if (currentSelection && currentContainer) {
    const range = currentSelection.getRangeAt(0)
    const domRect = range.getBoundingClientRect()
    currentContainer.setAttribute('class', getTooltipClassName(domRect))
  }
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (!event.metaKey && !event.ctrlKey) {
    return clearCurrentAppContainer()
  }
  if (matchIsKeyboardEventBold(event) && currentSelection) {
    event.stopPropagation()
    formatSelectionByType(currentSelection, FormatType.bold)
    return clearCurrentAppContainer()
  } else if (matchIsKeyboardEventItalic(event) && currentSelection) {
    event.stopPropagation()
    formatSelectionByType(currentSelection, FormatType.italic)
    return clearCurrentAppContainer()
  }
}

export function clearCurrentAppContainer(): void {
  if (currentContainer) {
    ReactDOM.unmountComponentAtNode(currentContainer)
    currentContainer.remove()
    currentContainer = null
    document.removeEventListener('keydown', handleKeyDown, false)
    window.removeEventListener('resize', handleResize, false)
  }
  currentSelection = null
}

export function buildAppOnContainer(
  initialProps: InitialProps,
  container: Element
): void {
  const { selection, ...props } = initialProps

  if (currentContainer) {
    clearCurrentAppContainer()
  }

  currentSelection = selection
  currentContainer = container

  handleResize()

  document.addEventListener('keydown', handleKeyDown, false)
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
