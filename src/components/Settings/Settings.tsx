import { ChangeEventHandler, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ArrayView from "./ArrayView/ArrayView";
import { setVolume } from "../Keyboard/logic.js";
import {
  selectConfig,
  changeSustain, changeSustainStepness, changeVolume,
  changeWaveType, setDebugState
} from "../Settings/store";

import style from "./style.css"
import WaveTypeOption from "./WaveTypeOption";

const WAVE_TYPES: OscillatorType[] =
  [ "sine", "square", "sawtooth", "triangle", "custom" ]

function Settings() {

  const config              = useSelector(selectConfig)
  const dispatch            = useDispatch()
  const [ isOpen, setOpen ] = useState(false)

  useEffect(
    () => setVolume(config.volume),
    [config.volume]
  )

  const changeSustainHandler: ChangeEventHandler<HTMLInputElement> =
    ({ target: { value } }) =>
      {
        if (!value) return
        const val = parseInt(value)
        if (val < 1) return
        dispatch(changeSustain(parseInt(value)))
      }

  return <div className={ style.container }>

    <button onClick={() => setOpen(!isOpen)}>Settings</button>
    
    <div className={ `${style.innerContainer} ${isOpen ? style.open : style.hidden}` }>

      <div>
        <span className={ style.span }>Volume: </span>
        <input
          type={"range"}
          value={ config.volume }
          min={ 0 }
          max={ 100 }
          onChange={({ target }) => dispatch(changeVolume(parseInt(target.value)))}
        />
        <span className={ style.span }> { config.volume }%</span>
      </div>

      <div>
        <span className={ style.span }>Sustain: </span>
        <input
          type="number"
          defaultValue={ config.sustain }
          min={ 50 }
          step={ 50 }
          onChange={ changeSustainHandler }
        />
        <span> ms</span>
      </div>
      <div>
        <span className={ style.span }>Sustain stepness: </span>
        <input
          type="number"
          defaultValue={ config.sustainStepness }
          min={1}
          step={0.01}
          onChange={ ({ target: { value } }) =>
            dispatch(changeSustainStepness(parseFloat(value)))
          }
        />
      </div>

      <div>
        <span className={ style.span }>Type: </span>
        <select
          value={ config.type }
          onChange={ ({ target: { value } }) =>
            dispatch(changeWaveType(value as OscillatorType))
          }
        >
          { WAVE_TYPES.map((t, i) => <WaveTypeOption key={i} type={t}/>) }
        </select>
      </div>

      <div
        className={
          `${style.column} ${
            config.type === "custom"
              ? style.open
              : style.hidden
          }`
        }
      >
        <ArrayView component="imag" array={ config.waveForm.imag }/>
        <ArrayView component="real" array={ config.waveForm.real }/>
      </div>

      <div>
        <span>Debug: </span>
        <input
          type={"checkbox"}
          defaultChecked={ config.isDebug }
          onChange={ ({ target: { checked } }) =>
            { dispatch(setDebugState(checked)) }
          }
        />
      </div>

    </div>
  </div>

}

export default Settings
