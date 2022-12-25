import * as React from 'react'

const reducer = <TData, TError>(
  state: AsyncState<TData, TError>,
  action: Actions<TData, TError>,
): AsyncState<TData, TError> => {
  switch (action.type) {
    case 'initial':
      return {
        data: null,
        error: null,
        status: 'idle',
      }
    case 'pending':
      return {
        data: null,
        error: null,
        status: 'pending',
      }
    case 'rejected':
      return {
        data: null,
        error: action.error,
        status: 'rejected',
      }
    case 'resolved':
      return {
        data: action.data,
        error: null,
        status: 'resolved',
      }
  }
}

export const useAsync = <TData, TError = string>(
  promise: () => Promise<TData>,
  immediate?: boolean,
) => {
  const [state, dispatch] = React.useReducer(
    (state: AsyncState<TData, TError>, action: Actions<TData, TError>) =>
      reducer<TData, TError>(state, action),
    {
      data: null,
      error: null,
      status: 'idle',
    },
  )

  const execute = React.useCallback(async () => {
    dispatch({type: 'pending'})

    return promise()
      .then(data => {
        dispatch({type: 'resolved', data})
      })
      .catch(error => {
        dispatch({type: 'rejected', error})
      })
  }, [promise])

  React.useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {...state, execute}
}

type AsyncState<TData, TError> = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected'
  data: TData | null
  error: TError | null
}

type Actions<TData, TError> =
  | {type: 'initial'}
  | {type: 'pending'}
  | {type: 'resolved'; data: TData}
  | {type: 'rejected'; error: TError}
