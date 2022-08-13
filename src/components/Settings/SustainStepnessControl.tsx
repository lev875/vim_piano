import { FormEventHandler } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeSustainStepness, selectConfig } from "./store"

function SusteainStepnessControl() {

  const dispatch = useDispatch()
  const { sustainStepness } = useSelector(selectConfig)

  const changeSustainStepnessHandler: FormEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseFloat(currentTarget.value)
      if (value < 1) {
        currentTarget.value = sustainStepness.toString()
        return
      }
      dispatch(changeSustainStepness(value))
    }

  return <div>
    <span>Sustain stepness: </span>
    <input
      type="number"
      defaultValue={ sustainStepness }
      min={1}
      step={0.01}
      onInput={ changeSustainStepnessHandler }
    />
  </div>
}

export default SusteainStepnessControl
