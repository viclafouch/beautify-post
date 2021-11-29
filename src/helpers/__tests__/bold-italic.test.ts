import { unicodes } from '@constants/unicode'
import {
  formatBoldItalic,
  formatNormalLetterToBoldItalic,
  matchIsTextIsBoldItalic,
  matchIsUnicodeBoldItalic,
  matchIsUnicodeLowerBoldItalic,
  matchIsUnicodeUpperBoldItalic
} from '@helpers/bold-italic'

import { range } from './utils'

describe('helpers/bold-italic', () => {
  describe('matchIsUnicodeLowerBoldItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeLowerBoldItalic(0)).toBeBoolean()
    })

    it('should return true for a bold-italic unicode', () => {
      expect(matchIsUnicodeLowerBoldItalic(unicodes.boldItalic.a)).toBeTrue()
    })

    it('should return false for a non bold-italic unicode', () => {
      expect(matchIsUnicodeLowerBoldItalic(unicodes.normal.a)).toBeFalse()
    })

    it('should return true for all lower bold-italic letters', () => {
      const unicodeBold = range(unicodes.boldItalic.a, unicodes.boldItalic.z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeLowerBoldItalic)
    })

    it('should return false for all upper bold-italic letters', () => {
      const unicodeBold = range(unicodes.boldItalic.A, unicodes.boldItalic.Z)
      expect(unicodeBold).not.toSatisfyAll(matchIsUnicodeLowerBoldItalic)
    })
  })

  describe('matchIsUnicodeUpperBoldItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeUpperBoldItalic(0)).toBeBoolean()
    })

    it('should return true for a bold-italic unicode', () => {
      expect(matchIsUnicodeUpperBoldItalic(unicodes.boldItalic.A)).toBeTrue()
    })

    it('should return false for a non bold-italic unicode', () => {
      expect(matchIsUnicodeUpperBoldItalic(unicodes.normal.A)).toBeFalse()
    })

    it('should return true for all lower bold-italic letters', () => {
      const unicodeBold = range(unicodes.boldItalic.A, unicodes.boldItalic.Z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeUpperBoldItalic)
    })

    it('should return false for all upper bold-italic letters', () => {
      const unicodeBold = range(unicodes.boldItalic.a, unicodes.boldItalic.z)
      expect(unicodeBold).not.toSatisfyAll(matchIsUnicodeUpperBoldItalic)
    })
  })

  describe('matchIsUnicodeBoldItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsUnicodeBoldItalic(0)).toBeBoolean()
    })

    it('should return true for a lower bold-italic unicode', () => {
      expect(matchIsUnicodeBoldItalic(unicodes.boldItalic.a)).toBeTrue()
    })

    it('should return true for a upper bold-italic unicode', () => {
      expect(matchIsUnicodeBoldItalic(unicodes.boldItalic.A)).toBeTrue()
    })

    it('should return false for a non bold-italic unicode', () => {
      expect(matchIsUnicodeBoldItalic(unicodes.normal.A)).toBeFalse()
    })

    it('should return true for all lower bold-italic letters', () => {
      const unicodeBold = range(unicodes.boldItalic.A, unicodes.boldItalic.Z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeBoldItalic)
    })

    it('should return true for all upper bold-italic letters', () => {
      const unicodeBold = range(unicodes.boldItalic.a, unicodes.boldItalic.z)
      expect(unicodeBold).toSatisfyAll(matchIsUnicodeBoldItalic)
    })
  })

  describe('matchIsTextIsBoldItalic', () => {
    it('should return a boolean', () => {
      expect(matchIsTextIsBoldItalic('foo')).toBeBoolean()
    })

    it('should return true for a simple word in bold-italic', () => {
      expect(matchIsTextIsBoldItalic('𝑨𝒍𝒊𝒄𝒆')).toBeTrue()
    })

    it('should return true for a simple words in bold-italic with ponctuations', () => {
      expect(matchIsTextIsBoldItalic('𝑨𝒍𝒊𝒄𝒆, 𝑩𝒐𝒃 & 𝑱𝒆𝒂𝒏')).toBeTrue()
    })

    it('should return false for an empty string', () => {
      expect(matchIsTextIsBoldItalic(' \n ')).toBeFalse()
    })

    it('should return false for only ponctuations', () => {
      expect(matchIsTextIsBoldItalic(',; #@')).toBeFalse()
    })

    it('should return false for a bold-italic text with normal letters', () => {
      expect(matchIsTextIsBoldItalic('𝑨𝒍𝒊𝒄𝒆, Bob & 𝑱𝒆𝒂𝒏')).toBeFalse()
    })

    it('should return true for a bold-italic text in uppercase', () => {
      expect(matchIsTextIsBoldItalic('𝑨𝑳𝑰𝑪𝑬')).toBeTrue()
    })

    it('should return true for a bold-italic text in lowercase', () => {
      expect(matchIsTextIsBoldItalic('𝒂𝒍𝒊𝒄𝒆')).toBeTrue()
    })

    it('should return true for a bold-italic text with emojis', () => {
      expect(matchIsTextIsBoldItalic('𝒂𝒍𝒊𝒄𝒆 💙')).toBeTrue()
    })

    it('should return false for a text with only ponctuations or spaces', () => {
      expect(matchIsTextIsBoldItalic(', @ds§ ()')).toBeFalse()
    })

    it('should return false for a text bold-italic or italic or bold', () => {
      expect(matchIsTextIsBoldItalic('𝐉𝐞𝐚𝐧 & 𝘑𝘦𝘢𝘯 & 𝒂𝒍𝒊𝒄𝒆')).toBeFalse()
    })
  })

  describe('formatNormalLetterToBoldItalic', () => {
    it('should return a string', () => {
      expect(formatNormalLetterToBoldItalic('t')).toBeString()
    })

    it('should return the letter in bold-italic', () => {
      expect(formatNormalLetterToBoldItalic('t')).toBe('𝒕')
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
      expect(formatNormalLetterToBoldItalic(value)).toBe(value)
    })
  })

  describe('formatBoldItalic', () => {
    it('should return a string', () => {
      expect(formatBoldItalic('foo')).toBeString()
    })

    it('should return string in bold-italic', () => {
      expect(formatBoldItalic('foo')).toBe('𝒇𝒐𝒐')
    })

    it('should return string in bold-italic with ponctuations', () => {
      expect(formatBoldItalic('Alice, Jean & Bob')).toBe('𝑨𝒍𝒊𝒄𝒆, 𝑱𝒆𝒂𝒏 & 𝑩𝒐𝒃')
    })

    it('should return same string if nothing to format bold-italic', () => {
      expect(formatBoldItalic('𝑨𝒍𝒊𝒄𝒆 + 𝑩𝒐𝒃 = 💙')).toBe('𝑨𝒍𝒊𝒄𝒆 + 𝑩𝒐𝒃 = 💙')
    })

    it('should return string in bold in bold-italic', () => {
      expect(formatBoldItalic('𝐀𝐋𝐈𝐂𝐄')).toBe('𝑨𝑳𝑰𝑪𝑬')
    })

    it('should return string in italic in bold-italic', () => {
      expect(formatBoldItalic('𝘈𝘓𝘐𝘊𝘌')).toBe('𝑨𝑳𝑰𝑪𝑬')
    })

    it('should return string in bold-italic with already bold-italic', () => {
      expect(formatBoldItalic('𝑨𝒍𝒊𝒄𝒆, Jean + BOB123')).toBe(
        '𝑨𝒍𝒊𝒄𝒆, 𝑱𝒆𝒂𝒏 + 𝑩𝑶𝑩123'
      )
    })
  })
})
