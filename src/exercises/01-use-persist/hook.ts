import * as React from 'react'

export const usePersist = <TValue>(
  key: string,
  value: TValue,
): [TValue, (value: TValue) => void] => {
  const [state, setState] = React.useState(value)

  const storeValue = (value: TValue) => {
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  React.useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue) {
        throw new Error()
      }
      const parsedValue = JSON.parse(storedValue)
      setState(parsedValue)
      localStorage.setItem(key, JSON.stringify(parsedValue))
    } catch {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [state, storeValue]
}
