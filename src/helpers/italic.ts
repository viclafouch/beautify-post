import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import { formatBoldLetterToNormal, matchIsUnicodeBold } from './bold'
import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase
} from './string'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'
import {
  formatNormalLetterToBoldItalic,
  matchIsUnicodeBoldItalic
} from './bold-italic'

export function matchIsUnicodeLowerItalic(unicode: number): boolean {
  return unicode >= unicodes.italic.a && unicode <= unicodes.italic.z
}

export function matchIsUnicodeUpperItalic(unicode: number): boolean {
  return unicode >= unicodes.italic.A && unicode <= unicodes.italic.Z
}

export function matchIsUnicodeItalic(unicode: number): boolean {
  return (
    matchIsUnicodeLowerItalic(unicode) || matchIsUnicodeUpperItalic(unicode)
  )
}

export function matchIsTextIsItalic(text: string): boolean {
  if (matchIsTextEmpty(text)) {
    return false
  }
  const textSplitted = splitTextInArray(text)
  return textSplitted.every(character => {
    const unicode = getUnicodeLetter(character)
    if (!matchIsNumber(unicode)) {
      return true
    }
    if (matchIsUnicodeBold(unicode)) {
      return false
    }

    return (
      matchIsUnicodeBoldItalic(unicode) ||
      matchIsUnicodeItalic(unicode) ||
      !matchIsCharacterANormalLetter(character)
    )
  })
}

export function formatNormalLetterToItalic(normalLetter: string) {
  const unicode = getUnicodeLetter(normalLetter)
  if (!matchIsNumber(unicode) || !matchIsCharacterANormalLetter(normalLetter)) {
    return normalLetter
  }
  if (matchIsTextUppercase(normalLetter)) {
    return String.fromCodePoint(unicodes.italic.A - unicodes.normal.A + unicode)
  } else {
    return String.fromCodePoint(unicodes.italic.a - unicodes.normal.a + unicode)
  }
}

export function formatItalicLetterToNormal(boldLetter: string) {
  const unicode = getUnicodeLetter(boldLetter)
  if (!matchIsNumber(unicode) || !matchIsUnicodeItalic(unicode)) {
    return boldLetter
  }
  if (matchIsUnicodeUpperItalic(unicode)) {
    return String.fromCodePoint(unicodes.normal.A - unicodes.italic.A + unicode)
  } else {
    return String.fromCodePoint(unicodes.normal.a - unicodes.italic.a + unicode)
  }
}

export function formatItalic(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map(letter => {
    const unicode = getUnicodeLetter(letter)
    if (!matchIsNumber(unicode)) {
      return letter
    }
    if (matchIsUnicodeBold(unicode)) {
      return formatNormalLetterToBoldItalic(formatBoldLetterToNormal(letter))
    }
    return formatNormalLetterToItalic(letter)
  })
  return textSplittedFormatted.join('')
}
