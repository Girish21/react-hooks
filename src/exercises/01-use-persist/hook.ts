import * as React from 'react'

export const usePersist = <TValue>(
  key: string,
  value: TValue,
): [TValue, React.Dispatch<React.SetStateAction<TValue>>] => {
  const [state, setState] = React.useState(() => {
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue) {
        return value
      }
      return JSON.parse(storedValue) as TValue
    } catch {
      return value
    }
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
