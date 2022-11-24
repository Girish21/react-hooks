import {act, renderHook} from '@testing-library/react'

import {usePersist} from './hook'

describe('usePersist', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('with initial value and persisted in local storage', () => {
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('count', 0))

    expect(result.current[0]).toEqual(0)
    expect(window.localStorage.setItem).toHaveBeenCalledWith('count', '0')
  })

  it('initial value from localStorage - number', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('1')
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('count', 0))

    expect(result.current[0]).toEqual(1)
    expect(window.localStorage.getItem).toHaveBeenCalledWith('count')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('count', '1')
  })

  it('initial value from localStorage - string', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('"hello"')
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('greeting', ''))

    expect(result.current[0]).toEqual('hello')
    expect(window.localStorage.getItem).toHaveBeenCalledWith('greeting')
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'greeting',
      '"hello"',
    )
  })

  it('initial value from localStorage - array', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('[1,2]')
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('marks', []))

    expect(result.current[0]).toEqual([1, 2])
    expect(window.localStorage.getItem).toHaveBeenCalledWith('marks')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('marks', '[1,2]')
  })

  it('initial value from localStorage - object', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(
      '{"name": "vitest"}',
    )
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('user', {}))

    expect(result.current[0]).toEqual({name: 'vitest'})
    expect(window.localStorage.getItem).toHaveBeenCalledWith('user')
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'user',
      '{"name":"vitest"}',
    )
  })

  it('initial value from localStorage - invalid JSON', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('invalid')
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('user', {name: ''}))

    expect(result.current[0]).toEqual({name: ''})
    expect(window.localStorage.getItem).toHaveBeenCalledWith('user')
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'user',
      '{"name":""}',
    )
  })

  it('update value', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('1')
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('count', 0))

    act(() => {
      result.current[1](2)
    })

    expect(result.current[0]).toEqual(2)
    expect(window.localStorage.setItem).toHaveBeenCalledWith('count', '2')
  })

  it('update value - array', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce('[1,2]')
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('marks', [] as number[]))

    act(() => {
      result.current[1]([1, 2, 3])
    })

    expect(result.current[0]).toEqual([1, 2, 3])
    expect(window.localStorage.setItem).toHaveBeenCalledWith('marks', '[1,2,3]')
  })

  it('update value - object', async () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(
      '{"name": "vitest"}',
    )
    vi.spyOn(window.localStorage, 'setItem')

    const {result} = renderHook(() => usePersist('user', {}))

    act(() => {
      result.current[1]({name: 'vitest', age: 1})
    })

    expect(result.current[0]).toEqual({name: 'vitest', age: 1})
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'user',
      '{"name":"vitest","age":1}',
    )
  })
})
