import { FormEventHandler } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changesustainSteepness, selectConfig } from "./store"

const MIN = 1

function SusteainSteepnessControl() {

  const dispatch = useDispatch()
  const { sustainSteepness } = useSelector(selectConfig)

  const changesustainSteepnessHandler: FormEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseFloat(currentTarget.value)
      if (!value || value < MIN)
        return
      dispatch(changesustainSteepness(value))
    }

  const inputValidator: FormEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseFloat(currentTarget.value)
      if (!value || value < MIN) {
        currentTarget.value = sustainSteepness.toString()
        return
      }
    }

  return <div>
    <span>Sustain steepness: </span>
    <input
      type="number"
      defaultValue={ sustainSteepness }
      min={ MIN }
      step={ 0.01 }
      onChange={ changesustainSteepnessHandler }
      onBlur={ inputValidator }
    />
  </div>
}

export default SusteainSteepnessControl
