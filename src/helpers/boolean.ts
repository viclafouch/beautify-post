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

export function matchIsCharacterANormalLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char)
}

export function matchIsUnicodeLowerBold(unicode: number): boolean {
  return unicode >= unicodes.bold.a && unicode <= unicodes.bold.z
}

export function matchIsUnicodeUpperBold(unicode: number): boolean {
  return unicode >= unicodes.bold.A && unicode <= unicodes.bold.Z
}

export function matchIsTextIsBold(text: string): boolean {
  const textSplitted = splitTextInArray(text)
  return textSplitted.every(character => {
    const unicode = getUnicodeLetter(character)
    if (!matchIsNumber(unicode)) {
      return true
    }
    const isLowerBold = matchIsUnicodeLowerBold(unicode)
    const isUpperBold = matchIsUnicodeUpperBold(unicode)
    const isNormalLetter = matchIsCharacterANormalLetter(character)
    return isLowerBold || isUpperBold || !isNormalLetter
  })
}
