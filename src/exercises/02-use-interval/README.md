# Custom hook `useInterval`

## 📝 Instructions

1. Create a custom hook called `useInterval` that takes a callback and a delay as arguments.
2. The hook should call the latest callback after the specified delay.
3. The hook should reset the interval when the delay changes.

## 🦉 Expected result

The `useInterval` hook should be able to call a callback after a specified delay. The hook should be able to reset the interval when the delay changes. The hook should not reset the interval when the callback changes.

## 🔎 Hints

- To help you to make sure your hook works as expected, you can run the tests with `yarn test 02-use-interval`.
- You can get things working without proper TypeScript types, but you should try to add them.
- <details>
  <summary>Hint #1</summary>
    You can use the `useEffect` hook to run code when the component is mounted and when the component is updated.
  </details>
- <details>
  <summary>Hint #2</summary>
    You can use the `useRef` hook to store a reference to the latest callback without triggering a re-render.
  </details>

(You can find the solution to this exercise in the [solution directory](./solution/hook.ts))
