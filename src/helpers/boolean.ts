import { unicodes } from '@constants/unicode'
import { splitTextInArray } from './array'
import { matchIsNumber } from './number'
import { getUnicodeLetter } from './string'

export function matchIsTextUppercase(text: string): boolean {
  return text === text.toUpperCase()
}

export function matchIsSelectionTextEmpty(selection: Selection): boolean {
  return selection.toString().trim() === ''
}

export function matchIsUnicodeLowerBold(unicode: number): boolean {
  return unicode >= unicodes.bold.a && unicode <= unicodes.bold.z
}

export function matchIsUnicodeUpperBold(unicode: number): boolean {
  return unicode >= unicodes.bold.A && unicode <= unicodes.bold.Z
}

export function matchIsUnicodeBold(unicode: number): boolean {
  return matchIsUnicodeLowerBold(unicode) || matchIsUnicodeUpperBold(unicode)
}

export function matchIsUnicodeLowerItalic(unicode: number): boolean {
  return unicode >= unicodes.italic.a && unicode <= unicodes.italic.z
}

export function matchIsCharacterANormalLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char)
}

export function matchIsUnicodeUpperItalic(unicode: number): boolean {
  return unicode >= unicodes.italic.A && unicode <= unicodes.italic.Z
}

export function matchIsUnicodeItalic(unicode: number): boolean {
  return (
    matchIsUnicodeLowerItalic(unicode) || matchIsUnicodeUpperItalic(unicode)
  )
}

export function matchIsUnicodeFormatted(unicode: number): boolean {
  return matchIsUnicodeBold(unicode) || matchIsUnicodeItalic(unicode)
}

export function matchIsTextIsBold(text: string): boolean {
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

export function matchIsTextIsItalic(text: string): boolean {
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
