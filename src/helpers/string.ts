import { FormatType } from '@constants/format-type'
import { splitTextInArray } from './array'
import {
  formatBold,
  formatBoldLetterToNormal,
  matchIsUnicodeBold
} from './bold'
import {
  formatBoldItalicLetterToNormal,
  matchIsUnicodeBoldItalic
} from './bold-italic'
import { compose } from './compose'
import {
  formatItalic,
  formatItalicLetterToNormal,
  matchIsUnicodeItalic
} from './italic'
import { matchIsNumber } from './number'
import { formatUppercase } from './uppercase'

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
  return textSplitted.every((letter) => {
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
  const textSplittedFormatted = textSplitted.map((letter) => {
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
  }
  if (formatType === FormatType.bold) {
    return formatBold(text)
  }
  if (formatType === FormatType.normal) {
    return formatNormal(text)
  }
  if (formatType === FormatType.uppercase) {
    return formatUppercase(text)
  }
  return text
}
