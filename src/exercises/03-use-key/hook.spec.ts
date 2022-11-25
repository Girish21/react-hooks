import {renderHook} from '@testing-library/react'

import {useKey} from './hook'

describe('useKey', () => {
  it('calls the callback when the key is pressed', () => {
    const callback = vi.fn()
    renderHook(() => useKey('a', callback))

    const event = new KeyboardEvent('keydown', {key: 'a'})
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    document.dispatchEvent(event)
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('calls the callback when the key changes between renders', () => {
    const callback = vi.fn()
    let key = 'a'
    const {rerender} = renderHook(({key}) => useKey(key, callback), {
      initialProps: {key},
    })

    let event = new KeyboardEvent('keydown', {key: 'a'})
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    key = 'b'
    rerender({key})

    event = new KeyboardEvent('keydown', {key: 'b'})
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('does not call the callback when a different key is pressed', () => {
    const callback = vi.fn()
    renderHook(() => useKey('a', callback))

    const event = new KeyboardEvent('keydown', {key: 'b'})
    document.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })

  it('calls the latest callback when the callback is changed', () => {
    let callback = vi.fn()
    const {rerender} = renderHook(({callback}) => useKey('a', callback), {
      initialProps: {callback},
    })

    const event = new KeyboardEvent('keydown', {key: 'a'})
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    callback = vi.fn()
    rerender({callback})

    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
