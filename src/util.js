export const dispatchTimeout = dispatch => (timeout, event) =>
  setTimeout(
    () => dispatch(event),
    timeout
  )
