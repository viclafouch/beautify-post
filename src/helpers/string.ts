import { unicodes } from '@constants/unicode'

function matchIsTextUppercase(text: string): boolean {
  return text === text.toUpperCase()
}

export function matchIsSelectionTextEmpty(selection: Selection): boolean {
  return selection.toString().trim() === ''
}

export function formatBold(text: string): string {
  return text.replace(/[A-Za-z]/g, letter => {
    const unicode = letter.codePointAt(0) as number
    if (matchIsTextUppercase(letter)) {
      if (unicode !== unicodes.bold.upper) {
        return String.fromCodePoint(
          unicodes.bold.upper - unicodes.normal.upper + unicode
        )
      }
    } else {
      if (unicode !== unicodes.bold.lower) {
        return String.fromCodePoint(
          unicodes.bold.lower - unicodes.normal.lower + unicode
        )
      }
    }
    return letter
  })
}
