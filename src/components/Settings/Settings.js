import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import ArrayView from "../ArrayView/ArrayView.js";
import { changeSustain, changeVolume, selectConfig } from "../Keyboard/store.js";

import { changeWaveType } from "../Keyboard/store.js"
import style from "./style.css"

function Settings() {

  const config              = useSelector(selectConfig)
  const dispatch            = useDispatch()
  const [ isOpen, setOpen ] = useState(false)

  return <div>

    <button onClick={() => setOpen(!isOpen)}>Settings</button>
    
    <div className={ isOpen ? style.open : style.hidden }>
      {/* <pre>
        { JSON.stringify(config, undefined, 2) }
      </pre> */}

      <div className={ style["flex-row"] }>
        <span className={ style.span }>Volume: </span>
        <input
          type={"range"}
          value={ config.volume }
          min={0}
          max={100}
          onChange={({ target }) => dispatch(changeVolume(target.value))}
        />
      </div>

      <div className={ style["flex-row"] }>
        <span className={ style.span }>Sustain: </span>
        <input
          type={"number"}
          value={ config.sustain }
          onChange={({ target }) => dispatch(changeSustain(target.value))}
        />
      </div>

      <div className={ style["flex-row"] }>
        <span className={ style.span }>Type: </span>
        <select
          value={ config.type }
          onChange={ e => dispatch(changeWaveType(e.target.value)) }
        >
          <option value={ "sine"      }>sine     </option>
          <option value={ "square"    }>square   </option>
          <option value={ "sawtooth"  }>sawtooth </option>
          <option value={ "triangle"  }>triangle </option>
          <option value={ "custom"    }>custom   </option>
        </select>
      </div>

      <div
        className={
          `${
            config.type === "custom"
              ? style.open
              : style.hidden
          }`
        }
      >
        <ArrayView component="imag" array={ config.waveForm.imag }/>
        <ArrayView component="real" array={ config.waveForm.real }/>
      </div>

    </div>
  </div>

}

export default Settings
