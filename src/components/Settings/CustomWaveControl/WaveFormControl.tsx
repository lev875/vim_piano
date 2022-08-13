import { useSelector, useDispatch } from "react-redux"
import { changeWaveType, selectConfig } from "../store"
import WaveTypeOption from "./WaveTypeOption"
import ArrayView from "./ArrayView/ArrayView"

import style from "../style.css"
import { Fragment } from "react"

const WAVE_TYPES: OscillatorType[] =
  [ "sine", "square", "sawtooth", "triangle", "custom" ]

function WaveFormControl() {

  const dispatch = useDispatch()
  const config = useSelector(selectConfig)

  return <Fragment>
    <div>
      <span>Type: </span>
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
        `flex-column ${
          config.type === "custom"
            ? style.open
            : style.hidden
        }`
      }
    >
      <ArrayView component="imag" array={ config.waveForm.imag }/>
      <ArrayView component="real" array={ config.waveForm.real }/>
    </div>
  </Fragment>

}

export default WaveFormControl
