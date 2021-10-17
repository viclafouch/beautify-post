export function matchIsTextUppercase(text: string): boolean {
  return text === text.toUpperCase()
}

export function matchIsTextEmpty(text: string): boolean {
  return text.trim() === ''
}

export function matchIsCharacterANormalLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char[0])
}
