export function getUnicodeLetter(letter: string): undefined | number {
  return letter.codePointAt(0)
}
