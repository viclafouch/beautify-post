import { POPUP } from '@constants/dom'

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

export function matchIsTextEditorContainsSelection(selection: Selection) {
  const textEditor = getTextEditorElement() as HTMLDivElement
  const range = selection.getRangeAt(0)
  return (
    textEditor.contains(range.startContainer) &&
    textEditor.contains(range.endContainer)
  )
}
