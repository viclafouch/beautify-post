import { POPUP } from '@constants/dom'
import { getHTMLfromSelection } from './selection'

export function getContainerElement(): Element | null {
  return document.querySelector(POPUP.container)
}

export function getModalContent(): Element | null {
  return document.querySelector(POPUP.textEditorScroller)
}

export function getHeader(): HTMLDivElement | null {
  return document.querySelector(POPUP.textEditorHeader)
}

export function getFooter(): HTMLDivElement | null {
  return document.querySelector(POPUP.textEditorFooter)
}

export function getTextEditorElement(): Element | null {
  return document.querySelector(POPUP.textEditor)
}

export function matchIsPopupOpened(): boolean {
  const container = getContainerElement()
  const formElement = getTextEditorElement()
  return formElement !== null && Boolean(container?.contains(formElement))
}

export function matchIsMentionElement(element: Node): boolean {
  return element.nodeName === 'A' || element.parentElement?.nodeName === 'A'
}

export function matchIsHashtagElement(element: Node): boolean {
  return (
    element.nodeName === 'STRONG' ||
    element.parentElement?.nodeName === 'STRONG'
  )
}

export function matchIsTypeAheadExists(): boolean {
  return document.querySelector(POPUP.typeahead) !== null
}

export function matchIsValidSelection(selection: Selection): boolean {
  const { startContainer, endContainer } = selection.getRangeAt(0)
  const html = getHTMLfromSelection(selection)
  const isExtraTagElement = [startContainer, endContainer].some((element) => {
    return matchIsMentionElement(element) || matchIsHashtagElement(element)
  })
  const isContainsExtraTagElement =
    html.querySelectorAll('a, strong').length > 0
  return !isExtraTagElement && !isContainsExtraTagElement
}

export function matchIsTextEditorContainsSelection(
  selection: Selection
): boolean {
  const textEditor = getTextEditorElement() as HTMLDivElement
  const range = selection.getRangeAt(0)
  return (
    textEditor.contains(range.startContainer) &&
    textEditor.contains(range.endContainer)
  )
}
