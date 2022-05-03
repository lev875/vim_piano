import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchTimeout as _dispatchTimeout } from "../../util";

import style from "./style.css"

import Key from "../Key/Key";
import { play, stop, selectKeys } from "./store"

// TODO: Move to redux
const sustain = 150 // ms

function Keyboard() {

  const keys = useSelector(selectKeys)
  const dispatch = useDispatch();
  const dispatchTimeout = _dispatchTimeout(dispatch)

  useEffect(
    () => {
      const keyDownEvent = event => dispatch(play(event.code))
      const keyUpEvent = event => dispatchTimeout(sustain, stop(event.code))
      window.addEventListener('keydown', keyDownEvent)
      window.addEventListener('keyup', keyUpEvent)
      return () => window.removeEventListener('keydown', eventListener)
    },
    []
  )

  return <div className={ style.keyboard }>
    {
      keys.map(
        ({ name, button, frequency, isPlaying }, i ) =>
          <Key
            key={i}
            name={name}
            button={button}
            frequency={frequency}
            isPlaying={isPlaying}
          />
      )
    }
  </div>

}

export default Keyboard;
