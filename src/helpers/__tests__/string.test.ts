import { FormatType } from '@constants/format-type'
import {
  getUnicodeLetter,
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  formatNormal,
  matchIsTextUppercase,
  formatTextByType
} from '@helpers/string'

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

  describe('formatNormal', () => {
    it('should return a string', () => {
      expect(formatNormal('foo')).toBeString()
    })

    it('should return bold to normal text', () => {
      expect(formatNormal('𝐟𝐨𝐨')).toBe('foo')
    })

    it('should return italic to normal text', () => {
      expect(formatNormal('𝘪𝘵𝘢𝘭𝘪𝘤')).toBe('italic')
    })

    it('should return bold-italic to normal text', () => {
      expect(formatNormal('𝒇𝒐𝒐')).toBe('foo')
    })

    it('should return normal to normal text', () => {
      expect(formatNormal('bar')).toBe('bar')
    })

    it('should return italic + bold + bold-italic + normal to normal text', () => {
      expect(formatNormal('𝘪𝘵𝘢𝘭𝘪𝘤 + 𝐛𝐨𝐥𝐝 + 𝒃𝒐𝒍𝒅-𝒊𝒕𝒂𝒍𝒊𝒄 + normal')).toBe(
        'italic + bold + bold-italic + normal'
      )
    })
  })

  describe('formatTextByType', () => {
    describe('formatTextByType/bold', () => {
      test.each([
        { text: 'Alice & Bob', expected: '𝐀𝐥𝐢𝐜𝐞 & 𝐁𝐨𝐛' },
        { text: '𝐀𝐥𝐢𝐜𝐞 & 𝐁𝐨𝐛', expected: 'Alice & Bob' },
        { text: '𝘏𝘦𝘭𝘭𝘰 𝘸𝘰𝘳𝘭𝘥', expected: '𝑯𝒆𝒍𝒍𝒐 𝒘𝒐𝒓𝒍𝒅' },
        { text: '𝑯𝒆𝒍𝒍𝒐 𝒘𝒐𝒓𝒍𝒅', expected: '𝘏𝘦𝘭𝘭𝘰 𝘸𝘰𝘳𝘭𝘥' },
        { text: 'Apple 𝘫𝘶𝘪𝘤𝘦', expected: '𝐀𝐩𝐩𝐥𝐞 𝒋𝒖𝒊𝒄𝒆' }
      ])("should transform '$text' into '$expected'", ({ text, expected }) => {
        expect(formatTextByType(text, FormatType.bold)).toBe(expected)
      })
    })

    describe('formatTextByType/italic', () => {
      test.each([
        { text: 'Alice & Bob', expected: '𝘈𝘭𝘪𝘤𝘦 & 𝘉𝘰𝘣' },
        { text: '𝘈𝘭𝘪𝘤𝘦 & 𝘉𝘰𝘣', expected: 'Alice & Bob' },
        { text: '𝐇𝐞𝐥𝐥𝐨 𝐰𝐨𝐫𝐥𝐝', expected: '𝑯𝒆𝒍𝒍𝒐 𝒘𝒐𝒓𝒍𝒅' },
        { text: '𝑯𝒆𝒍𝒍𝒐 𝒘𝒐𝒓𝒍𝒅', expected: '𝐇𝐞𝐥𝐥𝐨 𝐰𝐨𝐫𝐥𝐝' },
        { text: 'LinkedIn 𝐓𝐞𝐱𝐭', expected: '𝘓𝘪𝘯𝘬𝘦𝘥𝘐𝘯 𝑻𝒆𝒙𝒕' }
      ])("should transform '$text' into '$expected'", ({ text, expected }) => {
        expect(formatTextByType(text, FormatType.italic)).toBe(expected)
      })
    })
  })
})
