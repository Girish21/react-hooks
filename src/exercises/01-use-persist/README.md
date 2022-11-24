# Custom hook `usePersist`

## 📝 Instructions

1. Create a custom hook called `usePersist` that takes a key and a value as arguments.
2. The hook should return the value that is stored in `localStorage` under the given key.
3. If there is no value stored under the given key, the hook should store the given value in `localStorage` and return it.

## 🦉 Expected result

The `usePersist` hook should be able to store and retrieve values from `localStorage`. The hook should be able to store and retrieve values of any type.

## 🔎 Hint

- You can use `JSON.stringify` to convert a value to a string and `JSON.parse` to convert a string to a value.
- You can use the `useEffect` hook to run code when the component is mounted and when the component is updated.
- You can use the `useState` hook to store a value in the component's state.
- You can get things working without proper TypeScript types, but you should try to add them.
- To help you to make sure your hook works as expected, you can run the tests with `yarn test 01-use-persist`.

(You can find the solution to this exercise in the [solution directory](./solution/hook.ts))
