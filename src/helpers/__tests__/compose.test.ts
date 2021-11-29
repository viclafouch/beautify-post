import { compose } from '@helpers/compose'

describe('helpers/compose', () => {
  describe('compose', () => {
    it('should return the correct last value', () => {
      const fn1 = (value: string): string => {
        return `fn1(${value})`
      }
      const fn2 = (value: string): string => {
        return `fn2(${value})`
      }
      const fn3 = (value: string): string => {
        return `fn3(${value})`
      }
      const composedFunction = compose(fn1, fn2, fn3)
      expect(composedFunction('inner')).toBe('fn1(fn2(fn3(inner)))')
    })
  })
})
