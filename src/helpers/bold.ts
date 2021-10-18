import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase
} from './string'
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

export function formatNormalLetterToBold(normalLetter: string) {
  const unicode = getUnicodeLetter(normalLetter)
  if (!matchIsNumber(unicode) || !matchIsCharacterANormalLetter(normalLetter)) {
    return normalLetter
  }
  if (matchIsTextUppercase(normalLetter)) {
    return String.fromCodePoint(unicodes.bold.A - unicodes.normal.A + unicode)
  } else {
    return String.fromCodePoint(unicodes.bold.a - unicodes.normal.a + unicode)
  }
}

export function formatBoldLetterToNormal(boldLetter: string) {
  const unicode = getUnicodeLetter(boldLetter)
  if (!matchIsNumber(unicode) || !matchIsUnicodeBold(unicode)) {
    return boldLetter
  }
  if (matchIsUnicodeUpperBold(unicode)) {
    return String.fromCodePoint(unicodes.normal.A - unicodes.bold.A + unicode)
  } else {
    return String.fromCodePoint(unicodes.normal.a - unicodes.bold.a + unicode)
  }
}

export function formatBold(text: string): string {
  return text.replace(/[A-Za-z]/g, formatNormalLetterToBold)
}
