export function appendTextToBody(text: string): HTMLElement {
  const nodeContents = document.createElement('div')
  nodeContents.textContent = text
  document.body.appendChild(nodeContents)
  return nodeContents
}

export function createSelection(selectNodeContents: Node): Selection {
  const selection = window.getSelection() as Selection
  const selectionRange = document.createRange()
  selectionRange.selectNodeContents(selectNodeContents)
  selection.removeAllRanges()
  selection.addRange(selectionRange)
  return selection
}

// https://stackoverflow.com/questions/42805128/does-jest-reset-the-jsdom-document-after-every-suite-or-test#comment101682049_50800473
export function cleanDocument(): void {
  document.body.innerHTML = ''
  document.head.innerHTML = ''
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    return start + index
  })
}
