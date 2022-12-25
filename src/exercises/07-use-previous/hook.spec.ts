import {renderHook} from '@testing-library/react'

import {usePrevious} from './hook'

describe('usePrevious', () => {
  it('should return the previous value', () => {
    const {result, rerender} = renderHook(value => usePrevious(value), {
      initialProps: 'first',
    })

    expect(result.current).toBe(null)

    rerender('second')

    expect(result.current).toBe('first')

    rerender('third')

    expect(result.current).toBe('second')

    /** when the value is the same */
    rerender('third')

    expect(result.current).toBe('second')
  })

  describe('types', () => {
    it('hook should have the correct type inference', () => {
      const {result} = renderHook(() => usePrevious('first'))

      assertType<string | null>(result.current)
    })
  })
})
