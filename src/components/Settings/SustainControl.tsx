import { FormEventHandler } from "react"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { changeSustain, selectConfig } from "./store"

function SustainControl() {

  const { sustain } = useSelector(selectConfig)
  const dispatch = useDispatch()

  const changeSustainHandler: FormEventHandler<HTMLInputElement> =
    ({ currentTarget }) => {
      const value = parseInt(currentTarget.value)
      if (value < 1) {
        currentTarget.value = sustain.toString()
        return
      }
      dispatch(changeSustain(value))
    }

  return <div>
    <span>Sustain: </span>
    <input
      type="number"
      defaultValue={ sustain }
      min={ 50 }
      step={ 50 }
      onInput={ changeSustainHandler }
    />
    <span> ms</span>
  </div>
}

export default SustainControl
