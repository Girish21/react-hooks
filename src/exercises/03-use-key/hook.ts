import * as React from 'react'

export const useKey = (key: string, callback: () => void) => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      if (key === e.key) {
        callbackRef.current()
      }
    }

    // window.addEventListener('keydown', eventListener)
    document.addEventListener('keydown', eventListener)

    return () => {
      // window.removeEventListener('keydown', eventListener)
      document.removeEventListener('keydown', eventListener)
    }
  }, [key])
}
