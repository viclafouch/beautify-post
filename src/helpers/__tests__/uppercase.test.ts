import {
  formatUppercase,
  matchIsLetterIsUppercase,
  matchIsTextIsUppercase,
  removeUppercaseFromText
} from '@helpers/uppercase'

describe('helpers/uppercase', () => {
  describe('matchIsLetterIsUppercase', () => {
    it('should return a boolean', () => {
      expect(matchIsLetterIsUppercase('a')).toBeBoolean()
    })

    it('should return false for normal lowercase', () => {
      expect(matchIsLetterIsUppercase('a')).toBeFalse()
    })

    it('should return true for normal uppercase', () => {
      expect(matchIsLetterIsUppercase('A')).toBeTrue()
    })

    it('should return false for bold lowercase', () => {
      expect(matchIsLetterIsUppercase('𝐛')).toBeFalse()
    })

    it('should return true for bold uppercase', () => {
      expect(matchIsLetterIsUppercase('𝐁')).toBeTrue()
    })

    it('should return false for italic lowercase', () => {
      expect(matchIsLetterIsUppercase('𝘤')).toBeFalse()
    })

    it('should return true for italic uppercase', () => {
      expect(matchIsLetterIsUppercase('𝘊')).toBeTrue()
    })

    it('should return false for bold italic lowercase', () => {
      expect(matchIsLetterIsUppercase('𝒍')).toBeFalse()
    })

    it('should return true for bold italic uppercase', () => {
      expect(matchIsLetterIsUppercase('𝑳')).toBeTrue()
    })

    it('should return true for letters like ÀÈÙÇ', () => {
      expect(matchIsLetterIsUppercase('À')).toBeTrue()
    })
  })

  describe('matchIsTextIsUppercase', () => {
    it('should return a boolean', () => {
      expect(matchIsTextIsUppercase('abcdef')).toBeBoolean()
    })

    it('should return false for normal lowercase', () => {
      expect(matchIsTextIsUppercase('abcdef')).toBeFalse()
    })

    it('should return true for normal uppercase', () => {
      expect(matchIsTextIsUppercase('ABCDEF')).toBeTrue()
    })

    it('should return false for bold lowercase', () => {
      expect(matchIsTextIsUppercase('𝐚𝐛𝐜𝐝𝐞𝐟')).toBeFalse()
    })

    it('should return true for bold uppercase', () => {
      expect(matchIsTextIsUppercase('𝐀𝐁𝐂𝐃𝐄𝐅')).toBeTrue()
    })

    it('should return false for italic lowercase', () => {
      expect(matchIsTextIsUppercase('𝘢𝘣𝘤𝘥𝘦𝘧')).toBeFalse()
    })

    it('should return true for italic uppercase', () => {
      expect(matchIsTextIsUppercase('𝘈𝘉𝘊𝘋𝘌𝘍')).toBeTrue()
    })

    it('should return false for bold italic lowercase', () => {
      expect(matchIsTextIsUppercase('𝒂𝒃𝒄𝒅𝒆𝒇')).toBeFalse()
    })

    it('should return true for bold italic uppercase', () => {
      expect(matchIsTextIsUppercase('𝑨𝑩𝑪𝑫𝑬𝑭')).toBeTrue()
    })

    it('should return true for letters like ÀÈÙÇ', () => {
      expect(matchIsTextIsUppercase('ÀÈÙÇ')).toBeTrue()
    })
  })

  describe('removeUppercaseFromText', () => {
    it('should return a string', () => {
      expect(removeUppercaseFromText('abcdef')).toBeString()
    })

    it('should return a full normal lowercased text', () => {
      expect(removeUppercaseFromText('ABCDEF')).toBe('abcdef')
    })

    it('should return the same text when no uppercased text', () => {
      expect(removeUppercaseFromText('abcdef')).toBe('abcdef')
    })

    it('should return a text with good format (bold) but in lowercase', () => {
      expect(removeUppercaseFromText('𝐀𝐁𝐂𝐃𝐄𝐅')).toBe('𝐚𝐛𝐜𝐝𝐞𝐟')
    })

    it('should return a text with good format (italic) but in lowercase', () => {
      expect(removeUppercaseFromText('𝘈𝘉𝘊𝘋𝘌𝘍')).toBe('𝘢𝘣𝘤𝘥𝘦𝘧')
    })

    it('should return a text with good format (bold italic) but in lowercase', () => {
      expect(removeUppercaseFromText('𝑨𝑩𝑪𝑫𝑬𝑭')).toBe('𝒂𝒃𝒄𝒅𝒆𝒇')
    })

    it('should uncapitalize letters like "ÀÈÙÇ"..', () => {
      expect(removeUppercaseFromText('ÀÈÙÇ')).toBe('àèùç')
    })
  })

  describe('formatUppercase', () => {
    it('should return a normal text to uppercase', () => {
      expect(formatUppercase('hello world, i am Pierre')).toBe(
        'HELLO WORLD, I AM PIERRE'
      )
    })

    it('should return a bold text in uppercase', () => {
      expect(formatUppercase('𝐇𝐞𝐲 ! 𝐈 𝐡𝐚𝐯𝐞 2 𝐚𝐩𝐩𝐥𝐞𝐬')).toBe(
        '𝐇𝐄𝐘 ! 𝐈 𝐇𝐀𝐕𝐄 2 𝐀𝐏𝐏𝐋𝐄𝐒'
      )
    })

    it('should return a italic text in uppercase', () => {
      expect(formatUppercase('𝘐 𝘸𝘰𝘳𝘬 𝘪𝘯 𝘗𝘢𝘳𝘪𝘴, 𝘢 𝘣𝘦𝘢𝘶𝘵𝘪𝘧𝘶𝘭 𝘤𝘪𝘵𝘺 👨🏻‍💻')).toBe(
        '𝘐 𝘞𝘖𝘙𝘒 𝘐𝘕 𝘗𝘈𝘙𝘐𝘚, 𝘈 𝘉𝘌𝘈𝘜𝘛𝘐𝘍𝘜𝘓 𝘊𝘐𝘛𝘠 👨🏻‍💻'
      )
    })

    it('should return a bold italic text in uppercase', () => {
      expect(formatUppercase('𝑾𝒉𝒂𝒕 𝒊𝒔 𝒚𝒐𝒖𝒓 𝒏𝒂𝒎𝒆 _𝒑𝒂𝒅𝒂𝒘𝒂𝒏_ ?')).toBe(
        '𝑾𝑯𝑨𝑻 𝑰𝑺 𝒀𝑶𝑼𝑹 𝑵𝑨𝑴𝑬 _𝑷𝑨𝑫𝑨𝑾𝑨𝑵_ ?'
      )
    })

    it('should capitalize letters like "àèùç.."', () => {
      expect(formatUppercase('àèùç')).toBe('ÀÈÙÇ')
    })
  })
})
