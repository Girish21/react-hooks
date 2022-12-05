import * as React from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const [time, setTime] = React.useState(delay)

  const callbackRef = React.useRef(callback)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTime(delay)
  }, [delay])

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    intervalRef.current = setInterval(() => callbackRef.current(), time)
  }, [callback, time])
}
