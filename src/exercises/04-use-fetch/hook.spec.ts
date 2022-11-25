import {renderHook, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {useFetch} from './hook'

const server = setupServer()

const BASE_URL = 'http://localhost:3000'

describe('useFetch', () => {
  beforeEach(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })

  it('should return the loading state and the data once the request resolves', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/hello`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({message: 'Hello'}))
      }),
    )

    const {result} = renderHook(() =>
      useFetch<{message: string}>(`${BASE_URL}/api/hello`, {method: 'GET'}),
    )

    expect(result.current.loading).toBeTruthy()

    await waitFor(() => expect(result.current.loading).toBeFalsy(), {
      timeout: 5000,
    })

    expect(result.current.data).toEqual({message: 'Hello'})
  })

  it('should handle cancelation of request when the fetch URL changes', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/user/:id`, (req, res, ctx) => {
        const userId = req.params.id
        return res(ctx.status(200), ctx.json({message: `Hello ${userId}`}))
      }),
    )

    const {result, rerender} = renderHook(
      ({url}) => useFetch<{message: string}>(url, {method: 'GET'}),
      {initialProps: {url: `${BASE_URL}/api/user/1`}},
    )

    expect(result.current.loading).toBeTruthy()

    rerender({url: `${BASE_URL}/api/user/2`})

    expect(result.current.loading).toBeTruthy()

    await waitFor(() => expect(result.current.loading).toBeFalsy(), {
      timeout: 5000,
    })

    expect(result.current.data).toEqual({message: 'Hello 2'})
  })

  it('fetched data should reset for the new request', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/user/:id`, (req, res, ctx) => {
        const userId = req.params.id
        return res(ctx.status(200), ctx.json({message: `Hello ${userId}`}))
      }),
    )

    const {result, rerender} = renderHook(
      ({url}) => useFetch<{message: string}>(url, {method: 'GET'}),
      {initialProps: {url: `${BASE_URL}/api/user/1`}},
    )

    expect(result.current.loading).toBeTruthy()

    await waitFor(() => expect(result.current.loading).toBeFalsy(), {
      timeout: 5000,
    })

    expect(result.current.data).toEqual({message: 'Hello 1'})

    rerender({url: `${BASE_URL}/api/user/2`})

    expect(result.current.loading).toBeTruthy()

    await waitFor(() => expect(result.current.loading).toBeFalsy(), {
      timeout: 5000,
    })

    expect(result.current.data).toEqual({message: 'Hello 2'})
  })

  it('should return the loading state and handle errors', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/hello`, (_, res, ctx) => {
        return res(ctx.status(400))
      }),
    )

    const {result} = renderHook(() =>
      useFetch<{message: string}, string>(`${BASE_URL}/api/hello`, {
        method: 'GET',
      }),
    )

    expect(result.current.loading).toBeTruthy()

    await waitFor(() => expect(result.current.loading).toBeFalsy(), {
      timeout: 5000,
    })

    expect(result.current.data).toBeNull()
    expect(result.current.error).toEqual('Bad Request')
  })
})
