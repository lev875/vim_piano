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
      (n, i) => ({...keys[i], frequency: keyFrequency(startKey + i) })
    )

export const keysSlice = createSlice({
  name: 'keys',
  initialState
})

export const selectKeys = state => state.keys
