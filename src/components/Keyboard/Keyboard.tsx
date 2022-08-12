import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./style.css"

import Key from "./Key/Key"

import { play, stop, selectKeys, liftKey, shiftOctave, selectOctave } from "./store"
import { dispatchTimeout as _dispatchTimeout} from "../../util";
import { selectConfig } from "../Settings/store";

function Keyboard() {

  const octave          = useSelector(selectOctave)
  const keys            = useSelector(selectKeys)
  const dispatch        = useDispatch();
  const { sustain }     = useSelector(selectConfig)
  const dispatchTimeout = _dispatchTimeout(dispatch)

  useEffect(
    () => {
      const keyPressEvent = (e: KeyboardEvent) => {
        e.preventDefault()
        if (e.code === 'Space') dispatch(shiftOctave(-1))
        if (e.code === 'Enter') dispatch(shiftOctave(1) )
      }
      const keyDownEvent = ({ code }: KeyboardEvent) => dispatch(play(code))
      const keyUpEvent = ({ code }: KeyboardEvent) => {
        dispatch(liftKey(code))
        dispatchTimeout(sustain, stop(code))
      }
      window.addEventListener('keydown', keyDownEvent)
      window.addEventListener('keyup', keyUpEvent)
      window.addEventListener('keypress', keyPressEvent)
      return () => {
        window.removeEventListener('keydown', keyDownEvent)
        window.removeEventListener('keyup', keyUpEvent)
      }
    },
    []
  )

  return <div>
    <div className={ style.octaveDisplay }>
      <button onClick={ () => dispatch(shiftOctave(-1)) }>-</button>
      <div> { octave } </div>
      <button onClick={ () => dispatch(shiftOctave(1)) } >+</button>
    </div>
    <div className={ style.keyboard }>
      {
        keys.map(
          ({ name, button, frequency, isPlaying, isPressed }, i ) =>
            <Key
              key={i}
              name={name}
              button={button}
              frequency={frequency}
              isPlaying={isPlaying}
              isPressed={isPressed}
            />
        )
      }
    </div>
  </div>

}

export default Keyboard;
