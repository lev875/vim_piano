import style from "./style.css"

import { useDispatch } from "react-redux"

import { addCustomWaveTerm, removeCustomWaveTerm, changeCustomWaveTerm } from "../Keyboard/store"
import { ChangeEvent } from "react"

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

  const change = (e: ChangeEvent<HTMLInputElement>, index: number) =>
    dispatch(changeCustomWaveTerm(
      { component, index, new: parseInt(e.target.value) }
    ))

  return <div className={ style["flex-row"] }>
    <span className={ style.span }>{ name }</span>
    <button onClick={() => dispatch(removeCustomWaveTerm())}>-</button>
    <button onClick={() => dispatch(addCustomWaveTerm())}>+</button>
    <div>{
      array.map(
        (v, i) =>
          <input
            key={i}
            className={ style.input }
            onChange={ e => change(e,i) }
            type={ "number" }
            value={ v }/>
      )
    }</div>
  </div>

}

export default ArrayView
