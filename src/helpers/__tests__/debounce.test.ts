import { jest } from '@jest/globals'
import { debounce } from '@helpers/debounce'

jest.useFakeTimers()

describe('debounce', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let func: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let debouncedFunc: any

  beforeEach(() => {
    func = jest.fn()
    debouncedFunc = debounce(func, 300)
  })

  test('execute just once', () => {
    const func = jest.fn()
    debouncedFunc = debounce(func, 300)
    for (let i = 0; i < 100; i++) {
      debouncedFunc()
    }

    jest.runAllTimers()
    expect(func).toBeCalledTimes(1)
  })
})
