import * as React from 'react'

export const usePersist = <T>(
  key: string,
  initValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(() => {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T
      } catch {
        return initValue
      }
    }

    return initValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

// without return type - <T>(key: string, initValue: T) => (T | React.Dispatch<React.SetStateAction<T>>)[]
// try if JSON.parse can be casted as T
