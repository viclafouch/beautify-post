export function matchIsKeyboardEventBold(event: KeyboardEvent): boolean {
  return (event.metaKey || event.ctrlKey) && event.key.toUpperCase() === 'B'
}

export function matchIsKeyboardEventItalic(event: KeyboardEvent): boolean {
  return (event.metaKey || event.ctrlKey) && event.key.toUpperCase() === 'I'
}
