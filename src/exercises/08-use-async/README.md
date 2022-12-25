# Custom hook `useAsync`

## 📝 Instructions

1. Create a custom hook called `useAsync` that takes a function that returns a promise and an optional immediate flag as arguments.
2. The hook should return an object with the following properties:
   - `state` - a string indicating the state of the promise
     - `idle` - the promise has not been called
     - `pending` - the promise is in progress
     - `resolved` - the promise is successful
     - `rejected` - the promise fails
   - `data` - the data returned from the promise
   - `error` - an error message if the promise fails
   - `execute` - a function that calls the promise
3. The hook should call the promise when the immediate flag is true and when the `execute` function is called.
4. The hook should also handle errors and set the state to `rejected` if the promise fails.

## 🦉 Expected Result

The `useAsync` hook should be able to call a promise and return the data, state, and error message. The hook should call the promise when the immediate flag is true and when the `execute` function is called. The hook should also handle errors and set the state to `rejected` if the promise fails.

## 🔎 Hint

- To help you to make sure your hook works as expected, you can run the tests with `yarn test 08-use-async`.
- You can get things working without proper TypeScript types, but you should try to add them.
- <details>
  <summary>Hint #1</summary>
    You can use the `useState` hook to store the various states of the promise.
  </details>
- <details>
  <summary>Hint #2</summary>
    You can use the `useEffect` hook to run code when the component is mounted and when the component is updated.
  </details>
- <details>
  <summary>Hint #3</summary>
    Memo the `execute` function so that it doesn't change on every render.
  </details>
- <details>
  <summary>Hint #4</summary>
    See how we can handle errors in a promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
  </details>

(You can find the solution to this exercise in the [solution directory](./solution/hook.ts))
