import * as React from 'react'

export const useFetch = <T, E = string>(
  url: string,
  options: RequestInit = {},
) => {
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState<E | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let abborController: AbortController | null = null

    const fetchData = async () => {
      setLoading(true)
      try {
        abborController = new AbortController()

        const response = await fetch(url, {
          ...options,
          signal: abborController.signal,
        })
        if (response.ok) {
          const json = await response.json()

          setData(json)
        } else {
          throw new Error(response.statusText)
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message as E)
        } else if (error instanceof DOMException) {
          setError(error.message as E)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      abborController?.abort()
    }
  }, [url, options])

  return {data, error, loading}
}
