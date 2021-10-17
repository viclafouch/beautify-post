import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase
} from '@helpers/boolean'

describe('helpers/boolean', () => {
  describe('matchIsTextUppercase', () => {
    it('should return a boolean', () => {
      expect(matchIsTextUppercase('')).toBeBoolean()
    })

    it('should return true for a uppercased text', () => {
      expect(matchIsTextUppercase('FOO')).toBeTrue()
    })

    it('should return false for a lowercased text', () => {
      expect(matchIsTextUppercase('foo')).toBeFalse()
    })

    it('should return false for a non full uppercased text', () => {
      expect(matchIsTextUppercase('ALiCe')).toBeFalse()
    })
  })

  describe('matchIsTextEmpty', () => {
    it('should return a boolean', () => {
      expect(matchIsTextEmpty('foo')).toBeBoolean()
    })

    it('should return true for an empty text', () => {
      expect(matchIsTextEmpty(' ')).toBeTrue()
    })

    it('should return true for a text with just breakline', () => {
      expect(matchIsTextEmpty(' \n ')).toBeTrue()
    })

    it('should return false for a filled text', () => {
      expect(matchIsTextEmpty(' foo')).toBeFalse()
    })
  })

  describe('matchIsCharacterANormalLetter', () => {
    it('should return a boolean', () => {
      expect(matchIsCharacterANormalLetter('f')).toBeBoolean()
    })

    it('should return a true for a normal character', () => {
      expect(matchIsCharacterANormalLetter('A')).toBeTrue()
    })

    it('should return a false for a non normal character', () => {
      expect(matchIsCharacterANormalLetter('𝐀')).toBeFalse()
    })

    test.each([
      { char: ',' },
      { char: '.' },
      { char: '.' },
      { char: "'" },
      { char: '⚙️' }
    ])('should return false for $char', ({ char }) => {
      expect(matchIsCharacterANormalLetter(char)).toBeFalse()
    })
  })
})