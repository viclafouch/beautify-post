import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import {
  matchIsTextUppercase,
  matchIsUnicodeLowerBold,
  matchIsUnicodeUpperBold
} from './boolean'
import { matchIsNumber } from './number'

export function getUnicodeLetter(letter: string): undefined | number {
  return letter.codePointAt(0)
}

export function formatBold(text: string): string {
  return text.replace(/[A-Za-z]/g, normalLetter => {
    const unicode = getUnicodeLetter(normalLetter)
    if (!matchIsNumber(unicode)) {
      return normalLetter
    }
    if (matchIsTextUppercase(normalLetter)) {
      return String.fromCodePoint(unicodes.bold.A - unicodes.normal.A + unicode)
    } else {
      return String.fromCodePoint(unicodes.bold.a - unicodes.normal.a + unicode)
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
    if (matchIsUnicodeUpperBold(unicode)) {
      return String.fromCodePoint(unicodes.normal.A - unicodes.bold.A + unicode)
    }
    if (matchIsUnicodeLowerBold(unicode)) {
      return String.fromCodePoint(unicodes.normal.a - unicodes.bold.a + unicode)
    }
    return character
  })
  return textSplittedFormatted.join('')
}
