import { unicodes } from '@constants/unicode'
import {
  formatBold,
  formatNormalLetterToBold,
  matchIsTextIsBold,
  matchIsUnicodeBold,
  matchIsUnicodeLowerBold,
  matchIsUnicodeUpperBold,
  removeBoldFromText
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
      expect(matchIsTextIsBold('????????????????????')).toBeTrue()
    })

    it('should return true for a simple words in bold with ponctuations', () => {
      expect(matchIsTextIsBold('????????????????????, ???????????? & ????????????????')).toBeTrue()
    })

    it('should return false for an empty string', () => {
      expect(matchIsTextIsBold(' \n ')).toBeFalse()
    })

    it('should return false for a bold text with normal letters', () => {
      expect(matchIsTextIsBold('????????????????????, Bob & ????????????????')).toBeFalse()
    })

    it('should return true for a bold text in uppercase', () => {
      expect(matchIsTextIsBold('????????????????????')).toBeTrue()
    })

    it('should return true for a bold text in lowercase', () => {
      expect(matchIsTextIsBold('????????????????????')).toBeTrue()
    })

    it('should return true for a bold text with emojis', () => {
      expect(matchIsTextIsBold('???????????????????? ????')).toBeTrue()
    })

    it('should return false for a text with only ponctuations or spaces', () => {
      expect(matchIsTextIsBold(', @ds?? ()')).toBeFalse()
    })

    it('should return false for only ponctuations', () => {
      expect(matchIsTextIsBold(',; #@')).toBeFalse()
    })

    it('should return false for a text bold or italic', () => {
      expect(matchIsTextIsBold('???????????????? & ????????????????')).toBeFalse()
    })

    it('should return true for a bold-italic text', () => {
      expect(matchIsTextIsBold('????????????')).toBeTrue()
    })

    it('should return true for a bold-italic and bold text', () => {
      expect(matchIsTextIsBold('???????????? & ????????????')).toBeTrue()
    })
  })

  describe('formatNormalLetterToBold', () => {
    it('should return a string', () => {
      expect(formatNormalLetterToBold('t')).toBeString()
    })

    it('should return the letter in bold', () => {
      expect(formatNormalLetterToBold('t')).toBe('????')
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
      expect(formatNormalLetterToBold(value)).toBe(value)
    })

    test.each([
      { value: 't', expected: '????' },
      { value: 'A', expected: '????' },
      { value: 'H', expected: '????' },
      { value: 'c', expected: '????' },
      { value: 'w', expected: '????' },
      { value: 'r', expected: '????' }
    ])('should return `$value` into `$expected`', ({ value, expected }) => {
      expect(formatNormalLetterToBold(value)).toBe(expected)
    })
  })

  describe('formatBold', () => {
    it('should return a string', () => {
      expect(formatBold('foo')).toBeString()
    })

    it('should return string in bold', () => {
      expect(formatBold('foo')).toBe('????????????')
    })

    it('should return italic string in bold-string', () => {
      expect(formatBold('????????????')).toBe('????????????')
    })

    it('should return italic and bold strings in bold-string', () => {
      expect(formatBold('???????????? & ????????????')).toBe('???????????? & ????????????')
    })

    it('should return string in bold with ponctuations', () => {
      expect(formatBold('Alice, Jean & Bob')).toBe('????????????????????, ???????????????? & ????????????')
    })

    it('should return string in bold with already bold', () => {
      expect(formatBold('????????????????????, Jean + BOB123')).toBe('????????????????????, ???????????????? + ????????????123')
    })
  })

  describe('removeBoldFromText', () => {
    it('should return a string', () => {
      expect(removeBoldFromText('????????????????????')).toBeString()
    })

    it('should remove bold from full bold text', () => {
      expect(removeBoldFromText('????????????????????????')).toBe('Jeanne')
    })

    it('should remove bold from some bold text', () => {
      expect(removeBoldFromText('????????ic????')).toBe('Alice')
    })

    it('should remove bold from full bold-italic text', () => {
      expect(removeBoldFromText('????????????????????')).toBe('????????????????????')
    })

    it('should remove bold from some bold-italic text', () => {
      expect(removeBoldFromText('Jeanne ????????????????????')).toBe('Jeanne ????????????????????')
    })

    it('should remove bold from some bold-italic and bold text', () => {
      expect(removeBoldFromText('???????????????????? and ????????????')).toBe('Alice and ????????????')
    })
  })
})
