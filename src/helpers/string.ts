import { compose } from './compose'
import { splitTextInArray } from './array'
import {
  formatBold,
  formatBoldLetterToNormal,
  matchIsTextIsBold,
  removeBoldFromText
} from './bold'
import {
  formatItalic,
  formatItalicLetterToNormal,
  matchIsTextIsItalic,
  removeItalicFromText
} from './italic'
import {
  formatBoldItalicLetterToNormal,
  matchIsTextIsBoldItalic
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
    const isFullItalic =
      matchIsTextIsBoldItalic(text) || matchIsTextIsItalic(text)
    if (isFullItalic) {
      return removeItalicFromText(text)
    }
    return formatItalic(text)
  } else if (formatType === FormatType.bold) {
    const isFullBold = matchIsTextIsBoldItalic(text) || matchIsTextIsBold(text)
    if (isFullBold) {
      return removeBoldFromText(text)
    }
    return formatBold(text)
  }
  return text
}
