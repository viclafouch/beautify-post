import { replaceSelectedText } from '@helpers/selection'
import { appendTextToBody, cleanDocument, createSelection } from './utils'

describe('helpers/selection', () => {
  describe('replaceSelectedText', () => {
    afterEach(() => {
      cleanDocument()
    })

    it('should replace the selected content', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('text that will be replaced')
      nodeContents.appendChild(selectedText)
      const selection = createSelection(selectedText)
      replaceSelectedText(selection, 'bar')
      expect(nodeContents.textContent).toBe('foobar')
    })

    it('should replace the selected content with bold text', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('Alice')
      const endText = document.createTextNode('bar')
      nodeContents.appendChild(selectedText)
      nodeContents.appendChild(endText)
      expect(nodeContents.textContent).toBe('fooAlicebar')
      const selection = createSelection(selectedText)
      replaceSelectedText(selection, '𝐀𝐥𝐢𝐜𝐞')
      expect(nodeContents.textContent).toBe('foo𝐀𝐥𝐢𝐜𝐞bar')
    })

    it('should replace the selected content with italic text', () => {
      const nodeContents = appendTextToBody('foo')
      const selectedText = document.createTextNode('text that will be replaced')
      const endText = document.createTextNode('bar')
      nodeContents.appendChild(selectedText)
      nodeContents.appendChild(endText)
      expect(nodeContents.textContent).toBe('footext that will be replacedbar')
      const selection = createSelection(selectedText)
      replaceSelectedText(selection, '𝘈𝘭𝘪𝘤𝘦')
      expect(nodeContents.textContent).toBe('foo𝘈𝘭𝘪𝘤𝘦bar')
    })
  })
})
