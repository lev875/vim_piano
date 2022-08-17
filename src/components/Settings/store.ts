import { createSlice, PayloadAction, StateFromReducersMapObject } from "@reduxjs/toolkit"
import { RootState } from "../../store/util"
import { appendToArray, dropFromArray, replaceArrayEl } from "../../util"

export interface Config {
  type: OscillatorType
  volume: number
  sustain: number
  sustainStepness: number
  isDebug: boolean
  reverbEnabled: boolean
  reverbPreset: string
  waveForm: {
    imag: number[]
    real: number[]
  }
}

export const LOCAL_STORAGE_KEY = "state"

const savedState = localStorage.getItem(LOCAL_STORAGE_KEY)

const initialState: Config =
  savedState
    ? JSON.parse(savedState)
    : {
      type: "sine" as OscillatorType,
      volume: 50,
      sustain: 1200, // ms
      sustainStepness: 1.3,
      showKeys: true,
      isDebug: false,
      reverbEnabled: false,
      reverbPreset: "large_church",
      waveForm: {
        imag: [0,1,1,1,1,1,1],
        real: [0,0,0,0,0,0,0]
      }
    }

const changeVolumeReducer = (state: Config, { payload }: PayloadAction<number>) =>
  ({
    ...state,
    volume: payload
  })

const changeSustainReducer = (state: Config, { payload }: PayloadAction<number>) =>
  ({
    ...state,
    sustain: payload
  })

const changeSustainStepnessReducer = (state: Config, { payload }: PayloadAction<number>) =>
  payload >= 1
    ? {
      ...state,
      sustainStepness: payload
    }
    : state

const waveTypeReducer = ( state: Config, action: PayloadAction<OscillatorType> ) =>
  ({
    ...state,
    type: action.payload
  })

const addWaveTermReducer = (state: Config) =>
  ({
    ...state,
    waveForm: {
      imag: appendToArray(state.waveForm.imag, 1),
      real: appendToArray(state.waveForm.real, 0)
    }
  })

const removeWaveTermReducer = (state: Config) =>
  state.waveForm.imag.length <= 2
    ? state
    : {
      ...state,
      waveForm: {
        imag: dropFromArray(state.waveForm.imag, 1),
        real: dropFromArray(state.waveForm.real, 1)
      }
    }

const setDebugStateReducer = (state: Config, { payload }: PayloadAction<boolean>) =>
  ({
    ...state,
    isDebug: payload
  })

const setReverbStateReducer = (state: Config, { payload }: PayloadAction<boolean>) =>
  ({
    ...state,
    reverbEnabled: payload
  })

const setReverbPresetReducer = (state: Config, { payload }: PayloadAction<string>) =>
  ({
    ...state,
    reverbPreset: payload
  })

interface ChageWaveTermPayload {
  component: "imag" | "real",
  index: number,
  newValue: number
}

const changeWaveTermReducer = (
  state: Config,
  { payload }: PayloadAction<ChageWaveTermPayload>
) =>
  payload.index >= state.waveForm[payload.component].length
  || !payload.newValue
    ? state
    : {
      ...state,
      waveForm: {
        ...state.waveForm,
        [payload.component]:
          replaceArrayEl(
            state.waveForm[payload.component],
            payload.index,
            payload.newValue
          )
      }
    }


export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    changeWaveType: waveTypeReducer,
    changeVolume: changeVolumeReducer,
    changeSustain: changeSustainReducer,
    changeSustainStepness: changeSustainStepnessReducer,
    addCustomWaveTerm: addWaveTermReducer,
    removeCustomWaveTerm: removeWaveTermReducer,
    changeCustomWaveTerm: changeWaveTermReducer,
    setDebugState: setDebugStateReducer,
    setReverbState: setReverbStateReducer,
    setReverbPreset: setReverbPresetReducer
  }
})


export const {
  changeWaveType, changeVolume, changeSustain, changeSustainStepness,
  addCustomWaveTerm, removeCustomWaveTerm, changeCustomWaveTerm,
  setDebugState, setReverbState, setReverbPreset
} = configSlice.actions

export const selectConfig = (state: RootState) => state.config
