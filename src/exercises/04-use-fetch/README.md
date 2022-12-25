# Custom hook `useFetch`

## 📝 Instructions

1. Create a custom hook called `useFetch` that takes a URL and fetch requestion options as an argument.
2. The hook should return an object with the following properties:
   - `data` - the data returned from the fetch request
   - `loading` - a boolean indicating whether the request is in progress
   - `error` - an error message if the request fails
3. The hook should make the request when it is first called and then again whenever the URL or options change.
4. The hook should handle the following cases:
   - The request is in progress
   - The request is successful
   - The request fails
5. The hook should handle cases where the request is cancelled. For example, if the user navigates away from the page before the request completes, the hook should not try to update state.

## 🦉 Expected Result

The `useFetch` hook should be able to make a fetch request and return the data, loading state, and error message. The hook should make the request when it is first called and then again whenever the URL or options change. The hook should handle the following cases: the request is in progress, the request is successful, the request fails. The hook should handle cases where the request is cancelled.

## 🔎 Hint

- To help you to make sure your hook works as expected, you can run the tests with `yarn test 04-use-fetch`.
- You can get things working without proper TypeScript types, but you should try to add them.
- <details>
  <summary>Hint #1</summary>
    You can use the `useEffect` hook to run code when the component is mounted and when the component is updated.
  </details>
- <details>
  <summary>Hint #2</summary>
    You can use the `useState` hook to store the various states of the request.
  </details>
- <details>
  <summary>Hint #3</summary>
    See how we can use the `AbortController` to cancel a request: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  </details>
- <details>
  <summary>Hint #4</summary>
    See how we can handle errors in a fetch request: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
  </details>

(You can find the solution to this exercise in the [solution directory](./solution/hook.ts))
