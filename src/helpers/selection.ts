import { clearCurrentAppContainer } from '@components/App'
import { FormatType } from '@constants/format-type'
import { matchIsTextIsBold, removeBoldFromText } from '@helpers/bold'
import { matchIsTextIsBoldItalic } from '@helpers/bold-italic'
import { getSiblingsBetweenElements } from '@helpers/dom'
import { matchIsTextIsItalic, removeItalicFromText } from '@helpers/italic'
import { formatTextByType } from '@helpers/string'

import { matchIsKeyboardEventSelectAll } from './keyboard'

export function getDocumentSelection(): Selection | null {
  const selection = document.getSelection()
  return selection?.type === 'Range' ? selection : null
}

export function getHTMLfromSelection(selection: Selection): DocumentFragment {
  const fragment = document.createDocumentFragment()
  const range = selection.getRangeAt(0)
  const clonedSelection = range.cloneContents()
  fragment.appendChild(clonedSelection)
  return fragment
}

export function getSelectionText(selection: Selection): string {
  return selection.toString()
}

function formatPortionOfSelection(
  allSelectedText: string,
  portionText: string,
  type: FormatType
): string {
  if (
    type === FormatType.italic &&
    (matchIsTextIsBoldItalic(allSelectedText) ||
      matchIsTextIsItalic(allSelectedText))
  ) {
    return removeItalicFromText(portionText)
  }
  if (
    type === FormatType.bold &&
    (matchIsTextIsBoldItalic(allSelectedText) ||
      matchIsTextIsBold(allSelectedText))
  ) {
    return removeBoldFromText(portionText)
  }
  return formatTextByType(portionText, type)
}

function getCurrentParagraphFromContainer(element: Node): HTMLParagraphElement {
  if (element.nodeName === 'P') {
    return element as HTMLParagraphElement
  }
  return element.parentElement as HTMLParagraphElement
}

export function formatSelectionByType(
  selection: Selection,
  formatType: FormatType
): void {
  const range = selection.getRangeAt(0)
  const { startOffset, endOffset, startContainer, endContainer } = range
  const startNodeValue = startContainer.nodeValue || ''
  const endNodeValue = endContainer.nodeValue || ''
  const currentSelectedText = getSelectionText(selection)

  if (startContainer === endContainer) {
    startContainer.nodeValue =
      startNodeValue.substring(0, startOffset) +
      formatPortionOfSelection(
        currentSelectedText,
        currentSelectedText,
        formatType
      ) +
      startNodeValue.substring(endOffset)
  } else {
    // first line
    startContainer.nodeValue =
      startNodeValue.substring(0, startOffset) +
      formatPortionOfSelection(
        currentSelectedText,
        startNodeValue.substring(startOffset),
        formatType
      )

    const startParagraph = getCurrentParagraphFromContainer(startContainer)
    const endParagraph = getCurrentParagraphFromContainer(endContainer)
    const allNextSiblings = getSiblingsBetweenElements(
      startParagraph,
      endParagraph
    )

    allNextSiblings.forEach((sibling) => {
      const textPortion = sibling.textContent || ''
      // eslint-disable-next-line no-param-reassign
      sibling.textContent = formatPortionOfSelection(
        currentSelectedText,
        textPortion,
        formatType
      )
    })

    // end first line
    endContainer.nodeValue =
      formatPortionOfSelection(
        currentSelectedText,
        endNodeValue.substring(0, endOffset),
        formatType
      ) + endNodeValue.substring(endOffset)
  }
  selection.removeAllRanges()
}

export type SubscriptionSelection = {
  unsubscribe: () => void
}

export function subscribeDocumentSelection(
  callback: (selection: Selection | null) => void
): SubscriptionSelection {
  let isSelectAllByKeyboard = false
  let isSelecting = false
  let currentSelection: Selection | null = null

  function handleSelectStart(): void {
    if (!isSelectAllByKeyboard) {
      clearCurrentAppContainer()
      isSelecting = true
    }
  }

  function handleMouseUp(): void {
    const selection = getDocumentSelection()
    if (isSelecting && selection) {
      currentSelection = selection
      callback(currentSelection)
      isSelecting = false
    }
  }

  function handleSelectionChange(): void {
    const selection = getDocumentSelection()
    if (selection && currentSelection && !isSelectAllByKeyboard) {
      currentSelection = null
      callback(currentSelection)
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    isSelectAllByKeyboard = matchIsKeyboardEventSelectAll(event)
    if (isSelectAllByKeyboard) {
      setTimeout(() => {
        const selection = getDocumentSelection()
        isSelecting = false
        currentSelection = null
        callback(selection)
      }, 100)
    }
  }

  function handleKeyUp(): void {
    isSelectAllByKeyboard = false
  }

  function unsubscribe(): void {
    document.removeEventListener('selectstart', handleSelectStart)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('selectionchange', handleSelectionChange)
    document.removeEventListener('keyup', handleKeyUp)
    document.removeEventListener('keydown', handleKeyDown)
  }

  function subscribe(): void {
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('selectionchange', handleSelectionChange)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('keydown', handleKeyDown)
  }

  subscribe()

  return {
    unsubscribe
  }
}
