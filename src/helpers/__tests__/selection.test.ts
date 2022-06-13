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
      expect(nodeContents.textContent).toBe('foo𝐭𝐞𝐱𝐭 𝐭𝐡𝐚𝐭 𝐰𝐢𝐥𝐥 𝐛𝐞 𝐫𝐞𝐩𝐥𝐚𝐜𝐞𝐝')
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
      expect(nodeContents.textContent).toBe('foo𝐀𝐥𝐢𝐜𝐞bar')
    })

    it('should replace the selected content with italic text', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('text that will be replaced')
      nodeContents.appendChild(selectedText)
      const selection = createSelection(selectedText)
      formatSelectionByType(selection, FormatType.italic)
      expect(nodeContents.textContent).toBe('foo𝘵𝘦𝘹𝘵 𝘵𝘩𝘢𝘵 𝘸𝘪𝘭𝘭 𝘣𝘦 𝘳𝘦𝘱𝘭𝘢𝘤𝘦𝘥')
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
