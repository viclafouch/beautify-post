import { POPUP } from '@constants/dom'
import {
  getAllNodeNamesBetweenChildren,
  matchHaveSameParentElement
} from './dom'

export function getContainerElement(): Element | null {
  return document.querySelector(POPUP.container)
}

export function getTextEditorElement(): Element | null {
  return document.querySelector(POPUP.textEditor)
}

export function matchIsPopupOpened() {
  const container = getContainerElement()
  const formElement = getTextEditorElement()
  return formElement && container?.contains(formElement)
}

export function matchRangeContainersChildOfP(range: Range) {
  return (
    range.startContainer.parentElement?.nodeName === 'P' &&
    matchHaveSameParentElement(range.startContainer, range.endContainer)
  )
}

export function matchIsValidSelection(selection: Selection) {
  const range = selection.getRangeAt(0)
  if (!matchRangeContainersChildOfP(range)) {
    return false
  }
  const nodeNames = getAllNodeNamesBetweenChildren(
    range.startContainer,
    range.endContainer
  )
  return nodeNames.every(nodeName => nodeName !== 'STRONG' && nodeName !== 'A')
}

export function matchIsTextEditorContainsSelection(selection: Selection) {
  const textEditor = getTextEditorElement() as HTMLDivElement
  const range = selection.getRangeAt(0)
  return (
    textEditor.contains(range.startContainer) &&
    textEditor.contains(range.endContainer)
  )
}
