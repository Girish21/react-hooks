import {act, renderHook, waitFor} from '@testing-library/react'
import * as React from 'react'

import {useAsync} from './hook'

describe('useAsync', () => {
  it('should be in the idle state initially', () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.resolve('data'), [])),
    )

    expect(result.current.status).toBe('idle')
  })

  it('should be in the pending state when the promise is pending', async () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.resolve('data'), [])),
    )

    act(() => {
      result.current.execute()
    })

    await waitFor(() => expect(result.current.status).toBe('pending'))
  })

  it('should be in the resolved state when the promise is resolved', async () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.resolve('data'), [])),
    )

    act(() => {
      result.current.execute()
    })

    await waitFor(() => expect(result.current.status).toBe('resolved'))
  })

  it('should be in the rejected state when the promise is rejected', async () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.reject('error'), [])),
    )

    act(() => {
      result.current.execute()
    })

    await waitFor(() => expect(result.current.status).toBe('rejected'))
  })

  it('should return the data when the promise is resolved', async () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.resolve('data'), [])),
    )

    act(() => {
      result.current.execute()
    })

    await waitFor(() => expect(result.current.data).toBe('data'))
  })

  it('should return the error when the promise is rejected', async () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.reject('error'), [])),
    )

    act(() => {
      result.current.execute()
    })

    await waitFor(() => expect(result.current.error).toBe('error'))
  })

  it('should execute the promise immediately when immediate is true', async () => {
    const {result} = renderHook(() =>
      useAsync(
        React.useCallback(() => Promise.resolve('data'), []),
        true,
      ),
    )

    await waitFor(() => expect(result.current.status).toBe('resolved'))
  })

  it('should not execute the promise immediately when immediate is false', async () => {
    const {result} = renderHook(() =>
      useAsync(React.useCallback(() => Promise.resolve('data'), [])),
    )

    await waitFor(() => expect(result.current.status).toBe('idle'))
  })

  describe('types', () => {
    describe('should infer the data type from the promise', () => {
      it('number', async () => {
        const {result} = renderHook(() =>
          useAsync(React.useCallback(() => Promise.resolve(123), [])),
        )

        act(() => {
          result.current.execute()
        })

        await waitFor(() => expect(result.current.status).toBe('resolved'))

        assertType<number | null>(result.current.data)
      })

      it('string', async () => {
        const {result} = renderHook(() =>
          useAsync(React.useCallback(() => Promise.resolve('123'), [])),
        )

        act(() => {
          result.current.execute()
        })

        await waitFor(() => expect(result.current.status).toBe('resolved'))

        assertType<string | null>(result.current.data)
      })

      it('array', async () => {
        const {result} = renderHook(() =>
          useAsync(React.useCallback(() => Promise.resolve(['123']), [])),
        )

        act(() => {
          result.current.execute()
        })

        await waitFor(() => expect(result.current.status).toBe('resolved'))

        assertType<Array<string> | null>(result.current.data)
      })

      it('object', async () => {
        const {result} = renderHook(() =>
          useAsync(
            React.useCallback(() => Promise.resolve({name: 'vitest'}), []),
          ),
        )

        act(() => {
          result.current.execute()
        })

        await waitFor(() => expect(result.current.status).toBe('resolved'))

        assertType<{name: string} | null>(result.current.data)
      })
    })

    describe('should infer the error type from the promise', () => {
      it('object', async () => {
        const {result} = renderHook(() =>
          useAsync<unknown, {name: string}>(
            React.useCallback(
              () => Promise.reject<{name: string}>({name: '123'}),
              [],
            ),
          ),
        )

        act(() => {
          result.current.execute()
        })

        await waitFor(() => expect(result.current.status).toBe('rejected'))

        assertType<{name: string} | null>(result.current.error)
      })
    })
  })
})
