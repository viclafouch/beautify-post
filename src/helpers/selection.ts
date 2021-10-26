export function replaceSelectedText(selection: Selection, text: string) {
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0)
    const { startOffset, startContainer, endContainer } = range
    const startNodeValue = startContainer.nodeValue || ''
    if (startContainer === endContainer) {
      range.endContainer.nodeValue =
        startNodeValue.substring(0, startOffset) +
        text +
        startNodeValue.substring(range.endOffset)
      range.setStart(range.startContainer, startOffset)
      range.setEnd(range.endContainer, startOffset + text.length)
    }
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

export function getSelectionText(selection: Selection): string {
  return selection.toString().trim()
}

export function getCorrectSelectionBreaklines(selection: Selection): string {
  const text = selection.toString().split('\n')

  return text
    .filter((line, index) => {
      const previousLine = text[index - 1] || ''
      const nextLine = text[index + 1] || ''
      const isLineEmpty = line.trim() === ''
      const isPrevLineEmpty = previousLine.trim() !== ''
      const isNextLineEmpty = nextLine.trim() !== ''
      if (index > 0 && isLineEmpty && isPrevLineEmpty) {
        return false
      }
      if (index < text.length - 1 && isLineEmpty && isNextLineEmpty) {
        return false
      }
      return true
    })
    .join('\n')
}
