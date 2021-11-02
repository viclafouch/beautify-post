import { matchIsTextIsItalic, removeItalicFromText } from '@helpers/italic'
import { formatTextByType } from '@helpers/string'
import { matchIsTextIsBoldItalic } from '@helpers/bold-italic'
import { getSiblingsBetweenElements } from '@helpers/dom'
import { matchIsTextIsBold, removeBoldFromText } from '@helpers/bold'
import { FormatType } from '@constants/format-type'

export function getDocumentSelection(): Selection | null {
  return document.getSelection()
}

export function getSelectionText(selection: Selection): string {
  return selection.toString().trim()
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

export function formatSelectionByType(
  selection: Selection,
  formatType: FormatType
) {
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

    const startP = startContainer.parentElement as HTMLParagraphElement
    const endP = endContainer.parentElement as HTMLParagraphElement
    const allNextSiblings = getSiblingsBetweenElements(startP, endP)

    for (const sibling of allNextSiblings) {
      const textPortion = sibling.textContent || ''
      sibling.textContent = formatPortionOfSelection(
        currentSelectedText,
        textPortion,
        formatType
      )
    }

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
  let isSelecting = false
  let currentSelection: Selection | null = null

  function handleSelectStart(): void {
    isSelecting = true
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
    if (selection && currentSelection) {
      currentSelection = null
      callback(currentSelection)
    }
  }

  function unsubscribe(): void {
    document.removeEventListener('selectstart', handleSelectStart)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('selectionchange', handleSelectionChange)
  }

  function subscribe(): void {
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('selectionchange', handleSelectionChange)
  }

  subscribe()

  return {
    unsubscribe
  }
}
