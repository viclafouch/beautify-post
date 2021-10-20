import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase
} from './string'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'
import { formatBoldLetterToNormal, matchIsUnicodeBold } from './bold'
import { formatItalicLetterToNormal, matchIsUnicodeItalic } from './italic'
import { compose } from './compose'

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

type MatchIsTextIsBoldItalicOpts = {
  checkEveryLetters: boolean
}

const matchIsTextIsBoldItalicDefaultOpts: MatchIsTextIsBoldItalicOpts = {
  checkEveryLetters: true
}

export function matchIsTextIsBoldItalic(
  text: string,
  options = matchIsTextIsBoldItalicDefaultOpts
): boolean {
  if (matchIsTextEmpty(text)) {
    return false
  }
  const textSplitted = splitTextInArray(text)
  return options.checkEveryLetters
    ? textSplitted.every(matchIsLetterBoldItalic)
    : textSplitted.some(matchIsLetterBoldItalic)
}

export function formatNormalLetterToBoldItalic(normalLetter: string) {
  const unicode = getUnicodeLetter(normalLetter)
  if (!matchIsNumber(unicode) || !matchIsCharacterANormalLetter(normalLetter)) {
    return normalLetter
  }
  if (matchIsTextUppercase(normalLetter)) {
    return String.fromCodePoint(
      unicodes.boldItalic.A - unicodes.normal.A + unicode
    )
  } else {
    return String.fromCodePoint(
      unicodes.boldItalic.a - unicodes.normal.a + unicode
    )
  }
}

export function formatBoldItalicLetterToNormal(boldItalicLetter: string) {
  const unicode = getUnicodeLetter(boldItalicLetter)
  if (!matchIsNumber(unicode) || !matchIsUnicodeBoldItalic(unicode)) {
    return boldItalicLetter
  }
  if (matchIsUnicodeUpperBoldItalic(unicode)) {
    return String.fromCodePoint(
      unicodes.normal.A - unicodes.boldItalic.A + unicode
    )
  } else {
    return String.fromCodePoint(
      unicodes.normal.a - unicodes.boldItalic.a + unicode
    )
  }
}

export function formatBoldItalic(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map(letter => {
    const normalLetter = compose(
      formatBoldLetterToNormal,
      formatItalicLetterToNormal
    )(letter)
    return formatNormalLetterToBoldItalic(normalLetter)
  })
  return textSplittedFormatted.join('')
}
