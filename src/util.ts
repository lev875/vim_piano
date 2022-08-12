import { Action, Dispatch } from "@reduxjs/toolkit"

export const dispatchTimeout = <T,>(dispatch: Dispatch) =>
  (timeout: number, event: Action<T>) =>
    setTimeout(
      () => dispatch(event),
      timeout
    )

export const appendToArray = <T,>(a: T[], el: T) => [...a, el]
export const dropFromArray  = <T,>(a: T[], n: number) =>
  a.slice(0, a.length - n)
export const replaceArrayEl = <T,>(a: T[], i: number, n: T) =>
  [...a.slice(0, i), n, ...a.slice(i + 1)]


export const getObjectProperty = <T, Key extends keyof T>(obj: T) =>
  (property: Key) => obj[property as Key]


export const generateArray = (n: number) => [...new Array(n)].map((_,i) => i)

