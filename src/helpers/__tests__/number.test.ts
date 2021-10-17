import { matchIsNumber } from '@helpers/number'

describe('helpers/number', () => {
  describe('matchIsNumber', () => {
    it('should return a boolean', () => {
      expect(matchIsNumber(0)).toBeBoolean()
    })

    it('should return true for a number', () => {
      expect(matchIsNumber(0)).toBeTrue()
    })

    it('should return false for a numeric number', () => {
      expect(matchIsNumber('1')).toBeFalse()
    })

    test.each([
      { value: '' },
      { value: {} },
      { value: null },
      { value: false },
      { value: undefined },
      { value: [] },
      { value: new Array(1) },
      { value: Symbol('foo') }
    ])('should return false for `$value`', ({ value }) => {
      expect(matchIsNumber(value)).toBeFalse()
    })
  })
})
