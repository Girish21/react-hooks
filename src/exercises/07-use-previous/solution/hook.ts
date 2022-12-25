import * as React from 'react'

/**
 * With the new concurrent mode, React expects that the component
 * remain pure and not have side effects. This means that we can't
 * use the `useRef` hook to store the previous value. Instead, we
 * need to use a state hook to store the previous value.
 *
 * Now the recomendation is to store all the data that will be used
 * in the render is in the state hook. This way, we can be sure that
 * the component will be pure and not have side effects.
 */
export const usePrevious = <TData>(current: TData) => {
  /**
   * create a tuple of the previous and current value
   */
  const [previous, setPrevious] = React.useState<[TData | null, TData | null]>([
    null,
    current,
  ])

  if (previous[1] !== current) {
    /**
     * if the current value is different from the previous value
     * then update the previous value to be the current value, and
     * the current value to be the previous value.
     *
     * And it is fine to update the state hook in a conditional
     * statement because React will batch the update of the component
     * immediately after the `return` without rendering the children. This means
     * we only render the component tree once.
     *
     * If you want to read more about this, check out the React docs:
     * https://beta.reactjs.org/apis/react/useState#storing-information-from-previous-renders
     * https://beta.reactjs.org/learn/keeping-components-pure
     */
    setPrevious([previous[1], current])
  }

  return previous[0]
}
