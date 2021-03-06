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
      expect(matchIsTextIsBoldItalic('????????????????????')).toBeTrue()
    })

    it('should return true for a simple words in bold-italic with ponctuations', () => {
      expect(matchIsTextIsBoldItalic('????????????????????, ???????????? & ????????????????')).toBeTrue()
    })

    it('should return false for an empty string', () => {
      expect(matchIsTextIsBoldItalic(' \n ')).toBeFalse()
    })

    it('should return false for only ponctuations', () => {
      expect(matchIsTextIsBoldItalic(',; #@')).toBeFalse()
    })

    it('should return false for a bold-italic text with normal letters', () => {
      expect(matchIsTextIsBoldItalic('????????????????????, Bob & ????????????????')).toBeFalse()
    })

    it('should return true for a bold-italic text in uppercase', () => {
      expect(matchIsTextIsBoldItalic('????????????????????')).toBeTrue()
    })

    it('should return true for a bold-italic text in lowercase', () => {
      expect(matchIsTextIsBoldItalic('????????????????????')).toBeTrue()
    })

    it('should return true for a bold-italic text with emojis', () => {
      expect(matchIsTextIsBoldItalic('???????????????????? ????')).toBeTrue()
    })

    it('should return false for a text with only ponctuations or spaces', () => {
      expect(matchIsTextIsBoldItalic(', @ds?? ()')).toBeFalse()
    })

    it('should return false for a text bold-italic or italic or bold', () => {
      expect(matchIsTextIsBoldItalic('???????????????? & ???????????????? & ????????????????????')).toBeFalse()
    })
  })

  describe('formatNormalLetterToBoldItalic', () => {
    it('should return a string', () => {
      expect(formatNormalLetterToBoldItalic('t')).toBeString()
    })

    it('should return the letter in bold-italic', () => {
      expect(formatNormalLetterToBoldItalic('t')).toBe('????')
    })

    test.each([
      { value: '' },
      { value: '???' },
      { value: ',' },
      { value: '1' },
      { value: '????' },
      { value: '%' },
      { value: ' ' },
      { value: '??' }
    ])('should return the same letter for `$value`', ({ value }) => {
      expect(formatNormalLetterToBoldItalic(value)).toBe(value)
    })
  })

  describe('formatBoldItalic', () => {
    it('should return a string', () => {
      expect(formatBoldItalic('foo')).toBeString()
    })

    it('should return string in bold-italic', () => {
      expect(formatBoldItalic('foo')).toBe('????????????')
    })

    it('should return string in bold-italic with ponctuations', () => {
      expect(formatBoldItalic('Alice, Jean & Bob')).toBe('????????????????????, ???????????????? & ????????????')
    })

    it('should return same string if nothing to format bold-italic', () => {
      expect(formatBoldItalic('???????????????????? + ???????????? = ????')).toBe('???????????????????? + ???????????? = ????')
    })

    it('should return string in bold in bold-italic', () => {
      expect(formatBoldItalic('????????????????????')).toBe('????????????????????')
    })

    it('should return string in italic in bold-italic', () => {
      expect(formatBoldItalic('????????????????????')).toBe('????????????????????')
    })

    it('should return string in bold-italic with already bold-italic', () => {
      expect(formatBoldItalic('????????????????????, Jean + BOB123')).toBe(
        '????????????????????, ???????????????? + ????????????123'
      )
    })
  })
})
