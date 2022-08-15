import { FormEventHandler } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeSustainStepness, selectConfig } from "./store"

const MIN = 1

function SusteainStepnessControl() {

  const dispatch = useDispatch()
  const { sustainStepness } = useSelector(selectConfig)

  const changeSustainStepnessHandler: FormEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseFloat(currentTarget.value)
      if (!value || value < MIN)
        return
      dispatch(changeSustainStepness(value))
    }

  const inputValidator: FormEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseFloat(currentTarget.value)
      if (!value || value < MIN) {
        currentTarget.value = sustainStepness.toString()
        return
      }
    }

  return <div>
    <span>Sustain stepness: </span>
    <input
      type="number"
      defaultValue={ sustainStepness }
      min={ MIN }
      step={ 0.01 }
      onChange={ changeSustainStepnessHandler }
      onBlur={ inputValidator }
    />
  </div>
}

export default SusteainStepnessControl
