import { unicodes } from '@constants/unicode'

export function unicodeBoldLowerToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.a - unicodes.bold.a + unicode)
}

export function unicodeBoldUpperToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.A - unicodes.bold.A + unicode)
}

export function unicodeItalicLowerToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.a - unicodes.italic.a + unicode)
}

export function unicodeItalicUpperToNormalText(unicode: number): string {
  return String.fromCodePoint(unicodes.normal.A - unicodes.italic.A + unicode)
}
