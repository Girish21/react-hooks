# Custom hook `usePrevious`

## 📝 Instructions

1. Create a custom hook called `usePrevious` that takes a value as an argument.
2. The hook should return the previous value of the argument.
3. The hook should be able to handle any type of value.

## 🦉 Expected Result

The `usePrevious` hook should be able to return the previous value of the argument. The hook should be able to handle any type of value.

## 🔎 Hint

- To help you to make sure your hook works as expected, you can run the tests with `yarn test 07-use-previous`.
- You can get things working without proper TypeScript types, but you should try to add them.
- <details>
  <summary>Hint #1</summary>
    You can use the `useRef` hook to store the previous value.
  </details>
- <details>
  <summary>Hint #2</summary>
    You can use `useEffect` to run code when the component is updated.
  </details>
- <details>
  <summary>Hint #3 (React 18+)</summary>
    Now that React defaults to concurrent mode, let's make sure our hook follows the rules of concurrent mode. You can read more about it here: https://beta.reactjs.org/apis/react/useState#storing-information-from-previous-renders
  </details>

(You can find the solution to this exercise in the [solution directory](./solution/hook.ts))
