import { ChangeEventHandler, FocusEventHandler } from "react"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { changeSustain, selectConfig } from "./store"

const MIN = 50

function SustainControl() {

  const { sustain } = useSelector(selectConfig)
  const dispatch = useDispatch()

  const changeSustainHandler: ChangeEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseInt(currentTarget.value)
      if (!value || value < MIN)
        return
      dispatch(changeSustain(value))
    }

  const inputValidator: FocusEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const parsedValue = parseInt(currentTarget.value)
      if (!parsedValue || parsedValue < MIN) {
        currentTarget.value = sustain.toString()
        return
      }
    }

  return <div>
    <span>Sustain: </span>
    <input
      type="number"
      defaultValue={ sustain }
      min={ MIN }
      step={ 50 }
      onChange={ changeSustainHandler }
      onBlur={ inputValidator }
    />
    <span> ms</span>
  </div>
}

export default SustainControl
