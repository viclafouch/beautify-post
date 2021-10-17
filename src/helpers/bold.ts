import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase
} from './boolean'
import {
  unicodeNormalLowerToBoldText,
  unicodeNormalUpperToBoldText
} from './unicode'
import { matchIsUnicodeItalic } from './italic'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'

export function matchIsUnicodeLowerBold(unicode: number): boolean {
  return unicode >= unicodes.bold.a && unicode <= unicodes.bold.z
}

export function matchIsUnicodeUpperBold(unicode: number): boolean {
  return unicode >= unicodes.bold.A && unicode <= unicodes.bold.Z
}

export function matchIsUnicodeBold(unicode: number): boolean {
  return matchIsUnicodeLowerBold(unicode) || matchIsUnicodeUpperBold(unicode)
}

export function matchIsTextIsBold(text: string): boolean {
  if (matchIsTextEmpty(text)) {
    return false
  }
  const textSplitted = splitTextInArray(text)
  return textSplitted.every(character => {
    const unicode = getUnicodeLetter(character)
    if (!matchIsNumber(unicode)) {
      return true
    }
    if (matchIsUnicodeItalic(unicode)) {
      return false
    }
    const isLowerBold = matchIsUnicodeLowerBold(unicode)
    const isUpperBold = matchIsUnicodeUpperBold(unicode)
    const isNormalLetter = matchIsCharacterANormalLetter(character)
    return isLowerBold || isUpperBold || !isNormalLetter
  })
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
