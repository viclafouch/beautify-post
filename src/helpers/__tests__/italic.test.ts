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

    it('should return true for a word in some italic letters (false)', () => {
      expect(
        matchIsTextIsItalic('𝘈lice', { checkEveryLetters: false })
      ).toBeTrue()
    })

    it('should return false for a word in some italic letters (true)', () => {
      expect(
        matchIsTextIsItalic('𝘈lice', { checkEveryLetters: true })
      ).toBeFalse()
    })

    it('should return false for a text bold or italic', () => {
      expect(matchIsTextIsItalic('𝐉𝐞𝐚𝐧 & 𝘑𝘦𝘢𝘯')).toBeFalse()
    })

    it('should return true for a bold-italic text', () => {
      expect(matchIsTextIsItalic('𝒇𝒐𝒐')).toBeTrue()
    })

    it('should return true for a bold-italic and bold text', () => {
      expect(matchIsTextIsItalic('𝒇𝒐𝒐 & 𝘣𝘢𝘳')).toBeTrue()
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

    it('should return bold string in bold-italic string', () => {
      expect(formatItalic('𝐟𝐨𝐨')).toBe('𝒇𝒐𝒐')
    })

    it('should return italic and bold strings in bold-string', () => {
      expect(formatItalic('𝐟𝐨𝐨 & 𝘣𝘢𝘳')).toBe('𝒇𝒐𝒐 & 𝘣𝘢𝘳')
    })

    it('should return string in italic with ponctuations', () => {
      expect(formatItalic('Alice, Jean & Bob')).toBe('𝘈𝘭𝘪𝘤𝘦, 𝘑𝘦𝘢𝘯 & 𝘉𝘰𝘣')
    })

    it('should return string in italic with already italic text', () => {
      expect(formatItalic('𝘈𝘭𝘪𝘤𝘦, Jean + BOB123')).toBe('𝘈𝘭𝘪𝘤𝘦, 𝘑𝘦𝘢𝘯 + 𝘉𝘖𝘉123')
    })
  })

  describe('removeItalicFromText', () => {
    it('should return a string', () => {
      expect(removeItalicFromText('𝘉𝘭𝘰𝘪𝘴')).toBeString()
    })

    it('should remove italic from full italic text', () => {
      expect(removeItalicFromText('𝘑𝘦𝘢𝘯𝘯𝘦')).toBe('Jeanne')
    })

    it('should remove italic from some italic text', () => {
      expect(removeItalicFromText('𝘈𝘭ic𝘦')).toBe('Alice')
    })

    it('should remove italic from full bold-italic text', () => {
      expect(removeItalicFromText('𝑩𝒍𝒐𝒊𝒔')).toBe('𝐁𝐥𝐨𝐢𝐬')
    })

    it('should remove italic from some bold-italic text', () => {
      expect(removeItalicFromText('Jeanne 𝑩𝒍𝒐𝒊𝒔')).toBe('Jeanne 𝐁𝐥𝐨𝐢𝐬')
    })

    it('should remove italic from some bold-italic and italic text', () => {
      expect(removeItalicFromText('𝘈𝘭𝘪𝘤𝘦 and 𝑩𝒐𝒃')).toBe('Alice and 𝐁𝐨𝐛')
    })
  })
})
