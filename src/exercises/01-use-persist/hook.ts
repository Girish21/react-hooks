import * as React from 'react'

export const usePersist = <T>(key: string, initValue: T) => {
  const [value, setValue] = React.useState<T>(() => {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : initValue
  })
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
