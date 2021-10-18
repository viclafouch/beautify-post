import { unicodes } from '@constants/unicode'
import {
  formatBold,
  formatNormalLetterToBold,
  matchIsTextIsBold,
  matchIsUnicodeBold,
  matchIsUnicodeLowerBold,
  matchIsUnicodeUpperBold
} from '@helpers/bold'
import { range } from './utils'

describe('helpers/bold', () => {
  describe('matchIsUnicodeLowerBold', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeLowerBold(0)).toBeBoolean()
    })

    it('should return true for a bold unicode', () => {
      expect(matchIsUnicodeLowerBold(unicodes.bold.a)).toBeTrue()
    })

    it('should return false for a non bold unicode', () => {
      expect(matchIsUnicodeLowerBold(unicodes.normal.a)).toBeFalse()
    })

    it('should return true for all lower bold letters', () => {
      const unicodeBold = range(unicodes.bold.a, unicodes.bold.z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeLowerBold)
    })

    it('should return false for all upper bold letters', () => {
      const unicodeBold = range(unicodes.bold.A, unicodes.bold.Z)
      expect(unicodeBold).not.toSatisfyAll(matchIsUnicodeLowerBold)
    })
  })

  describe('matchIsUnicodeUpperBold', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeUpperBold(0)).toBeBoolean()
    })

    it('should return true for a bold unicode', () => {
      expect(matchIsUnicodeUpperBold(unicodes.bold.A)).toBeTrue()
    })

    it('should return false for a non bold unicode', () => {
      expect(matchIsUnicodeUpperBold(unicodes.normal.A)).toBeFalse()
    })

    it('should return true for all lower bold letters', () => {
      const unicodeBold = range(unicodes.bold.A, unicodes.bold.Z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeUpperBold)
    })

    it('should return false for all upper bold letters', () => {
      const unicodeBold = range(unicodes.bold.a, unicodes.bold.z)
      expect(unicodeBold).not.toSatisfyAll(matchIsUnicodeUpperBold)
    })
  })

  describe('matchIsUnicodeBold', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeBold(0)).toBeBoolean()
    })

    it('should return true for a lower bold unicode', () => {
      expect(matchIsUnicodeBold(unicodes.bold.a)).toBeTrue()
    })

    it('should return true for a upper bold unicode', () => {
      expect(matchIsUnicodeBold(unicodes.bold.A)).toBeTrue()
    })

    it('should return false for a non bold unicode', () => {
      expect(matchIsUnicodeBold(unicodes.normal.A)).toBeFalse()
    })

    it('should return true for all lower bold letters', () => {
      const unicodeBold = range(unicodes.bold.A, unicodes.bold.Z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeBold)
    })

    it('should return true for all upper bold letters', () => {
      const unicodeBold = range(unicodes.bold.a, unicodes.bold.z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeBold)
    })
  })

  describe('matchIsTextIsBold', () => {
    it('should return a boolean', () => {
      expect(matchIsTextIsBold('foo')).toBeBoolean()
    })

    it('should return true for a simple word in bold', () => {
      expect(matchIsTextIsBold('𝐀𝐥𝐢𝐜𝐞')).toBeTrue()
    })

    it('should return true for a simple words in bold with ponctuations', () => {
      expect(matchIsTextIsBold('𝐀𝐥𝐢𝐜𝐞, 𝐁𝐨𝐛 & 𝐉𝐞𝐚𝐧')).toBeTrue()
    })

    it('should return false for an empty string', () => {
      expect(matchIsTextIsBold(' \n ')).toBeFalse()
    })

    it('should return false for a bold text with normal letters', () => {
      expect(matchIsTextIsBold('𝐀𝐥𝐢𝐜𝐞, Bob & 𝐉𝐞𝐚𝐧')).toBeFalse()
    })

    it('should return true for a bold text in uppercase', () => {
      expect(matchIsTextIsBold('𝐀𝐋𝐈𝐂𝐄')).toBeTrue()
    })

    it('should return true for a bold text in lowercase', () => {
      expect(matchIsTextIsBold('𝐚𝐥𝐢𝐜𝐞')).toBeTrue()
    })

    it('should return true for a bold text with emojis', () => {
      expect(matchIsTextIsBold('𝐚𝐥𝐢𝐜𝐞 💙')).toBeTrue()
    })

    it('should return false for a text with only ponctuations or spaces', () => {
      expect(matchIsTextIsBold(', @ds§ ()')).toBeFalse()
    })

    it('should return false for a text bold or italic', () => {
      expect(matchIsTextIsBold('𝐉𝐞𝐚𝐧 & 𝘑𝘦𝘢𝘯')).toBeFalse()
    })
  })

  describe('formatNormalLetterToBold', () => {
    it('should return a string', () => {
      expect(formatNormalLetterToBold('t')).toBeString()
    })

    it('should return the letter in bold', () => {
      expect(formatNormalLetterToBold('t')).toBe('𝐭')
    })

    test.each([
      { value: '' },
      { value: '⇩' },
      { value: ',' },
      { value: '1' },
      { value: '💙' },
      { value: '%' },
      { value: ' ' },
      { value: 'é' }
    ])('should return the same letter for `$value`', ({ value }) => {
      expect(formatNormalLetterToBold(value)).toBe(value)
    })

    test.each([
      { value: 't', expected: '𝐭' },
      { value: 'A', expected: '𝐀' },
      { value: 'H', expected: '𝐇' },
      { value: 'c', expected: '𝐜' },
      { value: 'w', expected: '𝐰' },
      { value: 'r', expected: '𝐫' }
    ])(
      'should return return `$value` into `$expected`',
      ({ value, expected }) => {
        expect(formatNormalLetterToBold(value)).toBe(expected)
      }
    )
  })

  describe('formatBold', () => {
    it('should return a string', () => {
      expect(formatBold('foo')).toBeString()
    })

    it('should return string in bold', () => {
      expect(formatBold('foo')).toBe('𝐟𝐨𝐨')
    })

    it('should return string in bold with ponctuations', () => {
      expect(formatBold('Alice, Jean & Bob')).toBe('𝐀𝐥𝐢𝐜𝐞, 𝐉𝐞𝐚𝐧 & 𝐁𝐨𝐛')
    })

    it('should return same string if nothing to format bold', () => {
      expect(formatBold('𝘈𝘭𝘪𝘤𝘦 + 𝘉𝘰𝘣 = 💙')).toBe('𝘈𝘭𝘪𝘤𝘦 + 𝘉𝘰𝘣 = 💙')
    })

    it('should return string in bold with already bold', () => {
      expect(formatBold('𝐀𝐥𝐢𝐜𝐞, Jean + BOB123')).toBe('𝐀𝐥𝐢𝐜𝐞, 𝐉𝐞𝐚𝐧 + 𝐁𝐎𝐁123')
    })
  })
})
