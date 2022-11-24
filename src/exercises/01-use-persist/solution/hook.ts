import * as React from 'react'

export const usePersist = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(() => {
    const item = window.localStorage.getItem(key)

    if (item) {
      try {
        return JSON.parse(item) as T
      } catch {
        return initialValue
      }
    }
    return initialValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
