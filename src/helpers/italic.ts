import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import { matchIsUnicodeBold } from './bold'
import {
  matchIsCharacterANormalLetter,
  matchIsTextEmpty,
  matchIsTextUppercase
} from './boolean'
import {
  unicodeNormalLowerToItalicText,
  unicodeNormalUpperToItalicText
} from './unicode'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'

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
    const isLowerItalic = matchIsUnicodeLowerItalic(unicode)
    const isUpperItalic = matchIsUnicodeUpperItalic(unicode)
    const isNormalLetter = matchIsCharacterANormalLetter(character)
    return isLowerItalic || isUpperItalic || !isNormalLetter
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
