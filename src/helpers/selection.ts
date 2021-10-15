export function replaceSelectedText(selection: Selection, text: string) {
  const range = selection.getRangeAt(0)
  range.deleteContents()
  range.insertNode(document.createTextNode(text))
  selection.removeAllRanges()
}
