import react from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrayView from "../ArrayView.js";
import { selectConfig } from "../Keyboard/store.js";

import { changeWaveType } from "../Keyboard/store.js"

function Settings() {

  const config = useSelector(selectConfig)
  const dispatch = useDispatch()

  return <div>
    <div>
      <span>Type: </span>
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
    {
      config.type === "custom"
        ?
          <div>
            <ArrayView name="Imaginary" array={ config.waveForm.imag }/>
            <ArrayView name="Real" array={ config.waveForm.real }/>
          </div>
        : null
    }
    <pre>
      { JSON.stringify(config, undefined, 2) }
    </pre>
  </div>

}

export default Settings
