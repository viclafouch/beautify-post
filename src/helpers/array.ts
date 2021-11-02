export function splitTextInArray(text: string): string[] {
  return Array.from(text)
}

export function matchIsLastArrayItem(item: unknown, array: unknown[]): boolean {
  return array[array.length - 1] === item
}
