import { splitTextInArray } from '@helpers/array'
import {
  formatBold,
  matchIsTextIsBold,
  removeBoldFromText
} from '@helpers/bold'
import {
  formatBoldItalic,
  formatBoldItalicLetterToNormal,
  formatNormalLetterToBoldItalic,
  matchIsTextIsBoldItalic
} from '@helpers/bold-italic'
import {
  formatItalic,
  matchIsTextIsItalic,
  removeItalicFromText
} from '@helpers/italic'
import { matchIsTextEmpty } from '@helpers/string'

export function matchIsLetterIsUppercase(letter: string): boolean {
  if (matchIsTextIsBoldItalic(letter)) {
    const normalLetter = formatBoldItalicLetterToNormal(letter)
    return normalLetter.toUpperCase() === normalLetter
  }
  if (matchIsTextIsBold(letter)) {
    const normalLetter = removeBoldFromText(letter)
    return normalLetter.toUpperCase() === normalLetter
  }
  if (matchIsTextIsItalic(letter)) {
    const normalLetter = removeItalicFromText(letter)
    return normalLetter.toUpperCase() === normalLetter
  }
  return letter === letter.toUpperCase()
}

export function matchIsTextIsUppercase(text: string): boolean {
  if (matchIsTextEmpty(text)) {
    return false
  }
  return splitTextInArray(text).every(matchIsLetterIsUppercase)
}

export function formatNormalToUppercase(text: string): string {
  return text.toUpperCase()
}

export function formatUppercaseToNormal(text: string): string {
  return text.toLowerCase()
}

export function removeUppercaseFromText(text: string): string {
  const textSplittedFormatted = splitTextInArray(text).map((letter) => {
    if (!matchIsLetterIsUppercase(letter)) {
      return letter
    }
    if (matchIsTextIsBoldItalic(letter)) {
      const letterFormatted = formatBoldItalicLetterToNormal(letter)
      return formatNormalLetterToBoldItalic(
        formatUppercaseToNormal(letterFormatted)
      )
    }
    if (matchIsTextIsBold(letter)) {
      const letterFormatted = removeBoldFromText(letter)
      return formatBold(formatUppercaseToNormal(letterFormatted))
    }
    if (matchIsTextIsItalic(letter)) {
      const letterFormatted = removeItalicFromText(letter)
      return formatItalic(formatUppercaseToNormal(letterFormatted))
    }
    return formatUppercaseToNormal(letter)
  })
  return textSplittedFormatted.join('')
}

export function formatUppercase(text: string): string {
  const textSplitted = splitTextInArray(text)
  const textSplittedFormatted = textSplitted.map((letter) => {
    if (matchIsTextIsBoldItalic(letter)) {
      return formatBoldItalic(
        formatNormalToUppercase(formatBoldItalicLetterToNormal(letter))
      )
    }
    if (matchIsTextIsBold(letter)) {
      return formatBold(formatNormalToUppercase(removeBoldFromText(letter)))
    }
    if (matchIsTextIsItalic(letter)) {
      return formatItalic(formatNormalToUppercase(removeItalicFromText(letter)))
    }
    return formatNormalToUppercase(letter)
  })
  return textSplittedFormatted.join('')
}
