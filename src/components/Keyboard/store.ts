import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/util"

// https://en.wikipedia.org/wiki/Piano_key_frequencies
export const keyFrequency = (n: number) => Math.pow(2, (n - 58) / 12) * 440

const keys = [
  { name: 'C', button: 'KeyA', isBlack: false }, { name: 'C#', button: 'KeyW', isBlack: true },
  { name: 'D', button: 'KeyS', isBlack: false }, { name: 'D#', button: 'KeyE', isBlack: true },
  { name: 'E', button: 'KeyD', isBlack: false },
  { name: 'F', button: 'KeyF', isBlack: false }, { name: 'F#', button: 'KeyU', isBlack: true },
  { name: 'G', button: 'KeyJ', isBlack: false }, { name: 'G#', button: 'KeyI', isBlack: true },
  { name: 'A', button: 'KeyK', isBlack: false }, { name: 'A#', button: 'KeyO', isBlack: true },
  { name: 'B', button: 'KeyL', isBlack: false }
]

export interface Key {
  frequency: number
  isPressed: boolean
  name: string
  button: string
  isBlack: boolean
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
            isPressed: false
          })
      )
}

const pressKeyReducer = ( state: State, action: PayloadAction<string> ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPressed: true }
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
    pressKey: pressKeyReducer,
    liftKey: liftKeyReducer,
    shiftOctave: shiftOctaveReducer
  }
})

export const { pressKey, liftKey, shiftOctave }
  = keyboardSlice.actions

export const selectKeys = (state: RootState) => state.keyboard.keys
export const selectOctave = (state: RootState) => state.keyboard.octave
