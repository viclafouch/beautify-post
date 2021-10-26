export function splitTextInArray(text: string): string[] {
  return Array.from(text)
}

export function matchIsLastArrayItem(item: unknown, array: unknown[]) {
  return array[array.length - 1] === item
}
