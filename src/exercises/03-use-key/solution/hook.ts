import * as React from 'react'

export const useKey = (key: string, callback: () => void) => {
  const savedCallback = React.useRef<() => void>()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        savedCallback.current?.()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [key])
}
