# Custom hook `useKey`

## 📝 Instructions

1. Create a custom hook called `useKey` that takes a key and a callback as argument.
2. The hook should call the callback when the specified key is pressed.
3. The hook should not call the callback when the specified key is released.
4. The hook should not call the callback when another key is pressed.
5. The hook should handle the case when the key is changed.
6. The hook should call the latest callback when the callback changes.

## 🦉 Expected result

The `useKey` hook should be able to call a callback when a specified key is pressed. The hook should not call the callback when the specified key is released. The hook should not call the callback when another key is pressed. The hook should handle the case when the key is changed. The hook should call the latest callback when the callback changes.

## 🔎 Hint

- To help you to make sure your hook works as expected, you can run the tests with `yarn test 03-use-key`.
- You can get things working without proper TypeScript types, but you should try to add them.
- <details>
  <summary>Hint #1</summary>
    You can use the `useEffect` hook to run code when the component is mounted and when the component is updated and to initialize the event listener. Don't forget to clean up the event listener when the component is unmounted.
  </details>
- <details>
  <summary>Hint #2</summary>
    You can use the `useRef` hook to store a reference to the latest callback without triggering a re-render.
  </details>

(You can find the solution to this exercise in the [solution directory](./solution/hook.ts))
