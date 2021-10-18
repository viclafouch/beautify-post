import { compose } from './compose'
import { splitTextInArray } from './array'
import { formatBoldLetterToNormal } from './bold'
import { formatItalicLetterToNormal } from './italic'

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
    return compose(formatBoldLetterToNormal, formatItalicLetterToNormal)(letter)
  })
  return textSplittedFormatted.join('')
}
