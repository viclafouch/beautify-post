import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import {
  matchIsTextUppercase,
  matchIsUnicodeBold,
  matchIsUnicodeItalic,
  matchIsUnicodeLowerBold,
  matchIsUnicodeLowerItalic,
  matchIsUnicodeUpperBold,
  matchIsUnicodeUpperItalic
} from './boolean'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'

export function unicodeNormalUpperToBoldText(unicode: number): string {
  return String.fromCodePoint(unicodes.bold.A - unicodes.normal.A + unicode)
}

export function unicodeNormalLowerToBoldText(unicode: number): string {
  return String.fromCodePoint(unicodes.bold.a - unicodes.normal.a + unicode)
}

export function unicodeNormalUpperToItalicText(unicode: number): string {
  return String.fromCodePoint(unicodes.italic.A - unicodes.normal.A + unicode)
}

export function unicodeNormalLowerToItalicText(unicode: number): string {
  return String.fromCodePoint(unicodes.italic.a - unicodes.normal.a + unicode)
}

export function unicodeBoldLowerToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.a - unicodes.bold.a + unicode)
}

export function unicodeBoldUpperToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.A - unicodes.bold.A + unicode)
}

export function unicodeItalicLowerToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.a - unicodes.italic.a + unicode)
}

export function unicodeItalicUpperToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.A - unicodes.italic.A + unicode)
}

export function formatBold(text: string): string {
  return text.replace(/[A-Za-z]/g, normalLetter => {
    const unicode = getUnicodeLetter(normalLetter)
    if (!matchIsNumber(unicode)) {
      return normalLetter
    }
    if (matchIsTextUppercase(normalLetter)) {
      return unicodeNormalUpperToBoldText(unicode)
    } else {
      return unicodeNormalLowerToBoldText(unicode)
    }
  })
}

export function formatItalic(text: string): string {
  return text.replace(/[A-Za-z]/g, normalLetter => {
    const unicode = getUnicodeLetter(normalLetter)
    if (!matchIsNumber(unicode)) {
      return normalLetter
    }
    if (matchIsTextUppercase(normalLetter)) {
      return unicodeNormalUpperToItalicText(unicode)
    } else {
      return unicodeNormalLowerToItalicText(unicode)
    }
  })
}

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
