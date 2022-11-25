import {renderHook} from '@testing-library/react'

import {useInterval} from './hook'

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should call the callback every `delay` milliseconds', () => {
    const callback = vi.fn()
    renderHook(() => useInterval(callback, 1000))

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should call with the updated delay', () => {
    const callback = vi.fn()
    const {rerender} = renderHook(({delay}) => useInterval(callback, delay), {
      initialProps: {delay: 1000},
    })

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)

    rerender({delay: 2000})
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should call with the updated callback between interval', () => {
    let callback = vi.fn()
    const {rerender} = renderHook(({callback}) => useInterval(callback, 1000), {
      initialProps: {callback},
    })

    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(500)
    callback = vi.fn()
    rerender({callback})
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
