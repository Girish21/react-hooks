import * as React from 'react'

export const useKey = (key: string, callback: () => void) => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    const KeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callbackRef.current?.()
      }
    }

    document.addEventListener('keydown', KeyDownHandler)

    return () => document.removeEventListener('keydown', KeyDownHandler)
  }, [key])
}

// missed removing eventlistener
