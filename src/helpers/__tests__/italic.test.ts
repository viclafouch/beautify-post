import { unicodes } from '@constants/unicode'
import {
  formatItalic,
  formatNormalLetterToItalic,
  matchIsTextIsItalic,
  matchIsUnicodeItalic,
  matchIsUnicodeLowerItalic,
  matchIsUnicodeUpperItalic
} from '@helpers/italic'
import { range } from './utils'

describe('helpers/italic', () => {
  describe('matchIsUnicodeLowerItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeLowerItalic(0)).toBeBoolean()
    })

    it('should return true for a italic unicode', () => {
      expect(matchIsUnicodeLowerItalic(unicodes.italic.a)).toBeTrue()
    })

    it('should return false for a non italic unicode', () => {
      expect(matchIsUnicodeLowerItalic(unicodes.normal.a)).toBeFalse()
    })

    it('should return true for all lower italic letters', () => {
      const unicodeBold = range(unicodes.italic.a, unicodes.italic.z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeLowerItalic)
    })

    it('should return false for all upper italic letters', () => {
      const unicodeBold = range(unicodes.italic.A, unicodes.italic.Z)
      expect(unicodeBold).not.toSatisfyAll(matchIsUnicodeLowerItalic)
    })
  })

  describe('matchIsUnicodeUpperItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeUpperItalic(0)).toBeBoolean()
    })

    it('should return true for a italic unicode', () => {
      expect(matchIsUnicodeUpperItalic(unicodes.italic.A)).toBeTrue()
    })

    it('should return false for a non italic unicode', () => {
      expect(matchIsUnicodeUpperItalic(unicodes.normal.A)).toBeFalse()
    })

    it('should return true for all lower italic letters', () => {
      const unicodeBold = range(unicodes.italic.A, unicodes.italic.Z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeUpperItalic)
    })

    it('should return false for all upper italic letters', () => {
      const unicodeBold = range(unicodes.italic.a, unicodes.italic.z)
      expect(unicodeBold).not.toSatisfyAll(matchIsUnicodeUpperItalic)
    })
  })

  describe('matchIsUnicodeItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeItalic(0)).toBeBoolean()
    })

    it('should return true for a lower italic unicode', () => {
      expect(matchIsUnicodeItalic(unicodes.italic.a)).toBeTrue()
    })

    it('should return true for a upper italic unicode', () => {
      expect(matchIsUnicodeItalic(unicodes.italic.A)).toBeTrue()
    })

    it('should return false for a non italic unicode', () => {
      expect(matchIsUnicodeItalic(unicodes.normal.A)).toBeFalse()
    })

    it('should return true for all lower italic letters', () => {
      const unicodeBold = range(unicodes.italic.A, unicodes.italic.Z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeItalic)
    })

    it('should return true for all upper italic letters', () => {
      const unicodeBold = range(unicodes.italic.a, unicodes.italic.z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeItalic)
    })
  })

  describe('matchIsTextIsItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsTextIsItalic('foo')).toBeBoolean()
    })

    it('should return true for a simple word in bold', () => {
      expect(matchIsTextIsItalic('𝘈𝘭𝘪𝘤𝘦')).toBeTrue()
    })

    it('should return true for a simple words in bold with ponctuations', () => {
      expect(matchIsTextIsItalic('𝘈𝘭𝘪𝘤𝘦, 𝘉𝘰𝘣 & 𝘑𝘦𝘢𝘯')).toBeTrue()
    })

    it('should return false for an empty string', () => {
      expect(matchIsTextIsItalic(' \n ')).toBeFalse()
    })

    it('should return false for a bold text with normal letters', () => {
      expect(matchIsTextIsItalic('𝘈𝘭𝘪𝘤𝘦, Bob & 𝘑𝘦𝘢𝘯')).toBeFalse()
    })

    it('should return true for a bold text in uppercase', () => {
      expect(matchIsTextIsItalic('𝘈𝘓𝘐𝘊𝘌')).toBeTrue()
    })

    it('should return true for a bold text in lowercase', () => {
      expect(matchIsTextIsItalic('𝘢𝘭𝘪𝘤𝘦')).toBeTrue()
    })

    it('should return true for a bold text with emojis', () => {
      expect(matchIsTextIsItalic('𝘢𝘭𝘪𝘤𝘦 💙')).toBeTrue()
    })

    it('should return false for a text with only ponctuations or spaces', () => {
      expect(matchIsTextIsItalic(', @ds§ ()')).toBeFalse()
    })

    it('should return false for a text bold or italic', () => {
      expect(matchIsTextIsItalic('𝐉𝐞𝐚𝐧 & 𝘑𝘦𝘢𝘯')).toBeFalse()
    })
  })

  describe('formatNormalLetterToItalic', () => {
    it('should return a string', () => {
      expect(formatNormalLetterToItalic('t')).toBeString()
    })

    it('should return the letter in italic', () => {
      expect(formatNormalLetterToItalic('t')).toBe('𝘵')
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
      expect(formatNormalLetterToItalic(value)).toBe(value)
    })

    test.each([
      { value: 't', expected: '𝘵' },
      { value: 'A', expected: '𝘈' },
      { value: 'H', expected: '𝘏' },
      { value: 'c', expected: '𝘤' },
      { value: 'w', expected: '𝘸' },
      { value: 'r', expected: '𝘳' }
    ])(
      'should return return `$value` into `$expected`',
      ({ value, expected }) => {
        expect(formatNormalLetterToItalic(value)).toBe(expected)
      }
    )
  })

  describe('formatItalic', () => {
    it('should return a string', () => {
      expect(formatItalic('foo')).toBeString()
    })

    it('should return string in italic', () => {
      expect(formatItalic('foo')).toBe('𝘧𝘰𝘰')
    })

    it('should return string in italic with ponctuations', () => {
      expect(formatItalic('Alice, Jean & Bob')).toBe('𝘈𝘭𝘪𝘤𝘦, 𝘑𝘦𝘢𝘯 & 𝘉𝘰𝘣')
    })

    it('should return same string if nothing to format italic', () => {
      expect(formatItalic('𝐀𝐥𝐢𝐜𝐞 + 𝐁𝐨𝐛 = 💙')).toBe('𝐀𝐥𝐢𝐜𝐞 + 𝐁𝐨𝐛 = 💙')
    })

    it('should return string in italic with already italic text', () => {
      expect(formatItalic('𝘈𝘭𝘪𝘤𝘦, Jean + BOB123')).toBe('𝘈𝘭𝘪𝘤𝘦, 𝘑𝘦𝘢𝘯 + 𝘉𝘖𝘉123')
    })
  })
})
