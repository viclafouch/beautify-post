import { POPUP } from '@constants/dom'
import { getSiblingsBetweenElements } from './dom'

export function getContainerElement(): Element | null {
  return document.querySelector(POPUP.container)
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

export function matchIsValidSelection(selection: Selection) {
  const { startContainer, endContainer } = selection.getRangeAt(0)
  const hasSelectMentionElement =
    matchIsMentionElement(startContainer) || matchIsMentionElement(endContainer)
  if (hasSelectMentionElement) {
    return false
  }
  const siblings = getSiblingsBetweenElements(startContainer, endContainer)
  return siblings.every(sibling => {
    return !matchIsMentionElement(sibling) && !matchIsHashtagElement(sibling)
  })
}

export function matchIsTextEditorContainsSelection(selection: Selection) {
  const textEditor = getTextEditorElement() as HTMLDivElement
  const range = selection.getRangeAt(0)
  return (
    textEditor.contains(range.startContainer) &&
    textEditor.contains(range.endContainer)
  )
}
