import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/util"
import { appendToArray, dropFromArray, getObjectProperty, replaceArrayEl } from "../../util"

// https://en.wikipedia.org/wiki/Piano_key_frequencies
export const keyFrequency = (n: number) => Math.pow(2, (n - 49) / 12) * 440

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

interface Key {
  frequency: number
  isPlaying: boolean
  name: string
  button: string
}

export interface Config {
  type: OscillatorType
  volume: number
  sustain: number
  waveForm: {
    imag: number[]
    real: number[]
  }
}

interface State {
  config: Config
  keys: Key[]
}

const initialState = {
  config: {
    type: "sine" as OscillatorType,
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

const playReducer = ( state: State, action: PayloadAction<string> ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: true }
          : key
    )
})

const stopReducer = ( state: State, action: PayloadAction<string> ) => ({
  ...state,
  keys: state.keys
    .map(
      key =>
        key.button === action.payload
          ? { ...key, isPlaying: false }
          : key
    )
})

const changeVolumeReducer = (state: State, { payload }: PayloadAction<number>) =>
  ({
    ...state,
    config: {
      ...state.config,
      volume: payload
    }
  })

const changeSustainReducer = (state: State, { payload }: PayloadAction<number>) =>
  ({
    ...state,
    config: {
      ...state.config,
      sustain: payload
    }
  })

const waveTypeReducer = ( state: State, action: PayloadAction<OscillatorType> ) => ({
  ...state,
  config: {
    ...state.config,
    type: action.payload
  }
})

const addWaveTermReducer = (state: State) =>
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

const removeWaveTermReducer = (state: State) =>
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

interface ChageWaveTermPayload {
  component: "imag" | "real",
  index: number,
  new: number
}

const changeWaveTermReducer = (
  state: State,
  { payload }: PayloadAction<ChageWaveTermPayload>
) =>
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

export const selectKeys = (state: RootState) => state.keyboard.keys
export const selectConfig = (state: RootState) => state.keyboard.config
