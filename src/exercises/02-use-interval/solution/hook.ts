import * as React from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = React.useRef<() => void>()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    const tick = () => savedCallback.current?.()
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
