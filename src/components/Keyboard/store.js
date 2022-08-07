import { createSlice } from "@reduxjs/toolkit"
import { appendToArray, dropFromArray, replaceArrayEl } from "../../util"

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

// TODO: Decouple config from store
const startKey = 40
const initialState = {
  config: {
    type: "sine",
    volume: 50,
    sustain: 150, // ms
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

const changeVolumeReducer = (state, { payload }) =>
  ({
    ...state,
    config: {
      ...state.config,
      volume: payload
    }
  })

const changeSustainReducer = (state, { payload }) =>
  ({
    ...state,
    config: {
      ...state.config,
      sustain: payload
    }
  })

const waveTypeReducer = ( state, action ) => ({
  ...state,
  config: {
    ...state.config,
    type: action.payload
  }
})

const addWaveTermReducer = state =>
  ({
    ...state,
    config: {
      ...state.config,
      waveForm: {
        imag: appendToArray(state.config.waveForm.imag, 1),
        real: appendToArray(state.config.waveForm.real, 0)
      }
    }
  })

const removeWaveTermReducer = state =>
  state.config.waveForm.imag.length <= 2
    ? state
    : {
      ...state,
      config: {
        ...state.config,
        waveForm: {
          imag: dropFromArray(state.config.waveForm.imag, 1),
          real: dropFromArray(state.config.waveForm.real, 1)
        }
      }
    }

const changeWaveTermReducer = (state, { payload }) =>
  payload.index >= state.config.waveForm[payload.component].length
    ? state
    : {
      ...state,
      config: {
        ...state.config,
        waveForm: {
          ...state.config.waveForm,
          [payload.component]:
            replaceArrayEl(
              state.config.waveForm[payload.component],
              payload.index,
              payload.new
            )
        }
      }
    }

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    play: playReducer,
    stop: stopReducer,
    changeWaveType: waveTypeReducer,
    changeVolume: changeVolumeReducer,
    changeSustain: changeSustainReducer,
    addCustomWaveTerm: addWaveTermReducer,
    removeCustomWaveTerm: removeWaveTermReducer,
    changeCustomWaveTerm: changeWaveTermReducer
  }
})

export const {
  play, stop,
  changeWaveType, changeVolume, changeSustain,
  addCustomWaveTerm, removeCustomWaveTerm, changeCustomWaveTerm
} = keyboardSlice.actions

export const selectKeys = state => state.keyboard.keys
export const selectConfig = state => state.keyboard.config
