import * as React from 'react'

export const useFetch = <TData, TError = string>(
  url: string,
  options: Record<string, unknown>,
) => {
  const optionsRef = React.useRef(options)

  const [state, dispatch] = React.useReducer<
    React.Reducer<State<TData, TError>, Actions<TData, TError>>
  >(
    (state, action) => {
      switch (action.type) {
        case 'fetch_loading': {
          return {
            ...state,
            loading: true,
            error: null,
            data: null,
          }
        }
        case 'fetch_success': {
          return {
            ...state,
            loading: false,
            error: null,
            data: action.payload.data,
          }
        }
        case 'fetch_failed': {
          return {
            ...state,
            loading: false,
            data: null,
            error: action.payload.error,
          }
        }
        default:
          return state
      }
    },
    {
      loading: false,
      data: null,
      error: null,
    },
  )

  React.useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      dispatch({
        type: 'fetch_loading',
      })

      try {
        const response = await fetch(url, {...optionsRef.current, signal})
        const data = await response.json()
        dispatch({
          type: 'fetch_success',
          payload: {data},
        })
      } catch (e) {
        dispatch({
          type: 'fetch_failed',
          payload: {error: 'Bad Request' as TError}, // error message should come from API?
        })
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, optionsRef.current])

  return state
}

type State<TData, TError> = {
  loading: boolean
  data: TData | null
  error: TError | null
}

type Actions<TData, TError> =
  | {
      type: 'fetch_success'
      payload: {data: TData | null}
    }
  | {
      type: 'fetch_loading'
    }
  | {
      type: 'fetch_failed'
      payload: {error: TError | null}
    }
