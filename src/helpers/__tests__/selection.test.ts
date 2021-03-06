import { FormatType } from '@constants/format-type'
import { formatSelectionByType } from '@helpers/selection'

import { appendTextToBody, cleanDocument, createSelection } from './utils'

describe('helpers/selection', () => {
  describe('formatSelectionByType', () => {
    afterEach(() => {
      cleanDocument()
    })

    it('should replace the selected content', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('text that will be replaced')
      nodeContents.appendChild(selectedText)
      const selection = createSelection(selectedText)
      formatSelectionByType(selection, FormatType.bold)
      expect(nodeContents.textContent).toBe('fooπ­ππ±π­ π­π‘ππ­ π°π’π₯π₯ ππ π«ππ©π₯ππππ')
    })

    it('should replace the selected content with bold text', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('Alice')
      const endText = document.createTextNode('bar')
      nodeContents.appendChild(selectedText)
      nodeContents.appendChild(endText)
      expect(nodeContents.textContent).toBe('fooAlicebar')
      const selection = createSelection(selectedText)
      formatSelectionByType(selection, FormatType.bold)
      expect(nodeContents.textContent).toBe('fooππ₯π’ππbar')
    })

    it('should replace the selected content with italic text', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('text that will be replaced')
      nodeContents.appendChild(selectedText)
      const selection = createSelection(selectedText)
      formatSelectionByType(selection, FormatType.italic)
      expect(nodeContents.textContent).toBe('fooπ΅π¦πΉπ΅ π΅π©π’π΅ πΈπͺπ­π­ π£π¦ π³π¦π±π­π’π€π¦π₯')
    })

    it('should uppercase the selected content', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('text that will be replaced')
      nodeContents.appendChild(selectedText)
      const selection = createSelection(selectedText)
      formatSelectionByType(selection, FormatType.uppercase)
      expect(nodeContents.textContent).toBe('fooTEXT THAT WILL BE REPLACED')
    })
  })
})
