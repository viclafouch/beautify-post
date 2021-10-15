export function matchIsNumber(value: unknown): value is number {
  return typeof value === 'number'
}
