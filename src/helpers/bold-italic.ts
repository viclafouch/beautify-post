import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import { formatBoldLetterToNormal, matchIsUnicodeBold } from './bold'
import { compose } from './compose'
import { formatItalicLetterToNormal, matchIsUnicodeItalic } from './italic'
import { matchIsNumber } from './number'
import {
  getUnicodeLetter,
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUnknown,
  matchIsTextUppercase
} from './string'

export function matchIsUnicodeLowerBoldItalic(unicode: number): boolean {
  return unicode >= unicodes.boldItalic.a && unicode <= unicodes.boldItalic.z
}

export function matchIsUnicodeUpperBoldItalic(unicode: number): boolean {
  return unicode >= unicodes.boldItalic.A && unicode <= unicodes.boldItalic.Z
}

export function matchIsUnicodeBoldItalic(unicode: number): boolean {
  return (
    matchIsUnicodeLowerBoldItalic(unicode) ||
    matchIsUnicodeUpperBoldItalic(unicode)
  )
}

export function matchIsLetterBoldItalic(letter: string): boolean {
  const unicode = getUnicodeLetter(letter)
  if (!matchIsNumber(unicode)) {
    return true
  }
  if (matchIsUnicodeBold(unicode) || matchIsUnicodeItalic(unicode)) {
    return false
  }
  return (
    matchIsUnicodeBoldItalic(unicode) || !matchIsCharacterANormalLetter(letter)
  )
}

export function matchIsTextIsBoldItalic(text: string): boolean {
  if (matchIsTextEmpty(text) || matchIsTextUnknown(text)) {
    return false
  }
  const textSplitted = splitTextInArray(text)
  return textSplitted.every(matchIsLetterBoldItalic)
}

export function formatNormalLetterToBoldItalic(normalLetter: string): string {
  const unicode = getUnicodeLetter(normalLetter)
  if (!matchIsNumber(unicode) || !matchIsCharacterANormalLetter(normalLetter)) {
    return normalLetter
  }
  if (matchIsTextUppercase(normalLetter)) {
    return String.fromCodePoint(
      unicodes.boldItalic.A - unicodes.normal.A + unicode
    )
  }
  return String.fromCodePoint(
    unicodes.boldItalic.a - unicodes.normal.a + unicode
  )
}

export function formatBoldItalicLetterToNormal(
  boldItalicLetter: string
): string {
  const unicode = getUnicodeLetter(boldItalicLetter)
  if (!matchIsNumber(unicode) || !matchIsUnicodeBoldItalic(unicode)) {
    return boldItalicLetter
  }
  if (matchIsUnicodeUpperBoldItalic(unicode)) {
    return String.fromCodePoint(
      unicodes.normal.A - unicodes.boldItalic.A + unicode
    )
  }
  return String.fromCodePoint(
    unicodes.normal.a - unicodes.boldItalic.a + unicode
  )
}

export function formatBoldItalic(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map((letter) => {
    const normalLetter = compose(
      formatBoldLetterToNormal,
      formatItalicLetterToNormal
    )(letter)
    return formatNormalLetterToBoldItalic(normalLetter)
  })
  return textSplittedFormatted.join('')
}
