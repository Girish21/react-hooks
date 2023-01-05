import {useEffect, useRef} from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const wrapper = () => savedCallback?.current?.()
    const intervalId = setInterval(wrapper, delay)
    return () => clearInterval(intervalId)
  }, [delay])
}

//missed wrapper function
