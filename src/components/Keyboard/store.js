import { createSlice } from "@reduxjs/toolkit"

// https://en.wikipedia.org/wiki/Piano_key_frequencies
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
const initialState = {
  config: {
    type: "sine",
    waveForm: {
      imag: [0,1,1,1,1,1,1],
      real: [0,0,0,0,0,0,0]
    }
  },
  keys:
    keys
      .map(
        (key, i) =>
          ({
            ...key,
            frequency: keyFrequency(startKey + i),
            isPlaying: false
          })
      )
}

const playReducer = ( state, action ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: true }
          : key
    )
})

const stopReducer = ( state, action ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: false }
          : key
    )
})

const waveTypeReducer = ( state, action ) => ({
  ...state,
  config: {
    ...state.config,
    type: action.payload
  }
})

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    play: playReducer,
    stop: stopReducer,
    changeWaveType: waveTypeReducer
  }
})

export const { play, stop, changeWaveType } = keyboardSlice.actions

export const selectKeys = state => state.keyboard.keys
export const selectConfig = state => state.keyboard.config
