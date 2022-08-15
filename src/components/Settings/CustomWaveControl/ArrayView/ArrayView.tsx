import style from "./style.css"

import { useDispatch } from "react-redux"

import { addCustomWaveTerm, removeCustomWaveTerm, changeCustomWaveTerm } from "../../store"
import { FocusEvent } from "react"

const NAMES = new Map([
  [ "imag", "Imaginary" ],
  [ "real", "Real" ]
])

interface Arguments {
  component: "imag" | "real",
  array: number[]
}

function ArrayView({ component, array }: Arguments) {

  const name = NAMES.get(component)
  const dispatch = useDispatch()

  const change = (
    e: FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = parseFloat(e.currentTarget.value)
    if (isNaN(newValue)) {
      e.currentTarget.value = e.currentTarget.defaultValue
      return
    }
    dispatch( changeCustomWaveTerm({ component, index, newValue }) )
  }

  return <div className={ `flex-row ${style.container}` }>
    <span>{ name }</span>
    <button
      className={ style.smallButton }
      onClick={() => dispatch(removeCustomWaveTerm())}
    >-</button>
    <button
      className={ style.smallButton }
      onClick={() => dispatch(addCustomWaveTerm())}
    >+</button>
    <div className="flex-row">{
      array.map(
        (v, i) =>
          <input
            key={i}
            type="number"
            defaultValue={ v }
            className={ style.input }
            onBlur={ e => change(e,i) }
            step={ 0.01 }
          />
      )
    }</div>
  </div>

}

export default ArrayView
