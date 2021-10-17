import { splitTextInArray } from './array'
import {
  matchIsUnicodeBold,
  matchIsUnicodeLowerBold,
  matchIsUnicodeUpperBold
} from './bold'
import {
  unicodeBoldLowerToNormalText,
  unicodeBoldUpperToNormalText,
  unicodeItalicLowerToNormalText,
  unicodeItalicUpperToNormalText
} from './unicode'
import {
  matchIsUnicodeItalic,
  matchIsUnicodeLowerItalic,
  matchIsUnicodeUpperItalic
} from './italic'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'

export function formatNormal(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map(character => {
    const unicode = getUnicodeLetter(character)
    if (!matchIsNumber(unicode)) {
      return character
    }
    if (matchIsUnicodeBold(unicode)) {
      if (matchIsUnicodeUpperBold(unicode)) {
        return unicodeBoldUpperToNormalText(unicode)
      }
      if (matchIsUnicodeLowerBold(unicode)) {
        return unicodeBoldLowerToNormalText(unicode)
      }
    }
    if (matchIsUnicodeItalic(unicode)) {
      if (matchIsUnicodeUpperItalic(unicode)) {
        return unicodeItalicUpperToNormalText(unicode)
      }
      if (matchIsUnicodeLowerItalic(unicode)) {
        return unicodeItalicLowerToNormalText(unicode)
      }
    }
    return character
  })
  return textSplittedFormatted.join('')
}
