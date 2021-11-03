import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase,
  matchIsTextUnknown
} from './string'
import {
  formatItalicLetterToNormal,
  formatNormalLetterToItalic,
  matchIsUnicodeItalic
} from './italic'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'
import {
  formatBoldItalicLetterToNormal,
  formatNormalLetterToBoldItalic,
  matchIsTextIsBoldItalic,
  matchIsUnicodeBoldItalic
} from './bold-italic'

export function matchIsUnicodeLowerBold(unicode: number): boolean {
  return unicode >= unicodes.bold.a && unicode <= unicodes.bold.z
}

export function matchIsUnicodeUpperBold(unicode: number): boolean {
  return unicode >= unicodes.bold.A && unicode <= unicodes.bold.Z
}

export function matchIsUnicodeBold(unicode: number): boolean {
  return matchIsUnicodeLowerBold(unicode) || matchIsUnicodeUpperBold(unicode)
}

function matchIsLetterBold(letter: string): boolean {
  const unicode = getUnicodeLetter(letter)
  if (!matchIsNumber(unicode)) {
    return true
  }
  if (matchIsUnicodeItalic(unicode)) {
    return false
  }
  return (
    matchIsUnicodeBoldItalic(unicode) ||
    matchIsUnicodeBold(unicode) ||
    !matchIsCharacterANormalLetter(letter)
  )
}

export function matchIsTextIsBold(text: string): boolean {
  if (matchIsTextEmpty(text) || matchIsTextUnknown(text)) {
    return false
  }
  const textSplitted = splitTextInArray(text)
  return textSplitted.every(matchIsLetterBold)
}

export function formatNormalLetterToBold(normalLetter: string): string {
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

export function formatBoldLetterToNormal(boldLetter: string): string {
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

export function removeBoldFromText(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map(letter => {
    if (matchIsTextIsBoldItalic(letter)) {
      const normalLetter = formatBoldItalicLetterToNormal(letter)
      return formatNormalLetterToItalic(normalLetter)
    } else if (matchIsTextIsBold(letter)) {
      return formatBoldLetterToNormal(letter)
    } else {
      return letter
    }
  })
  return textSplittedFormatted.join('')
}

export function formatBold(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map(letter => {
    const unicode = getUnicodeLetter(letter)
    if (!matchIsNumber(unicode)) {
      return letter
    }
    if (matchIsUnicodeItalic(unicode)) {
      return formatNormalLetterToBoldItalic(formatItalicLetterToNormal(letter))
    }
    return formatNormalLetterToBold(letter)
  })
  return textSplittedFormatted.join('')
}
