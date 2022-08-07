export const dispatchTimeout = dispatch => (timeout, event) =>
  setTimeout(
    () => dispatch(event),
    timeout
  )


export const appendToArray  = (a, el) => [...a, el]
export const dropFromArray  = (a, n) => a.slice(0, a.length - n)
export const replaceArrayEl = (a, i, n) =>
  [...a.slice(0, i), n, ...a.slice(i + 1)]
