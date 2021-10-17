import { unicodes } from '@constants/unicode'
import { unicodeNormalUpperToBoldText } from '@helpers/unicode'
import { range } from './utils'

describe('helpers/unicode', () => {
  describe('unicodeNormalUpperToBoldText', () => {
    it('should return a string', () => {
      const currentUnicode = 'A'.codePointAt(0) as number
      expect(unicodeNormalUpperToBoldText(currentUnicode)).toBeString()
    })

    it('should return the letter upper in bold', () => {
      const currentUnicode = 'A'.codePointAt(0) as number
      expect(unicodeNormalUpperToBoldText(currentUnicode)).toBe('𝐀')
    })

    it('should return A be transform to 𝐀, B in 𝐁, etc..', () => {
      const boldUnicodes = range(unicodes.bold.A, unicodes.bold.Z)
      let index = 0
      const matchIsUpperBoldLetter = (unicode: number) => {
        const letter = unicodeNormalUpperToBoldText(unicode)
        const isSatisfy = letter.codePointAt(0) === boldUnicodes[index]
        index++
        return isSatisfy
      }
      const normalUnicodes = range(unicodes.normal.A, unicodes.normal.Z)
      expect(normalUnicodes).toSatisfyAll(matchIsUpperBoldLetter)
    })

    it('should throw an error', () => {
      expect(() => {
        unicodeNormalUpperToBoldText(Infinity)
      }).toThrow()
    })
  })
})
