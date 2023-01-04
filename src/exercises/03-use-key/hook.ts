import * as React from 'react'

export const useKey = (key: string, callback: () => void) => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    document.addEventListener('keydown', event => {
      if (event.key === key) {
        callbackRef.current?.()
      }
    })
  }, [key])
}
