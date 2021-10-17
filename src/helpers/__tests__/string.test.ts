import { getUnicodeLetter } from '@helpers/string'

describe('helpers/string', () => {
  describe('getUnicodeLetter', () => {
    it('should return a number for a valid text', () => {
      expect(getUnicodeLetter('f')).toBeNumber()
    })

    it('should return undefined for an invalid text', () => {
      expect(getUnicodeLetter('')).toBeUndefined()
    })

    it('should return the correct unicode for a letter', () => {
      expect(getUnicodeLetter('a')).toBe(97)
    })
  })
})
