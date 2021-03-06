import { unicodes } from '@constants/unicode'
import {
  formatItalic,
  formatNormalLetterToItalic,
  matchIsTextIsItalic,
  matchIsUnicodeItalic,
  matchIsUnicodeLowerItalic,
  matchIsUnicodeUpperItalic,
  removeItalicFromText
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
      expect(matchIsTextIsItalic('????????????????????')).toBeTrue()
    })

    it('should return true for a simple words in bold with ponctuations', () => {
      expect(matchIsTextIsItalic('????????????????????, ???????????? & ????????????????')).toBeTrue()
    })

    it('should return false for an empty string', () => {
      expect(matchIsTextIsItalic(' \n ')).toBeFalse()
    })

    it('should return false for only ponctuations', () => {
      expect(matchIsTextIsItalic(',; #@')).toBeFalse()
    })

    it('should return false for a bold text with normal letters', () => {
      expect(matchIsTextIsItalic('????????????????????, Bob & ????????????????')).toBeFalse()
    })

    it('should return true for a bold text in uppercase', () => {
      expect(matchIsTextIsItalic('????????????????????')).toBeTrue()
    })

    it('should return true for a bold text in lowercase', () => {
      expect(matchIsTextIsItalic('????????????????????')).toBeTrue()
    })

    it('should return true for a bold text with emojis', () => {
      expect(matchIsTextIsItalic('???????????????????? ????')).toBeTrue()
    })

    it('should return false for a text with only ponctuations or spaces', () => {
      expect(matchIsTextIsItalic(', @ds?? ()')).toBeFalse()
    })

    it('should return false for a text bold or italic', () => {
      expect(matchIsTextIsItalic('???????????????? & ????????????????')).toBeFalse()
    })

    it('should return true for a bold-italic text', () => {
      expect(matchIsTextIsItalic('????????????')).toBeTrue()
    })

    it('should return true for a bold-italic and bold text', () => {
      expect(matchIsTextIsItalic('???????????? & ????????????')).toBeTrue()
    })
  })

  describe('formatNormalLetterToItalic', () => {
    it('should return a string', () => {
      expect(formatNormalLetterToItalic('t')).toBeString()
    })

    it('should return the letter in italic', () => {
      expect(formatNormalLetterToItalic('t')).toBe('????')
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
      expect(formatNormalLetterToItalic(value)).toBe(value)
    })

    test.each([
      { value: 't', expected: '????' },
      { value: 'A', expected: '????' },
      { value: 'H', expected: '????' },
      { value: 'c', expected: '????' },
      { value: 'w', expected: '????' },
      { value: 'r', expected: '????' }
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
      expect(formatItalic('foo')).toBe('????????????')
    })

    it('should return bold string in bold-italic string', () => {
      expect(formatItalic('????????????')).toBe('????????????')
    })

    it('should return italic and bold strings in bold-string', () => {
      expect(formatItalic('???????????? & ????????????')).toBe('???????????? & ????????????')
    })

    it('should return string in italic with ponctuations', () => {
      expect(formatItalic('Alice, Jean & Bob')).toBe('????????????????????, ???????????????? & ????????????')
    })

    it('should return string in italic with already italic text', () => {
      expect(formatItalic('????????????????????, Jean + BOB123')).toBe('????????????????????, ???????????????? + ????????????123')
    })
  })

  describe('removeItalicFromText', () => {
    it('should return a string', () => {
      expect(removeItalicFromText('????????????????????')).toBeString()
    })

    it('should remove italic from full italic text', () => {
      expect(removeItalicFromText('????????????????????????')).toBe('Jeanne')
    })

    it('should remove italic from some italic text', () => {
      expect(removeItalicFromText('????????ic????')).toBe('Alice')
    })

    it('should remove italic from full bold-italic text', () => {
      expect(removeItalicFromText('????????????????????')).toBe('????????????????????')
    })

    it('should remove italic from some bold-italic text', () => {
      expect(removeItalicFromText('Jeanne ????????????????????')).toBe('Jeanne ????????????????????')
    })

    it('should remove italic from some bold-italic and italic text', () => {
      expect(removeItalicFromText('???????????????????? and ????????????')).toBe('Alice and ????????????')
    })
  })
})
