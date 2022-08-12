import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/util"

// https://en.wikipedia.org/wiki/Piano_key_frequencies
export const keyFrequency = (n: number) => Math.pow(2, (n - 58) / 12) * 440

const keys = [
  { name: 'C', button: 'KeyA' }, { name: 'C#', button: 'KeyQ' },
  { name: 'D', button: 'KeyS' }, { name: 'D#', button: 'KeyW' },
  { name: 'E', button: 'KeyD' },
  { name: 'F', button: 'KeyF' }, { name: 'F#', button: 'KeyR' },
  { name: 'G', button: 'KeyJ' }, { name: 'G#', button: 'KeyU' },
  { name: 'A', button: 'KeyK' }, { name: 'A#', button: 'KeyI' },
  { name: 'B', button: 'KeyL' }
]

interface Key {
  frequency: number
  isPressed: boolean
  isPlaying: boolean
  name: string
  button: string
}

interface State {
  octave: number,
  keys: Key[]
}
const startingOctave = 4
const initialState: State = {
  octave: startingOctave,
  keys:
    keys
      .map(
        (key, i) =>
          ({
            ...key,
            frequency: keyFrequency(startingOctave * 12 + i + 1),
            isPlaying: false,
            isPressed: false
          })
      )
}

const playReducer = ( state: State, action: PayloadAction<string> ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: true, isPressed: true }
          : key
    )
})

const stopReducer = ( state: State, { payload }: PayloadAction<string> ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === payload
          ? { ...key, isPlaying: false }
          : key
    )
})

const liftKeyReducer = (state: State, { payload }: PayloadAction<string>) =>
  ({
    ...state,
    keys: state.keys
      .map(
        key =>
          key.button === payload
            ? { ...key, isPressed: false }
            : key
      )
  })

const shiftOctaveReducer = (state: State, { payload }: PayloadAction<number>) => {
  let newOctave = state.octave + payload
  if (newOctave < 0)
    newOctave = 0
  if (newOctave > 8)
    newOctave = 8
  return {
    ...state,
    octave: newOctave,
    keys: state.keys.map((k, i) =>
      ({
        ...k,
        frequency: keyFrequency(newOctave * 12 + i + 1)
      })
    )
  }
}

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    play: playReducer,
    stop: stopReducer,
    liftKey: liftKeyReducer,
    shiftOctave: shiftOctaveReducer
  }
})

export const { play, stop, liftKey, shiftOctave } = keyboardSlice.actions

export const selectKeys = (state: RootState) => state.keyboard.keys
export const selectOctave = (state: RootState) => state.keyboard.octave
