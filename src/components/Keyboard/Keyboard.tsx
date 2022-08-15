import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import style from "./style.css"

import Key from "./Key/Key"

import { selectKeys, pressKey, liftKey, shiftOctave, selectOctave } from "./store"
import { dispatchTimeout as _dispatchTimeout} from "../../util"
import { selectConfig } from "../Settings/store"

function Keyboard() {

  const octave          = useSelector(selectOctave)
  const keys            = useSelector(selectKeys)
  const dispatch        = useDispatch()
  const { sustain }     = useSelector(selectConfig)

  useEffect(
    () => {
      // TODO: Refactor
      const keyPressEvent = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
          e.preventDefault()
          dispatch(shiftOctave(-1))
        }
        if (e.code === 'Enter') {
          e.preventDefault()
          dispatch(shiftOctave(1) )
        }
      }
      const keyDownEvent = ({ code }: KeyboardEvent) => dispatch(pressKey(code))
      window.addEventListener('keydown', keyDownEvent)
      window.addEventListener('keypress', keyPressEvent)
      return () => {
        window.removeEventListener('keydown', keyDownEvent)
        window.removeEventListener('keypress', keyPressEvent)
      }
    },
    []
  )
  useEffect(
    () => {
      const keyUpEvent = ({ code }: KeyboardEvent) => {
        dispatch(liftKey(code))
      }
      window.addEventListener('keyup', keyUpEvent)
      return () => window.removeEventListener('keyup', keyUpEvent)
    },
    [sustain]
  )

  return <div>
    <div className={ style.octaveDisplay }>
      <div className="flex-row">
        <button onClick={ () => dispatch(shiftOctave(-1)) }>-</button>
        <span>Space</span>
      </div>
      <span> { octave } </span>
      <div className="flex-row">
        <span>Enter</span>
        <button onClick={ () => dispatch(shiftOctave(1)) } >+</button>
      </div>
    </div>
    <div className={ style.keyboard }>
      {
        keys.map(
          (key, i) => <Key key={ i } { ...key } />
        )
      }
    </div>
  </div>

}

export default Keyboard
