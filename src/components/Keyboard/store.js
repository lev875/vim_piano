import { createSlice } from "@reduxjs/toolkit"

export const keyFrequency = n => Math.pow(2, (n - 49) / 12) * 440

const keys = [
  { name: 'C', button: 'KeyA' }, { name: 'C#', button: 'KeyQ' },
  { name: 'D', button: 'KeyS' }, { name: 'D#', button: 'KeyW' },
  { name: 'E', button: 'KeyD' },
  { name: 'F', button: 'KeyF' }, { name: 'F#', button: 'KeyR' },
  { name: 'G', button: 'KeyJ' }, { name: 'G#', button: 'KeyU' },
  { name: 'A', button: 'KeyK' }, { name: 'A#', button: 'KeyI' },
  { name: 'B', button: 'KeyL' }
]

const startKey = 40
const initialState =
  keys
    .map(
      (key, i) =>
        ({
          ...key,
          frequency: keyFrequency(startKey + i),
          isPlaying: false
        })
    )

const playReducer = ( state, action ) =>
  state
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: true }
          : key
    )

const stopReducer = ( state, action ) =>
  state
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: false }
          : key
    )

export const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    play: playReducer,
    stop: stopReducer
  }
})

export const { play, stop } = keysSlice.actions

export const selectKeys = state => state.keys
