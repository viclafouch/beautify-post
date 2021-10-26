import { matchIsLastArrayItem, splitTextInArray } from '@helpers/array'

describe('helpers/array', () => {
  describe('splitTextInArray', () => {
    it('should return an array', () => {
      expect(splitTextInArray('foo')).toBeArray()
    })

    it('should return an array of the string length', () => {
      expect(splitTextInArray('foo')).toBeArrayOfSize(3)
    })

    it('should return an array of letter in right order', () => {
      expect(splitTextInArray('foo')).toStrictEqual(['f', 'o', 'o'])
    })

    it('should return an array of bold letters', () => {
      expect(splitTextInArray('𝐀𝐥𝐢𝐜𝐞')).toStrictEqual(['𝐀', '𝐥', '𝐢', '𝐜', '𝐞'])
    })

    it('should return an array of italic letters', () => {
      expect(splitTextInArray('𝘈𝘭𝘪𝘤𝘦')).toStrictEqual(['𝘈', '𝘭', '𝘪', '𝘤', '𝘦'])
    })
  })

  describe('matchIsLastArrayItem', () => {
    it('should return a boolean', () => {
      expect(matchIsLastArrayItem(1, [])).toBeBoolean()
    })

    it('should return true for a last item', () => {
      expect(matchIsLastArrayItem(3, [0, 1, 2, 3])).toBeTrue()
    })

    it('should return false for a non last item', () => {
      expect(matchIsLastArrayItem('foo', [0, 1, 2, 3])).toBeFalse()
    })
  })
})
