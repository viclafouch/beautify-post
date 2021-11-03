import { matchIsNumber } from './number'
import { matchIsUnicodeBold } from './bold'
import { compose } from './compose'
import { splitTextInArray } from './array'
import { formatBold, formatBoldLetterToNormal } from './bold'
import {
  formatItalic,
  formatItalicLetterToNormal,
  matchIsUnicodeItalic
} from './italic'
import {
  formatBoldItalicLetterToNormal,
  matchIsUnicodeBoldItalic
} from './bold-italic'
import { FormatType } from '@constants/format-type'

export function getUnicodeLetter(letter: string): undefined | number {
  return letter.codePointAt(0)
}

export function matchIsTextUppercase(text: string): boolean {
  return text === text.toUpperCase()
}

export function matchIsTextEmpty(text: string): boolean {
  return text.trim() === ''
}

export function matchIsCharacterANormalLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char[0])
}

export function matchIsTextUnknown(text: string): boolean {
  const textSplitted = splitTextInArray(text)
  return textSplitted.every(letter => {
    const unicode = getUnicodeLetter(letter)
    return (
      !matchIsNumber(unicode) ||
      (!matchIsUnicodeBold(unicode) &&
        !matchIsUnicodeItalic(unicode) &&
        !matchIsUnicodeBoldItalic(unicode) &&
        !matchIsCharacterANormalLetter(letter))
    )
  })
}

export function formatNormal(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map(letter => {
    return compose(
      formatBoldLetterToNormal,
      formatItalicLetterToNormal,
      formatBoldItalicLetterToNormal
    )(letter)
  })
  return textSplittedFormatted.join('')
}

export function formatTextByType(text: string, formatType: FormatType): string {
  if (formatType === FormatType.italic) {
    return formatItalic(text)
  } else if (formatType === FormatType.bold) {
    return formatBold(text)
  } else if (formatType === FormatType.normal) {
    return formatNormal(text)
  }
  return text
}
