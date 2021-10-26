export function matchIsKeyboardEventBold(event: KeyboardEvent) {
  return (event.metaKey || event.ctrlKey) && event.key.toUpperCase() === 'B'
}

export function matchIsKeyboardEventItalic(event: KeyboardEvent) {
  return (event.metaKey || event.ctrlKey) && event.key.toUpperCase() === 'I'
}
