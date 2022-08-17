import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectConfig, setReverbPreset, setReverbState } from "./store"
import { REVERB_PRESETS } from "../Keyboard/logic"


function ReverbCotrol() {

  const { reverbEnabled, reverbPreset } = useSelector(selectConfig)
  const dispatch = useDispatch()

  return <div className="flex-row">
    <span>Reverb</span>
    <input
      type="checkbox"
      defaultChecked={ reverbEnabled }
      onChange={() => dispatch(setReverbState(!reverbEnabled))}
    />
    { reverbEnabled
      ?
        <select
          value={ reverbPreset }
          onChange={
            ({ currentTarget: { value } }) =>
              dispatch(setReverbPreset(value))
          }
        >
          {
            Array.from(REVERB_PRESETS.entries())
              .map(
                ([ key, { name }], i) => <option key={i} value={key}>{ name }</option>
              )
          }
        </select>
      : null
    }
  </div>

}

export default ReverbCotrol
