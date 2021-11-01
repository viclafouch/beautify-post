import {
  getSiblingsBetweenElements,
  matchHaveSameParentElement
} from '@helpers/dom'

describe('helpers/dom', () => {
  describe('matchHaveSameParentElement', () => {
    it('should return a boolean', () => {
      const div = document.createElement('div')
      expect(matchHaveSameParentElement(div)).toBeBoolean()
    })

    it('should return true for same parent element', () => {
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      const div = document.createElement('div')
      div.appendChild(p1)
      div.appendChild(p2)
      expect(matchHaveSameParentElement(p1, p2)).toBeTrue()
    })

    it('should return false for not parent element', () => {
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      p1.appendChild(p2)
      expect(matchHaveSameParentElement(p1, p2)).toBeFalse()
    })

    it('should return true for text node', () => {
      const p1 = document.createElement('p')
      const text1 = document.createTextNode('hello wordl')
      const text2 = document.createTextNode('ahah')
      p1.appendChild(text1)
      p1.appendChild(text2)
      expect(matchHaveSameParentElement(text1, text2)).toBeTrue()
    })
  })

  describe('getSiblingsBetweenElements', () => {
    it('should return an array', () => {
      const div = document.createElement('div')
      expect(getSiblingsBetweenElements(div, div)).toBeArray()
    })

    it('should return an array of size 0 for same element', () => {
      const div = document.createElement('div')
      expect(getSiblingsBetweenElements(div, div)).toBeArrayOfSize(0)
    })

    it('should return an array of size 0 for not same parent element', () => {
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      const container = document.createElement('div')
      container.appendChild(div1)
      expect(getSiblingsBetweenElements(div1, div2)).toBeArrayOfSize(0)
    })

    it('should return an array of N sibling elements', () => {
      const container = document.createElement('div')
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      const p3 = document.createElement('p')
      const p4 = document.createElement('p')
      container.appendChild(p1)
      container.appendChild(p2)
      container.appendChild(p3)
      container.appendChild(p4)
      expect(getSiblingsBetweenElements(p1, p4)).toBeArrayOfSize(2)
    })

    it('should return an array of correct sibling elements', () => {
      const container = document.createElement('div')
      const p1 = document.createElement('p')
      const p2 = document.createElement('p')
      const p3 = document.createElement('p')
      const p4 = document.createElement('p')
      container.appendChild(p1)
      container.appendChild(p2)
      container.appendChild(p3)
      container.appendChild(p4)
      expect(getSiblingsBetweenElements(p1, p4)).toStrictEqual([p2, p3])
    })
  })
})
