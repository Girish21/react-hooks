import * as React from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    const interval = setInterval(() => callbackRef.current(), delay)
    return () => clearInterval(interval)
  }, [delay])
}
